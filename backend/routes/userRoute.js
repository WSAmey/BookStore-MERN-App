import express from 'express';
import { login } from '../controllers/userController.js';

const userRouter=express.Router();

//user login
userRouter.post("/login",login)

export default userRouter;