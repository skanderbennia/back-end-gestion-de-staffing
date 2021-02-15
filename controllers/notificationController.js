const Notification = require("./../models/notificationModel")
const catchAsync  = require('./../utils/catchAsync')

exports.getAllNotification =catchAsync(async(req,res,next)=>{
    const notification = await Notification.find({seen:false})
    res.status(200).json({
        status:"success",
        notificationLength:notification.length,
        notifications:notification
    })
})
exports.deleteNotification =catchAsync(async(req,res,next)=>{
    const notification=await Notification.findByIdAndDelete(req.params.id)
    console.log('this is the notification',notification.nom)
    res.status(200).json({
        status:"success",
        
    })
})
exports.deleteAllNotification = catchAsync(async(req,res,next)=>{
    await Notification.deleteMany({})
    res.status(200).json({
        status:"success"
    })
})