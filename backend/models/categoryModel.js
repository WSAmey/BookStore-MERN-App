import mongoose from 'mongoose';

const categorySchema=new mongoose.Schema({
    catname:{
        type:String,
        required:true
    }
})

export default new mongoose.model('category',categorySchema);