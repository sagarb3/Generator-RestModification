import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { emailSender } from "../../services/email";
const readFilePromise = require("fs-readfile-promise");

const compileMailAndSend = async params => {
  try {
    const { to, replacements, subject, template, attachments } = params;
    const jsonPath = path.join(__dirname, "templates", template);
    const fileContents = await readFilePromise(jsonPath, { encoding: "utf-8" });
    const tmplt = handlebars.compile(fileContents);
    let text, html;
    const compiledHtml = tmplt(replacements);
    text = html = compiledHtml;
    let mailOptions = JSON.parse(
      JSON.stringify({ to, subject, text, html, attachments })
    );
    const sendMailResponse = await emailSender(mailOptions);
    return sendMailResponse;
  } catch (err) {
    throw err;
  }
};
export const passwordResetmail = async params => {
  try {
    const { to, replacements } = params;
    const subject = "Reset Password";
    const template = "forgot-password.tmpl.html";
    return await compileMailAndSend({
      to,
      replacements,
      subject,
      template
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  passwordResetmail
};
