import bookSchema from '../models/booksModel.js';

export const addBook=async(req,res)=>{
    try {
       const data=req.body;
       const newBook=new bookSchema(data);
       await newBook.save().then(()=>{
        res.status(200).json({message:" Book Added Successfully"})
       }); 
    } catch (error) {
        console.log(error);
    }
}

export const getBooks=async(req,res)=>{
    let books;
    try {
    books = await bookSchema.find();
    res.status(200).json({books})
    } catch (error) {
        console.log(error);
    }
}

export const getBooksById=async(req,res)=>{
    let book;
    const id=req.params.id;
    try {
       book= await bookSchema.findById(id); 
    res.status(200).json({book});
    } catch (error) {
        console.log(error);
    }
}

export const updateBook=async(req,res)=>{
    const id=req.params.id;
    let book;
    // const {bookname,description,author,image,price}  =  req.body;
    try {
    book = await bookSchema.findByIdAndUpdate(id,req.body,{new:true}); 
    res.status(200).json({message:"Book Details Updated Successfully"})
    } catch (error) {
        console.log(error);
    }
}

export const deleteBook=async(req,res)=>{
    const id=req.params.id;
    try {
        await bookSchema.findByIdAndDelete(id);
        res.status(200).json({message:"Book Deleted Successfully"})
    } catch (error) {
        console.log(error);
    }
}

export const getBooksByStock=async(req,res)=>{
    try {
        const stockstatus=req.params.stock;
        console.log(stockstatus);
        //This will convert the string value of req.params.stock to an object, and then pass that object to the find() method. This should fix the error.
        const stockdata=await bookSchema.find({stockstatus});
     
        res.status(200).json({stockdata})
      
    } catch (error) {
        console.log(error);
    }
}

export const updateStock=async(req,res)=>{
    try {
        const id= req.params.id;
        const stock=await bookSchema.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"Stock status has been updated successfully"})
    } catch (error) {
        console.log(error);
    }
}

export const bookCategory=async(req,res)=>{
    try {
        const bookcat=await bookSchema.distinct("category");
        /*
        The distinct function in MongoDB's Mongoose library expects the field name as a string because it needs to know which field you want to retrieve distinct values from. The field name is provided as a string parameter to the distinct method to specify the field on which you want to perform the distinct operation.
        
        If you try to pass category without the quotes, then it would be interpreted as a variable, and Mongoose wouldn't know what field to use for the distinct operation. It expects a string literal representing the field name.

        So, to summarize, when using the distinct function, you should always pass the field name as a string to indicate the field on which you want to perform the distinct operation.

        */
        res.status(200).json({bookcat})
    } catch (error) {
        console.log(error);
    }
}

export const getBooksByCategory=async(req,res)=>{

 try {
    const category=req.params.category;
    // /The find method in Mongoose expects a query object as its parameter. When you pass category without curly braces mongoose interprets it as if you're passing a string directly, which is not the correct usage. Mongoose is expecting an object that represents the filtering criteria for the query.

    const categoryBook=await bookSchema.find({category});

    //You are creating an object with a key named category and a value equal to the value of the category variable. This is the correct way to structure the query object for the find method.
    
    res.status(200).json({categoryBook});
 } catch (error) {
    console.log(error);
 }
}