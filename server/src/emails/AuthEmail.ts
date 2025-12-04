import { resend } from "../config/email";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendPasswordResetToken = async (user: IEmail) => {

    const resetURL = `${process.env.FRONTEND_URL}/auth/nuevo-password/${user.token}`;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: user.email,
      subject: "Restablecer tu contraseña",
      html: `
        <p>Hola ${user.name},</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Puedes hacerlo haciendo clic en el siguiente enlace:</p>
        <a href="${resetURL}" target="_blank">${resetURL}</a>
        <p>Si tú no solicitaste esto, puedes ignorar este correo.</p>
      `,
    });

    if (error) {
      console.error("Error enviando correo:", error);
      throw new Error("No se pudo enviar el correo");
    }

    console.log("Correo enviado:", data?.id);
  };
}




// import { transporter } from "../config/nodemailer";

// interface IEmail {
//     email: string;
//     name: string;
//     token: string;
// }

// export class AuthEmail {
//     static sendPasswordResetToken = async ( user : IEmail ) => {
//         const info = await transporter.sendMail({
//             from: 'Administrador de Productos <admin@productmanager.com>',
//             to: user.email,
//             subject: 'Restablece tu Password',
//             text: 'Restablece tu Password',
//             html: `<p>Hola: ${user.name}, vamos a restablecer tu password.</p>
//                 <p>Sigue el siguiente enlace para generar un nuevo password que no sea cisco ni class:</p>
//                 <a href="${process.env.FRONTEND_URL}/auth/nuevo-password/${user.token}">Restablecer Password</a>
//             `
//         })
//         console.log('Mensaje enviado', info.messageId)
//     }
// }