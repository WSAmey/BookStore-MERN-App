
const router=require('express').Router();
const bookSchema = require('../models/booksModel.js')

//add book
router.post("/add",async(req,res)=>{
    try {
       const data=req.body;
       const newBook=new bookSchema(data);
       await newBook.save().then(()=>{
        res.status(200).json({message:" Book Added Successfully"})
       }); 
    } catch (error) {
        console.log(error);
    }
})

//get books
router.get("/getBooks",async(req,res)=>{
    let books;
    try {
    books = await bookSchema.find();
    res.status(200).json({books})
    } catch (error) {
        console.log(error);
    }
})


//get book by id
router.get("/getBooksById/:id",async(req,res)=>{
    let book;
    const id=req.params.id;
    try {
       book= await bookSchema.findById(id); 
    res.status(200).json({book});
    } catch (error) {
        console.log(error);
    }
})


//update book
router.put("/updateBook/:id",async(req,res)=>{
    const id=req.params.id;
    let book;
    // const {bookname,description,author,image,price}  =  req.body;
    try {
    book = await bookSchema.findByIdAndUpdate(id,req.body,{new:true}); 
    res.status(200).json({message:" Data Updated Successfully"})
    } catch (error) {
        console.log(error);
    }
})

//delete book

router.delete("/deleteBook/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        await bookSchema.findByIdAndDelete(id);
        res.status(200).json({message:"Book Deleted Successfully"})
    } catch (error) {
        console.log(error);
    }
})


module.exports= router;
