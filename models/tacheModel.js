const mongoose = require('mongoose')
const User = require('./userModel')

const tacheSchema = mongoose.Schema({
    nom:{
        type:String,
        required:[true,"votre tache doit avoir un nom"]
    },
    description:String,
    
    dateCreation:{
        type:Date,
        default:Date.now()
    },
    deadline:{
        type:Date,
        required:[true,"votre tache doit contenir une deadline"]
    },
    user:{
        _id:String,
        nom:String,
        prenom:String,
    },
    
})
const Tache = mongoose.model('Tache',tacheSchema)
module.exports = Tache