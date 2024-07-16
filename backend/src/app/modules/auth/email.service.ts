import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendResetPassword(email: string, token: string) {
    const resetUrl = `http://localhost:3000/api/v1/auth/reset-password?token=${token}`;
    const info = await this.transporter.sendMail({
      from: 'Lakoe <namikazeuzumaki43@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Verification Link', // Subject line
      html: `<a href="${resetUrl}">Klik untuk verifikasi email kamu!</a>`, // html body
    });

    return info;
  }
}
