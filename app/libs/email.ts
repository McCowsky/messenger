import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NEXT_PUBLIC_SMTP_SERVICE,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });

  return await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_SMTP_USER,
    ...data,
  });
};
