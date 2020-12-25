const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nom:{
        type:String,
        trim:true,
        required:[true,'vous devez entrer le nom']
    },
    prenom:{
        type: String,
        trim:true,
        required:[true,'vous devez entre le prenom']
    },
    age:{
        type:Number,
        required:[true,'vous devez entre l age']
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
const User = mongoose.model('User',userSchema)
module.exports = User