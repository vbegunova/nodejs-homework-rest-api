const nodemailer = require("nodemailer");
require("dotenv").config();

const { NODEMAILER_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "veronikabegunova42@gmail.com",
    pass: NODEMAILER_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "veronikabegunova42@gmail.com" };
  await transport.sendMail(email);
  return true;
};

// const email = {
//     to: "kinedav149@huvacliq.com",
//     from: "veronikabegunova42@gmail.com",
//     subject: "Test email",
//     html: "<p><strong>Test email</strong> from localhost:3000</p>"
// };

module.exports = sendEmail;
