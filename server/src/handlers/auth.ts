import { Request, Response } from "express";
import User from "../models/User.model";
import { checkPassword, hashPassword, generateJWT } from "../utils/auth";
import crypto from 'node:crypto';
import { AuthEmail } from "../emails/AuthEmail";
import { loginSchema } from "../schemas/authSchema";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(409).json({ error: 'El usuario ya esta registrado' });
        }

        const user = new User(req.body);
        user.password = await hashPassword(password);
        
        await user.save();
        res.status(201).send('Cuenta creada correctamente');
    } catch (error) {
        res.status(500).json({ error: 'error al crear la cuenta' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ 
                error: result.error.issues[0].message 
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // console.log("Usuario :", user.dataValues); 
        // console.log("Password :", password);
        // console.log("Hash :", user.password);

        const isPasswordCorrect = await checkPassword(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Password Incorrecto' });
        }

        const token = generateJWT(user.id);
        res.json(token);

    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: 'Hubo un error' });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        // Generar token
        user.token = crypto.randomUUID();
        await user.save();

        await AuthEmail.sendPasswordResetToken({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.json('Hemos enviado un correo con las instrucciones');
    } catch (error) {
        res.status(500).json({ error: "hubo un error" });
    }
}

export const validateToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ where: { token } });
        if (!user) {
            return res.status(403).json({ error: 'Token no válido' });
        }
        res.json('Token válido, define tu nuevo password');
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' });
    }
}

export const updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ where: { token } });
        if (!user) {
            return res.status(403).json({ error: 'Token no válido' });
        }

        user.password = await hashPassword(password);
        user.token = null; 
        await user.save();

        res.json('Password modificado correctamente');
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' });
    }
}

export const getUser = async (req: Request, res: Response) => {
    return res.json(req.user);
}

