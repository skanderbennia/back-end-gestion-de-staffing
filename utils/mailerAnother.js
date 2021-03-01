const nodemailer = require("nodemailer");

 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mohamedskander.bennia@gmail.com", // generated ethereal user
      pass: "azertypassword0123951", // generated ethereal password
    },
  });
// async..await is not allowed in global scope, must use a wrapper
const sendMail =async(email,cb)=>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  

  // create reusable transporter object using the default SMTP transport
 

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Dashio" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello mister you did register you account in our webapplication", // plain text body
    html: "<b>Hello mister you did regiester your account in our webapplication</b>", // html body
  },function(err,data){
       if(err){
             cb(err,null);
       }else{
            cb(null,data)
       }});

 
}
module.exports = sendMail;