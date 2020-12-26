const User = require("./../models/userModel")
//we call this an alias and you need to configure this middleware in the router before get all user
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.aliasUserFiveFirst = (req,res,next)=>{
    req.query.limit = '5',
    req.query.sort = '-nom'
    req.query.fields = 'nom email'
    next()
}

exports.getAllUsers = catchAsync(async(req,res,next)=>{
    
        const features = new APIFeatures(User.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination()

        const users = await features.query
        //send the query
        res.status(200).json({
            status:'success',
            dataLength:users.length,
            data:{
                users:users
            }
        })  
})

exports.getUser = catchAsync(async(req,res,next)=>{
    
        const user = await User.findById(req.params.id) 
        if(!user){
            return next(new AppError('No user found with that ID',404))
        }
        res.status(200).json({
            status:"success",
            user:user
        })
    })

exports.createUser = catchAsync(async(req,res,next)=>{
    const user = await User.create(req.body)
        res.status(201).json({
        status:'success',
        user:user})
})
exports.updateUser = catchAsync(async(req,res,next)=>{
 
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!user){
            return next(new AppError('No user found with that ID',404))
        }
        res.status(200).json({
            status:"success",
            user:user
        })
   
})
    
exports.deleteUser = catchAsync(async(req,res,next)=>{ 
 
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        return next(new AppError('No user found with that ID',404))
    }
      res.status(200).json({
     status:"success",
    })

})
//this projection is used to get some stats
exports.getUserStat = catchAsync(async(req,res,next)=> {
    
        //we call those pipelines aggregations
        const stats = await User.aggregate([
            
            {
                $match: { age: { $gte:15 } },
                    //groupe accumulateur
                 
            },
            //give age total,min age,max age,ageaverage ...
            {
                $group:{
                    _id:{$toUpper:"$prenom"},
                    numUsers:{$sum:1},
                    ageSum:{$sum:'$age'},
                    ageAvrege:{$avg:'$age'},
                    minAge:{$min:'$age'},
                    maxAge:{$max:'$age'}

                }
            },
            //to sort the stat per age
            {
                $sort:{ageAvrege:1}
            },
            //to eliminate the prenom Marwen dans la stats
            // {
            //     $match:{
            //         _id:{$ne:'Marwen'}
            //     }
            // }
        
        ])
        res.status(200).json({
            status:"success",
            data:{
                stats:stats
            }
        })
    
})
//get user per date (month)we call this unwind
exports.getMonthlyPlan = async(req,res)=>{
    try{
        const year = req.params.year*1
        const plan = await User.aggregate([
            {
                $unwind:"$createdAt"
            }
        ])
        res.status(200).json({
            status:"success",
            plan:plan
        }) 
    }catch(err){
        res.status(400).json({
            status:"fail",
            err:err
        }) 
    }
}