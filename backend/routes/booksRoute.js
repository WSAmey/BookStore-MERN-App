
import {addBook, getBooks, getBooksById, updateBook, deleteBook, getBooksByStock, updateStock, bookCategory, getBooksByCategory } from '../controllers/bookController.js';
import express from 'express'


const router=express.Router();
//add book
router.post("/add",addBook)

//get books
router.get("/getBooks",getBooks)


//get book by id
router.get("/getBooksById/:id",getBooksById)


//update book
router.put("/updateBook/:id",updateBook)

//delete book

router.delete("/deleteBook/:id",deleteBook)

//get books by stock status

router.get("/getBooksByStock/:stock",getBooksByStock)

//update book by id and stock status

router.put("/updateStock/:id",updateStock);

//get book categories

router.get("/getBookCategories",bookCategory);

//get book by category

router.get("/getBooksByCategory/:category",getBooksByCategory);


export default router;
