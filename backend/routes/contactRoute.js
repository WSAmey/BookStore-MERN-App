import express from "express";
import { addContact, getContactById, getContacts, updateContact } from "../controllers/contactController.js";

const contactRouter=express.Router();

contactRouter.post("/addContact",addContact);
contactRouter.get("/getContacts",getContacts);
contactRouter.get("/getContactById/:id",getContactById);
contactRouter.put("/updateContact/:id",updateContact);




export default contactRouter;