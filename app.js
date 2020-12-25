const express= require("express")
const dotenv = require("dotenv").config({path:__dirname+"/config.env"})
const morgan = require("morgan")
const userRouter = require("./routes/userRouter")
const adminRouter = require("./routes/adminRouter")
const groupeRouter = require("./routes/groupeRouter")

const app = express()


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

module.exports = app;
