import express from "express";

import mongoose from 'mongoose'
// import bodyParser from 'body-parser'
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/booksRoute.js";
import userRouter  from './routes/userRoute.js';
import contactRouter from "./routes/contactRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",router);
app.use("/api/v1",userRouter);
app.use("/api/v1",contactRouter);
app.use("/api/v1",categoryRouter);

dotenv.config();

const PORT=process.env.PORT || 7000

const URL=process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
    console.log("DB Connected Successfully!")

    app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`)
    })

}).catch((error)=>{
    console.log(error)
})
