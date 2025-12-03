import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const checkPassword = async (enteredPassword: string, storedHash: string) => {
    return await bcrypt.compare(enteredPassword, storedHash);
}

export const generateJWT = (id: number, remember: boolean = false) => {
    const expiresIn = remember ? '30d' : '1h'; // No se si es mucho una hora o le bajo o subo o que

    return jwt.sign({ id }, process.env.JWT_SECRET || 'palabrasecreta', {
        expiresIn
    });
}