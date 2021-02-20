const mongoose = require('mongoose')


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
    },
    groupe:{
        _id:String
    },
    statusTache:{
        type:Boolean,
        default:false
    }
    
})
const Tache = mongoose.model('Tache',tacheSchema)
module.exports = Tache