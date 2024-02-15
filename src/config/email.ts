//import nodemailer = require('nodemailer');
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import nodemailer from 'nodemailer';
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  port: 587,
});
export { smtpTransport }