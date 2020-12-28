const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../utils/appError')
// this function that create signToken : 
const signToken = id =>{
    return  jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_IN
    })
}
// creation de la compte :



exports.signup = catchAsync(async (req,res,next)=>{
    const newUser = await User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
    }); 
   
    const token = signToken(newUser._id)
     
    res.status(201).json({
        status: "success",
        token,
        data:{
            
            user:newUser
        }
    })
})



// connexion de la compte : 

exports.login = catchAsync(async(req,res,next)=>{
const {email,password} = req.body
//check email and password exist
if(!email|| !password){
    return next(new AppError('please provide email and password',400))
}
//check if user exists && password is correct
const user = await User.findOne({email}).select("+password")



if(!user|| !(await user.correctPassword(password,user.password))){
    return next(new AppError('Incorrect email or password',401))
}
// if everything ok, send token to client
const token = signToken(user._id)
res.status(200).json({
    status:'success',
    token
})
})