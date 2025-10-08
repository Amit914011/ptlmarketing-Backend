// Admin Email Template
export const adminContactTemplate = (contactData) => {
  const {
    name,
    number,
    email,
    service,
    companyName,
    budget,
    subject,
    message,
  } = contactData;

  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h1 style="color: #0f4c81; text-align: center;">🆕 New Contact Us Submission</h1>
      <hr style="border: none; height: 2px; background: #0f4c81; margin: 20px 0;">
      <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px; color: #333;"><strong>Number:</strong> ${number}</p>
      <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px; color: #333;"><strong>Service:</strong> ${service}</p>
      <p style="font-size: 16px; color: #333;"><strong>Company:</strong> ${companyName}</p>
      <p style="font-size: 16px; color: #333;"><strong>Budget:</strong> ₹${budget}</p>
      <p style="font-size: 16px; color: #333;"><strong>Subject:</strong> ${subject}</p>
      <p style="font-size: 16px; color: #333;"><strong>Message:</strong><br/> ${message}</p>
      <a href="mailto:${email}" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background: #0f4c81; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Reply to Client</a>
    </div>
  </div>
  `;
};

// Client Email Template
export const clientContactTemplate = (contactData) => {
  const { name, service, subject, message } = contactData;

  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
      
      <!-- ✅ PTL Logo -->
//       <img 
//   src="https://ptlmarketing.com/wp-content/uploads/2025/09/PTL-Marketing-logo-copy-1.png" 
//   alt="PTL Marketing Logo" 
//   style="
//     width: 120px; 
//     height: 120px; 
//     border-radius: 50%; 
//     background-color: white; 
//     padding: 10px; 
//     box-shadow: 0 0 8px rgba(0,0,0,0.15); 
//     object-fit: cover;
//     margin-bottom: 20px;
//     border:1px;
//   "
// />


      <h1 style="color: #0f4c81;">🙏 Thank You for Contacting PTL Marketing</h1>
      <p style="font-size: 16px; color: #333;">Hi ${name},</p>
      <p style="font-size: 16px; color: #333;">
        We have received your enquiry regarding <strong>${service}</strong>. Here is a summary:
      </p>

      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: left;">
        <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
        <p style="margin: 5px 0;"><strong>Message:</strong> ${message}</p>
      </div>

      <p style="font-size: 16px; color: #333;">Our team will contact you shortly. Stay tuned!</p>
      
      <a href="https://ptlmarketing.com" 
        style="display: inline-block; margin-top: 20px; padding: 12px 25px; background: #0f4c81; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
        Visit Our Website
      </a>

      <p style="color: #777; font-size: 12px; margin-top: 20px;">PTL Marketing Team</p>
    </div>
  </div>
  `;
};
