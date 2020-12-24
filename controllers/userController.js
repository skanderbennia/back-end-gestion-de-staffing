const User = require("./../models/userModel")


exports.getAllUsers = async(req,res)=>{
    try{
        users = await User.find()
        res.status(200).json({
            status:'success',
            dataLength:users.length,
            data:{
                users:users
            }
        })
    } catch(err){
        res.status(400).json({
            status:'fail',
            err:err
        })
    }
   
}
exports.getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id) 
        res.status(200).json({
            status:"success",
            user:user
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            err:err
        })
    }
    
}
exports.createUser = async(req,res)=>{
    console.log(req.body)
    try{
        const user = await User.create(req.body)
        res.status(201).json({
        status:'success',
        user:user
    })
    }catch(err){
        res.status(400).json({
            status:'fail',
            err:err
        })
    }
    
}
exports.updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:"success",
            user:user
        })
    }catch(err){
        res.status(400).json({
            status:'fail',
            err:err
        })
    }
}
    
exports.deleteUser = async(req,res)=>{ 
    try{
    await User.findByIdAndDelete(req.params.id)
      res.status(200).json({
     status:"success",
    })
}catch(err){
    res.status(400).json({
        status:"fail",
        err:err
    })
}
}