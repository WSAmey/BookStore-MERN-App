const userRouter=require('express').Router();
const userSchema=require('../models/userModel');

//user login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const check=await userSchema.findOne({email:email,password:password})

        if(check){ //if email already exists
            res.status(200).json("Login Successful")
        }
        else{ //if email is new
            res.status(404).json("Invalid username or password")
        }

    } catch (error) {
        res.status(404).json("error"+error)
    }
})

module.exports=userRouter;