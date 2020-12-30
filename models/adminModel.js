const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const adminSchema = mongoose.Schema({
    nom:{
        type:String,
        required:[true,"vous devez ajouter le nom"]
    },
    prenom:{
        type:String,
        required:[true,"vous devez ajouter le prenom"]
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password:{
        type:String,
        minlength:8,
        required:[true,"vous devez ajouter le mot de passe"]

    },
    passwordConfirmation:{
        type:String,
        required:[true,"vous devez ajouter la confimration du mot de passe"]
        
    },
    age:{
        type:Number,
        required:[true,"vous devez ajouter votre age"]
    }
})

adminSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next()
    //bcrypt libary is used to encrypt the password
    this.password = await bcrypt.hash(this.password,12)
    //after we add the password and confirmed it you need to delete it
    this.passwordConfirmation = undefined;
    next()
})
// adminSchema.methods.changePasswordAfter = function(JWTTimeStamp){
//     if(this.passwordChangedAt){
//         const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10)
//         console.log(changedTimeStamp, JWTTimeStamp)
//         return JWTTimeStamp < changedTimeStamp
//     }
//     //false mean not changed
//     return false
// }
// //this function help us to compare the encrypted password and the no encrypted password
// adminSchema.methods.correctPassword = async function(candidatePassword,userPassword){
//     return await bcrypt.compare(candidatePassword,userPassword)
// }
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin