const nodemailer = require('nodemailer');

const { MAIL_NAME, MAIL_PASS, HOST, PORT } = process.env

const transporter = nodemailer.createTransport({
    port: 465,           // true for 465, false for other ports
    service: 'Gmail',
    host: "smtp.gmail.com",
       auth: {
            user: MAIL_NAME,
            pass: MAIL_PASS,
         },
    secure: true,
});



const mailResetPassword = (user, mailto, token) => 
{
    const mailData = {
        from: MAIL_NAME, // sender address
        to: mailto, // list of receivers
        subject: 'Reset password',
        text: 'Password link',
        html: `Hello <b>${user.firstName}</b>,
               <br/>Your password has been successfully reset<br/><br/>
               Thank you,</br>
               Tondelier Jonathan`,
    };
    
    transporter.sendMail(mailData, (err, info) => {
        if (err) console.log(err)
        else console.log(info);
    });
}



const mailForgottenPassword = (user, mailto, token) => 
{
    const endpoint = `email/reset-password?secret=${token}`
    const mailData = {
        from: MAIL_NAME, // sender address
        to: mailto, // list of receivers
        subject: 'Reset password',
        text: 'Password link',
        html: `Hello <b>${user.firstName}</b>,
               <br/>To configure a new password please click on this link<br/>
               <a>http://${HOST}:${PORT}/${endpoint}</a><br/>
               This link will expire in 1 hour.<br/><br/>
               Thank you,</br>
               Tondelier Jonathan`,
    };
    
    transporter.sendMail(mailData, (err, info) => {
        if (err) console.log(err)
        else console.log(info);
    });
}



const mailConfirmationEmail = (user, mailto) =>
{
    const endpoint = `auth/confirm/${user._id}/${user.tokenActivation}`
    const mailData = {
        from: MAIL_NAME,
        to: mailto,
        subject: 'Email Confirmation.',
        text: 'Password link',
        html: `<b>Welcome abroad ${user.username} !</b>,
               <br/>Your account has been created successfully. Please click on this link to activate it.<br/>
               <a href="http://${HOST}:${PORT}/${endpoint}">http://${HOST}:${PORT}/${endpoint}</a><br/>
               This link will expire in 24 hour.<br/><br/>
               Thank you,</br>
               Tondelier Jonathan`,
    };
    
    transporter.sendMail(mailData, (err, info) => {
        if (err) console.log(err)
        else console.log(info);
    });
}



module.exports = {
    mailResetPassword,
    mailForgottenPassword,
    mailConfirmationEmail,
}