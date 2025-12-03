import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendPasswordResetToken = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'Administrador de Productos <admin@productmanager.com>',
            to: user.email,
            subject: 'Restablece tu Password',
            text: 'Restablece tu Password',
            html: `<p>Hola: ${user.name}, vamos a restablecer tu password.</p>
                <p>Sigue el siguiente enlace para generar un nuevo password que no sea cisco ni class:</p>
                <a href="${process.env.FRONTEND_URL}/auth/nuevo-password/${user.token}">Restablecer Password</a>
            `
        })
        console.log('Mensaje enviado', info.messageId)
    }
}