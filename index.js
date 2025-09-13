import express from "express";
import dotenv from 'dotenv'
import dataBaseConnection from "./config/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config()

const app=express()
const PORT=process.env.PORT||8080
app.use(express.json())
app.use(cors())
app.use(cookieParser());
// Database Connection Here
dataBaseConnection()

// Router Configration Here
import userRouter from './routers/userRouter.js' 
import contactusRouter from './routers/contactusRouter.js'


// Router Define Here
app.use('/api/v1/',userRouter)
app.use('/api/v1/',contactusRouter)


app.use('/',(req,res)=>{
    res.send('Server is Running....')
})

app.listen(PORT,()=>{
    console.log(`Server is running port on ${PORT}`)
})