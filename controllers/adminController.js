const Admin = require("./../models/adminModel")


exports.getAllAdmins = async (req,res)=>{
    try{

        const admins = await  Admin.find() 
    
        res.status(200).json({
            status:"success",
            admins:admins
        })
        
    }catch(err){
        res.status(400).json({
            status:"fail",
            err:err
        })
    }
}
exports.createAdmin = async (req,res)=>{
    try{
        console.log(req.body)
        const admin = await Admin.create(req.body)
        res.status(200).json({
            status:"success",
            admin:admin
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            err:err
        })
    }
}
exports.getAdmin = async (req,res)=>{
    
    try{
        const admin = await Admin.findById(req.params.id)
        res.status(200).json({
            status:"success",
            admin:admin
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            err:err
        })
    }
    
}
exports.updateAdmin = async (req,res)=>{
    try{
        const admin = await Admin.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:"success",
            admin:admin
        })
    
    }catch(err){
        res.status(400).json({
            status:"fail",
            err:err
        })
    
    }
    }
exports.deleteAdmin = async (req,res)=>{
   try{
       await Admin.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"success"
    })
   }catch(err){
    res.status(400).json({
        status:"fail",
        err:err
    })
   }
}