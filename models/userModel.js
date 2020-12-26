const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nom:{
        type:String,
        trim:true,
        //required:[true,'vous devez entrer le nom']
    },
    prenom:{
        type: String,
        trim:true,
        //required:[true,'vous devez entre le prenom']
    },
    email:{
        type:String,
        //required:[true,'vous de vez entrez l email']
        lowercase:true
       
    },
    password:{
        type:String,
        trim:true,
        //required:[true,'vous devez entre le mot de passe']
        minlength:8,
        select:false
        
    },
    passowordConfirmation:{
        type:String,
        //required:[true,"il faut entrer la confirmation de mot de passe"]
        select:false
    },
    age:{
        type:Number,
        //required:[true,'vous devez entre l age']
    },
    specialite:{
        type:String,
        trim:true
    },
    photoProfil:{
        type:String,
        trim:true
    }
    
    //im making test here but this schema need to be heavy

    
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
 }, 'The e-mail field cannot be empty.')

const User = mongoose.model('User',userSchema)
module.exports = User