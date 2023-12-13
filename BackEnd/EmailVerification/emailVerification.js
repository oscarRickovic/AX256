const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const dotenv = require('dotenv');
dotenv.config() ;
const html = require('./emailBody')


const sendEmailByA = (username, email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SERVER_EMAIL,
          pass: process.env.SERVER_PASSWORD,
        },
      });
      
      transporter.use('compile', htmlToText());
      
      const mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: 'Email verification from A.',
        html: html(username, code)
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}

sendEmailByA("Abdelhadi", "abdelhadiagourzam@gmail.com", 123456);


