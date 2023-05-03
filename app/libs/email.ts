import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// const SMTP_HOST = "smtp.gmail.com";
// const SMTP_PORT = "465";
// const SMTP_USER = "messengernextjs@gmail.com";
// const SMTP_PASSWORD = "37X297c5";
// const SMTP_FROM_EMAIL=

// Replace with your SMTP credentials
// const smtpOptions = {
//   host: SMTP_HOST || "smtp.mailtrap.io",
//   port: parseInt(SMTP_PORT || "2525"),
//   secure: false,
//   auth: {
//     user: SMTP_USER || "user",
//     pass: SMTP_PASSWORD || "password",
//   },
// };

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "contmessenger@hotmail.com",
      pass: "37X297c5",
    },
  });

  return await transporter.sendMail({
    from: "contmessenger@hotmail.com",
    ...data,
  });
};
//SG.Wb9JiqvERZSesTPBUWzAqA.WUGbq9QgDwwXAo9UIqpFdbIdRZ - GnSeXhQqbocy1UAM;
