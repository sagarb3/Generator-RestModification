import nodemailer from "nodemailer";
import { promisify } from "util";
import {
  emailHost as host,
  emailPort as port,
  fromEmailId,
  emailUser,
  emailPassword
} from "../../config";

let emailTransporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user: emailUser,
    pass: emailPassword
  },
  secure: false
});

emailTransporter.sendMail = promisify(emailTransporter.sendMail);

export const emailSender = async mailOptions => {
  try {
    console.log(mailOptions);
    mailOptions = Object.assign({}, mailOptions, {
      from: fromEmailId
    });
    console.log(mailOptions);
    const mailSend = await emailTransporter.sendMail(mailOptions);
    if (!mailSend) {
      throw "Error in sending mail";
    }
    return "Successfully Sent mail";
  } catch (err) {
    throw err;
  }
};
