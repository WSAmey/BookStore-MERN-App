import express from 'express';
import { addCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from '../controllers/categoryController.js';

const categoryRouter=express.Router();

// add category

categoryRouter.post("/addCategory",addCategory);

// get category

categoryRouter.get("/getCategory",getCategory);

//get Category By Id

categoryRouter.get("/getCategoryById/:id",getCategoryById);

//update category

categoryRouter.put("/updateCategory/:id",updateCategory);

//delete category

categoryRouter.delete("/deleteCategory/:id",deleteCategory);

export default categoryRouter;