const nodemailer = require("nodemailer");

let send = async args => {
 try {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();
//    console.log(testAccount);
//    console.log(args);
//    console.log(args.email);
//    console.log(args.subject);

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
     host: "smtp.ethereal.email",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
       user: testAccount.user, // generated ethereal user
       pass: testAccount.pass // generated ethereal password
     }
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
     from: '"Danish 👻" <danish@example.com>', // sender address
     to: args.email, // list of receivers
     subject: args.subject, // Subject line
     html: args.body // html body
   });

   console.log("Message sent: %s", info.messageId);
   // Preview only available when sending through an Ethereal account
   console.log(nodemailer.getTestMessageUrl(info));
   return nodemailer.getTestMessageUrl(info);
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 } catch (err) {
   console.log(`Error: ${err}`);
 }
};

module.exports = {
 send
};