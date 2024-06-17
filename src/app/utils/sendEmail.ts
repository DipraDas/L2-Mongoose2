import nodemailer from 'nodemailer';
import config from '../config';


export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "dipradas5940@gmail.com",
            pass: "dnrx lzgr kekd brzg",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    await transporter.sendMail({
        from: 'dipradas5940@gmail.com', // sender address
        to, // list of receivers
        subject: "Password change koro", // Subject line
        text: "Reset your password within 10 min", // plain text body
        html // html body
    });

}
