'use server'

import nodemailer from "nodemailer"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(formData: FormData) {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  const recipient = "arshpatel2001@gmail.com"

  if (!user || !pass) {
    console.error("Email credentials not configured in environment variables.")
    return { success: false, error: "Server configuration error." }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: user,
    to: recipient,
    replyTo: formData.email,
    subject: `${formData.name} - ${formData.subject}`,
    text: formData.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send message. Please try again later." }
  }
} 