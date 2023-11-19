import mongoose from 'mongoose';

const bookSchema =new mongoose.Schema({

    bookname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },  
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stockstatus:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

 export default new mongoose.model("book",bookSchema);