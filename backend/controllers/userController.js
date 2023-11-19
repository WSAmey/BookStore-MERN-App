import userSchema from "../models/userModel.js";

export const login= (req,res)=>{
    const {email,password}=req.body;
    userSchema.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("Invalid credentials")
            }
        }
        else{
            res.json("User does not exist")
        }
    })
    
}