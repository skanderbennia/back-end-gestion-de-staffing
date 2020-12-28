const express= require("express")
const dotenv = require("dotenv").config({path:__dirname+"/config.env"})
const morgan = require("morgan")
const userRouter = require("./routes/userRouter")
const adminRouter = require("./routes/adminRouter")
const groupeRouter = require("./routes/groupeRouter")
const tacheRouter  = require('./routes/tacheRouter')
const AppError = require('./utils/appError')
const globalErrorHandler = require("./controllers/errorController")
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
app.use('/api/v1/taches',tacheRouter)

app.all('*',(req,res,next)=>{
    
    // const err = new Error( `can't find ${req.originalUrl} on this server`)
    // err.status='fail',
    // err.statusCode = 404
    
    next(new AppError( `can't find ${req.originalUrl} on this server`,404))
})
app.use(globalErrorHandler)

module.exports = app;
