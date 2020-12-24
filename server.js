const app = require('./app')
const mongoose = require("mongoose")

const dotenv = require('dotenv').config({path:__dirname+"/config.env"})

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connection is successful')
})



const port = 3000
app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})