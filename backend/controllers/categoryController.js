import categorySchema from '../models/categoryModel.js'

export const addCategory=async(req,res)=>{
   

    try {
        const data=req.body;
        const newCat=new categorySchema(data);
        await newCat.save().then(()=>{
         res.status(200).json({message:" Category Added Successfully"})
        }); 
     } catch (error) {
         console.log(error);
     }
}

export const getCategory=async(req,res)=>{
    let cat;
    try {
    cat = await categorySchema.find();
    res.status(200).json({cat})
    } catch (error) {
        console.log(error);
    }
}

export const getCategoryById=async(req,res)=>{
    let cat;
    const id=req.params.id;
    try {
       cat= await categorySchema.findById(id); 
    res.status(200).json({cat});
    } catch (error) {
        console.log(error);
    }
}

export const updateCategory=async(req,res)=>{
    const id=req.params.id;
    // const {bookname,description,author,image,price}  =  req.body;
    try {
     await categorySchema.findByIdAndUpdate(id,req.body,{new:true}); 
    res.status(200).json({message:" Category Was Updated Successfully"})
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory=async(req,res)=>{
    const id=req.params.id;
    try {
        await categorySchema.findByIdAndDelete(id);
        res.status(200).json({message:"Category Deleted Successfully"})
    } catch (error) {
        console.log(error);
    }
}
