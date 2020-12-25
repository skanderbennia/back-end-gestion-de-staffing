const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    nom:{
        type:String,
    }
})
const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin