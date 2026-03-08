import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.gmail_user,
    pass: config.gmail_pass,
  },
});

const sendVerificationEmail = async (to: string, fullName: string, verificationToken: string) => {
  const verificationUrl = `${config.origin_url}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: `QuickShort <${config.gmail_user}>`,
    to,
    subject: 'Verify Your Email - QuickShort',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #570DF8 0%, #F000B8 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">QuickShort</h1>
        </div>
        <div style="padding: 30px; background: #f5f5f5;">
          <h2 style="color: #333;">Welcome, ${fullName}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for registering with QuickShort. Please verify your email address to activate your account.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #570DF8; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p style="color: #999; font-size: 12px;">
            This link will expire in 24 hours. If you didn't create an account, please ignore this email.
          </p>
          <p style="color: #999; font-size: 12px;">
            Or copy and paste this URL: <br/>
            <a href="${verificationUrl}" style="color: #570DF8;">${verificationUrl}</a>
          </p>
        </div>
        <div style="background: #333; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          © ${new Date().getFullYear()} QuickShort. All rights reserved.
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (to: string, fullName: string, resetToken: string) => {
  const resetUrl = `${config.origin_url}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: `QuickShort <${config.gmail_user}>`,
    to,
    subject: 'Reset Your Password - QuickShort',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #570DF8 0%, #F000B8 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">QuickShort</h1>
        </div>
        <div style="padding: 30px; background: #f5f5f5;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #666; line-height: 1.6;">
            Hello ${fullName},
          </p>
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #570DF8; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #999; font-size: 12px;">
            This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
          </p>
          <p style="color: #999; font-size: 12px;">
            Or copy and paste this URL: <br/>
            <a href="${resetUrl}" style="color: #570DF8;">${resetUrl}</a>
          </p>
        </div>
        <div style="background: #333; padding: 20px; text-align: center; color: #999; font-size: 12px;">
          © ${new Date().getFullYear()} QuickShort. All rights reserved.
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const EmailService = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
