const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  const mailOpts = {
    from: `E-shop App <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };
  console.log(mailOpts)
  await transporter.sendMail(mailOpts);
};

exports.optionsForEmail=(user,resetCode) =>( {
    email: user.email,
    subject: 'Reset Password',
    html:`
    <div>
    <h3>Hi ${user.userName}</h3>
    <h4>
    We received a request to reset the password on your E-shop Account. <br/> <br/>
    <p>${resetCode}</p> <br/> <br/>
    Enter this code to complete the reset. <br/>
    Thanks for helping us keep your account secure.<br/> <br/> <br/> <br/> 
    The E-shop Team
    </h4>
    </div>
    `
  })


