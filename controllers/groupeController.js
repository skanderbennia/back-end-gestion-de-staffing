const Groupe = require("./../models/equipeModel")



exports.getAllGroupes = async (req,res)=>{
try{
    const groupes = await Groupe.find()
    res.status(200).json({
        status:"success",
        groupelength: groupes.length,
        groupes:groupes
    })
}catch(err){
    res.status(400).json({
        status:"fail",
        err:err
    })
}
}
exports.createGroupe = async (req,res)=>{
    try{
    const groupe = await  Groupe.create(req.body)

    res.status(200).json({
        status:"success",
        groupe:groupe
    })
    }catch(err){
        res.status(400).json({
            status:"fail",
            err:err
        })
    }
    
}
exports.getGroupe = async (req,res)=>{
    res.status(200).json({
        status:"success"
    })
}
exports.updateGroupe = async (req,res)=>{
    res.status(200).json({
        status:"success"
    })
}
exports.deleteGroupe = async (req,res)=>{
    res.status(200).json({
        status:"success"
    })
}