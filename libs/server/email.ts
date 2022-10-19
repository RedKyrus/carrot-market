import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Hi",
  host: "smtps.hiworks.com",
  port: 465,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
