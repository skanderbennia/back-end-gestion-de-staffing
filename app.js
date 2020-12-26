const express= require("express")
const dotenv = require("dotenv").config({path:__dirname+"/config.env"})
const morgan = require("morgan")
const userRouter = require("./routes/userRouter")
const adminRouter = require("./routes/adminRouter")
const groupeRouter = require("./routes/groupeRouter")

const app = express()



app.use(express.static(`${__dirname}/public`))
app.use(express.json())

if(process.env.NODE_ENV === "development")
{
    app.use(morgan("dev"))
}



app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next()
})


//routing
app.use('/api/v1/users',userRouter)
app.use('/api/v1/admins',adminRouter)
app.use('/api/v1/groupes',groupeRouter)

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:"fail",
    //     message: `can't find ${req.originalUrl} on this server`
    // })
    const err = new Error( `can't find ${req.originalUrl} on this server`)
    err.status='fail',
    err.statusCode = 404
    
    next(err)
})
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode||500;
    
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})

module.exports = app;
