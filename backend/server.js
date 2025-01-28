import express from 'express'
import 'dotenv/config.js'
import userRouter from './server/routes/user.route.js';
import dbConnect from './server/database/dbConnect.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cloudconnection from './server/config/Cloudniary.js';
import cors from 'cors'
import messageRouter from './server/routes/message.route.js';
import { server,app } from './server/socket/socket.js';

// const app=express()
const port=process.env.PORT;
 //! middlewares
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(cookieParser())
 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
 }))
//! api endpoints
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)
//! SERVER START
server.listen(port,()=>{
    console.log(`server is running on port :http://localhost:${port}`)
    dbConnect()
    cloudconnection()
})