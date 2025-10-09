import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailToAdmin = async (data) => {
  try {
    await resend.emails.send({
      from: "PTL Marketing <noreply@ptlmarketing.com>",
      to: "amitmrj914011@gmail.com",
      subject: `New Contact Request from ${data.name}`,
      html: `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    });
  } catch (err) {
    console.error("Admin email failed:", err.message);
  }
};

export const sendEmailToClient = async (data) => {
  try {
    await resend.emails.send({
      from: "PTL Marketing <noreply@ptlmarketing.com>",
      to: data.email,
      subject: "Thank You for Contacting PTL Marketing!",
      html: `
        <p>Hi ${data.name},</p>
        <p>Thank you for reaching out! Our team will contact you soon.</p>
        <p>– PTL Marketing</p>
      `,
    });
  } catch (err) {
    console.error("Client email failed:", err.message);
  }
};
