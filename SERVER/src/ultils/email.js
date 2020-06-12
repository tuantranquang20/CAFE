const nodemailer = require("nodemailer");
const EMAIL_USER = "a31756e0645114";
const PASSWORD_USER = "d0422dbeb1e850";
const EMAIL_HOST = "smtp.mailtrap.io";
const EMAIL_PORT = "2525";

//config mail
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: PASSWORD_USER,
      },
    });

    const mailOptions = {
      from: "admin Louis <tuantranquang20@gmail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    //cái transporter nhận cái option
    const post = await transporter.sendMail(mailOptions);
    return post;
  } catch (error) {
    return error;
  }
};
module.exports = sendEmail;