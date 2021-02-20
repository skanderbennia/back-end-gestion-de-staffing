const {promisify} = require('util')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
const sendMail = require('../utils/mailerAnother')
const notification = require("../models/notificationModel")
// this function that create signToken : 


const signToken = id =>{
    return  jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_IN
    })
}


// creation de la compte :



exports.signup = catchAsync(async (req,res,next)=>{
    
    const {nom,prenom,email} = req.body
    console.log("this is what you are looking for",email,nom,prenom)
    sendMail(email,async function(err,data){
        if(err){
             return res.status(500).json({
                 err:"an internal error has been spoted"
             })
        }else{
    const newUser = await User.create(req.body); 
    const token = signToken(newUser._id)
    await notification.create({nom:"User Signup",description:"A new user named "+newUser.nom+" "+newUser.prenom+" has create an account"})
     
   return  res.status(201).json({
        status: "success",
        token,
        data:{
            
            user:newUser
        }
    })

        }
    })
    
})



// connexion de la compte : 

exports.login = catchAsync(async(req,res,next)=>{
const {email,password} = req.body
console.log(email,password)
//check email and password exist
if(!email|| !password){
    return next(new AppError('please provide email and password',404))
}
//check if user exists && password is correct
const user = await User.findOne({email}).select("+password")


if(!user|| !(await user.correctPassword(password,user.password))){
    return next(new AppError('Incorrect email or password',404))
    
}
// if everything ok, send token to client
const token = signToken(user._id)

await notification.create({nom:user.prenom+" "+user.nom+" Log in",description:"User "+user.nom+" "+user.prenom+" has logged in at this time"})

res.status(200).json({
    status:'success',
    token,
    userInformation: user

})
})
exports.protect = catchAsync(async(req,res,next)=>{
    // getting token and check if it's there
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1]
    }
    console.log(process.env.JWT_SECRET)
    console.log(req.headers.authorization)
    if(!token){
        return next(new AppError('You are not logged in ! please login to get access'),401)
    }

    //verification the token
   const decoded = await promisify(jwt.verify) (token,process.env.JWT_SECRET)
   
    // check if the user still exists
    const currentUser = await User.findById(decoded.id)
    console.log(currentUser)
    if(!currentUser){
        return next(new AppError('The token belonging to this token is no longer exist',401))
    }
    //check if user change password after the token was issued 
    if(currentUser.changePasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed the password . please log in again',401))
    }
    //grant access to protected route
    req.user = currentUser
    next()
})
exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        //roles is an array ['admin',if you add it in the router'user']
        //req.user we did save it in the middleware authController.protect that why we are able to access it
        if(!roles.includes(req.user.role))
        return next (new AppError('you do not have permission to perform this action',403))
        next()
    }
    
}
