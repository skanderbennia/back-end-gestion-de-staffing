
const Groupe = require("./../models/groupeModel")
const catchAsync  = require('./../utils/catchAsync')
const User = require("./../models/userModel")


//get all groupes
exports.getAllGroupes =catchAsync(async(req,res,next)=>{
    const groupes = await Groupe.find()
    res.status(200).json({
        status:"success",
        groupelength: groupes.length,
        groupes:groupes
    })
})

//create Groupe
exports.createGroupe = catchAsync(async(req,res)=>{
    
    const groupe = await Groupe.create(req.body)

    res.status(200).json({
        status:"success",
        groupe:groupe
    })
    
    
})
exports.getGroupe = catchAsync(async (req,res,next)=>{
    const groupe = await Groupe.findById(req.params.id)
    
    res.status(200).json({
        status:"success",
        groupe: groupe
    })
})
exports.updateGroupe = catchAsync(async(req,res,next)=>{
    const groupe = await Groupe.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    
    res.status(203).json({
        status:"success",
        groupe:groupe
    })
})
exports.deleteGroupe = catchAsync(async (req,res)=>{
   await Groupe.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:"success"
    })
})
//ajouter member
exports.AddMemberGroupe = catchAsync(async(req,res,next)=>{
    
    const {_id} = await User.findById(req.params.idUser)
    const groupe = await Groupe.findById(req.params.idGroupe)
    let newGroupe
    console.log(_id, groupe)
    if(groupe&&_id)
    {
        if(groupe.groupeMember.length>0){
        
            if(groupe.groupeMember.indexOf(_id) === -1)
       { 
           groupe.groupeMember.push(_id)
             newGroupe = await Groupe.findByIdAndUpdate(req.params.idGroupe,groupe,{
                runValidators:true,
                new:true
            })
        }else{
            return res.status(400).json({
                status:"fail",
                message:"this user already exist in this groupe"
            })
        }
    }else{
       let groupeMember = []
        groupeMember.push(_id)
        // console.log(groupeMember)
         newGroupe = await Groupe.findByIdAndUpdate(req.params.idGroupe,{
            groupeMember:groupeMember
        },{
            new:true,
            runValidators:true
        })
        
    }
    return res.status(200).json({
        status:"success",
        newGroupe:newGroupe
    })
}
else{
    return res.status(400).json({
        status:"fail",
        message:"you need to add user or groupe"
    })
}
   

})
    
//supprimer member
exports.deleteOneMember = catchAsync(async(req,res,next)=>{
    const groupe = await Groupe.findById(req.params.idGroupe)
    const {_id} = await User.findById(req.params.idUser)

    if(groupe.groupeMember===[]){
        return res.status(400).json({
            status:'fail',
            message:"table is empty"
        })
    }
    let groupeMemberTest = groupe.groupeMember
    console.log("avant",groupeMemberTest)
    let index=groupeMemberTest.indexOf(_id)
    console.log(index)
    const checkValue = (value)=>{
        return value != groupeMemberTest[index]
    }
    if(index !== -1){
      groupeMemberTest=groupeMemberTest.filter(checkValue)
    }
    console.log("apres",groupeMemberTest)
    const newGroupe = await Groupe.findByIdAndUpdate(req.params.idGroupe,{
        groupeMember:groupeMemberTest
    },
    {
        new:true,
        runValidators:true
    })
    res.status(200).json({
        status:"success",
        groupe:newGroupe
    })
})
//get member from a groupe
