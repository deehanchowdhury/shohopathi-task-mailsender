let cron = require('node-cron');
let nodemailer = require('nodemailer');

  // e-mail message options
function send_mail(from_mail, from_mail_password, from_mail_service, to_mail, subject, text){
    let mailOptions = {
        from: from_mail,
        to: to_mail,
        subject: subject,
        text: text
   };

  // e-mail transport configuration
  let transporter = nodemailer.createTransport({
        service: from_mail_service,
        auth: {
          user: from_mail,
          pass: from_mail_password
        }
    });

 cron.schedule('* * * * *', () => {
  // Send e-mail
  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
  });
}

module.exports = {send_mail}
  