const nodemailer = require("nodemailer")
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
       auth:{
              api_key:'dbabaa593fad2884d0dc4b95ef8df287-4de08e90-319a17e7',
              domain:'sandbox8f598a98671a465a9c30f0397de8d30a.mailgun.org'
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