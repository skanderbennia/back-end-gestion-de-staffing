const nodemailer = require("nodemailer")
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
       auth:{
              api_key:'adb8f62acbd0a88359b526b63627808c-4de08e90-7518d4b3',
              domain:'sandboxff95e7940f8d4ff5a156c697109ad662.mailgun.org'
       }
}
const transporter = nodemailer.createTransport(mailGun(auth))


const sendMail = (email,nom,prenom,cb)=>{
    const mailOptions = {
    from:'mohamedskander.bennia@gmail.com' ,
    to:email,
    subject:'Account Creation',
    text:"you have successfully create you account mr "+prenom+" "+nom 
}

transporter.sendMail(mailOptions,function(err,data){
       if(err){
             cb(err,null);
       }else{
            cb(null,data)
       }
})
}
module.exports = sendMail;