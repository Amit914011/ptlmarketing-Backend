import nodemailer from "nodemailer";
import { adminContactTemplate, clientContactTemplate } from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send email generic function
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"PTL Marketing" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    // console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
  }
};

// Send email to admin
export const sendEmailToAdmin = async (contactData) => {
  const html = adminContactTemplate(contactData);
  await sendEmail({ to: "ptlmarketingg@gmail.com", subject: "New Contact Us Submission", html });
};

// Send email to client
export const sendEmailToClient = async (contactData) => {
  const html = clientContactTemplate(contactData);
  await sendEmail({ to: contactData.email, subject: "Thank you for contacting PTL Marketing", html });
};

export default sendEmail;


