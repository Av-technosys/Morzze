import nodemailer from "nodemailer";

// Create a transporter - will use environment variables for credentials
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

export function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  const subject = "Your Password Reset OTP";
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #168ba0;">Password Reset Request</h2>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
      <div style="margin: 30px 0;">
        <h1 style="color: #168ba0; letter-spacing: 5px; text-align: center;">${otp}</h1>
      </div>
      <p style="color: #666;">This OTP is valid for 10 minutes.</p>
      <p style="color: #666;">If you didn't request this, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      <p style="font-size: 12px; color: #999;">Potent Hygiene Team</p>
    </div>
  `;
  return sendEmail(email, subject, html);
}

export function sendPasswordResetConfirmation(email: string): Promise<boolean> {
  const subject = "Password Reset Successful";
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #168ba0;">Password Reset Successful</h2>
      <p>Your password has been successfully reset.</p>
      <p>If you didn't perform this action, please <a href="https://yourapp.com/contact">contact support</a> immediately.</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      <p style="font-size: 12px; color: #999;">Potent Hygiene Team</p>
    </div>
  `;
  return sendEmail(email, subject, html);
}