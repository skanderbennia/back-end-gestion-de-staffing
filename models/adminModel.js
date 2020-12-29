const mongoose = require("mongoose")

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
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin