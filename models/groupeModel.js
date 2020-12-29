const mongoose = require("mongoose")
const User = require("./userModel")

const equipeSchema = mongoose.Schema({
    nom:{
        type:String,
        required:[true ,"l'equipe doit avoir un nom"],
        trim: true
     },
    dateCreation:{
      type:Date,
      
      default:Date.now()  
    },
    groupeMember:{
      type:[{}],
      default:[]
    },
    creerPar:{
      idAdmin:String,
      nomAdmin:String,
      prenomAdmin:String,
    }
})
const Groupe = mongoose.model('Groupe',equipeSchema)

module.exports = Groupe