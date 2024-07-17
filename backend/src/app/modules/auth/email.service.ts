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
    const frontEndUrl = process.env.BASE_CLIENT_URL;
    const resetUrl = `${frontEndUrl}/auth/reset-password/${token}`;
    const info = await this.transporter.sendMail({
      from: 'Lakoe <namikazeuzumaki43@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Verification Link', // Subject line
      html: `<a href="${resetUrl}">Reset Password!</a>`, // html body
    });

    return info;
  }

  async sendVerifyEmail(email: string, token: string) {
    const frontEndUrl = process.env.BASE_CLIENT_URL;
    const verifyUrl = `${frontEndUrl}/auth/verify-account/${token}`;
    const info = await this.transporter.sendMail({
      from: 'Lakoe <namikazeuzumaki43@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Verification Link', // Subject line
      html: `<a href="${verifyUrl}">Verification Email!</a>`, // html body
    });

    return info;
  }
}
