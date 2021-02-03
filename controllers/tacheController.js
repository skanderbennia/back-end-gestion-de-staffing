

const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const Tache = require('./../models/tacheModel')
const User = require("../models/userModel")





// get all tache
exports.getAllTaches = catchAsync(async(req,res,next) =>{
    
    const feature = new APIFeatures(Tache.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination()

    const taches = await feature.query

    res.status(200).json({
        status:'success',
        dataLength:taches.length,
        data:{
            taches:taches
        }

    })
})
//create tache
exports.createTache = catchAsync(async(req,res,next) =>{
    const tache = await Tache.create(req.body)
   
    res.status(201).json({
        status:'success',
        tache:tache
    })
})
//get tache by user
exports.getTachesByUser = catchAsync(async(req,res,next)=>{
    const tacheUser = await Tache.find({
        user:{
            _id:req.params.id,
        }
    })
    res.status(200).json({
        status:'success',
        tache:tacheUser
    })
})
//update tache
exports.updateTache = catchAsync(async(req,res,next)=>{
    const tache = await Tache.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidator:true
    })
    res.status(200).json({
        status:"success",
        tache:tache
    })
})
//supprimer tache
exports.deleteTache = catchAsync(async(req,res,next)=>{
    await Tache.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:"success"
    })
})
//terminer Tache
exports.terminerTache = catchAsync(async(req,res,next)=>{
    const tache = await Tache.findByIdAndUpdate(req.params.id,{statusTache:true},{
        new:true,
        runValidators:true
    })
    res.status(203).json({
        status:"success",
        tache:tache
    })
})
exports.affecterTache = catchAsync(async(req,res,next)=>{
    // const tache = await Tache.findById(req.params.tacheId)
    const user = await User.findById(req.params.userId)
    const tache = await Tache.findByIdAndUpdate(req.params.tacheId,{user:user.id},{
        runValidators:true,
        new:true
    })
    res.status(203).json({
        status:"success",
        tache:tache
    })

})
