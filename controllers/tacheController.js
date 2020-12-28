

const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const Tache = require('./../models/tacheModel')






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
exports.createTache = catchAsync(async(req,res,next) =>{
    const tache = Tache.create(req.body)

    res.status(201).json({
        status:'success',
        tache:tache
    })
})
// exports.getTachesByUser = catchAsync(async(req,res,next)=>{
    


// })
