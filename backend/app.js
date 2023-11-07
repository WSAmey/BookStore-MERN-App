const express= require("express");
const app=express();
const cors= require("cors")
const router = require("./routes/booksRoute.js");
const userRouter=require('./routes/userRoute.js')
require("./DBConnection/conn.js")

app.use(cors());
app.use(express.json());
app.use("/api/v1",router);
app.use("/api/v1",userRouter);

app.listen(1000,()=>{
    console.log("Server Started Successfully");
})