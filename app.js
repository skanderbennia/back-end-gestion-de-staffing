const path = require('path')
const express= require("express")
const dotenv = require("dotenv").config({path:__dirname+"/config.env"})
const bodyParser = require("body-parser")
const morgan = require("morgan")
const userRouter = require("./routes/userRouter")
const groupeRouter = require("./routes/groupeRouter")
const tacheRouter  = require('./routes/tacheRouter')
const viewRouter = require("./routes/viewRouter")
const AppError = require('./utils/appError')
const globalErrorHandler = require("./controllers/errorController")
const sendMail = require('./utils/mail')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if(process.env.NODE_ENV === "development")
{
    app.use(morgan("dev"))
}
app.set('view engine', 'ejs');
app.use(express.static('views/pages'));
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    console.log(req.headers)
    next()
})
app.use('/',viewRouter)
app.use('/api/v1/users',userRouter)
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
