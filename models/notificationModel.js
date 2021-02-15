const { Mongoose } = require("mongoose");

const mongoose = require("mongoose")

notificationSchema = mongoose.Schema({
       nom:String,
       description:String,
       date:{
              type:Date,
              default:Date.now()
       },
       seen:{
              type:Boolean,
              default:false
       }
})
const notification = mongoose.model("Notification",notificationSchema)
module.exports = notification