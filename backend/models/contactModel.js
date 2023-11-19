import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    entrydate:{
        type:Date,
        default:Date.now
    },
    cresponse:{
        type:String,
        required:true
    },
})

export default new mongoose.model("contact",contactSchema);