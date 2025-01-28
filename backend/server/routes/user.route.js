import express from 'express'
import { getUser, loginUser, logout, registerUser, updateProfile } from '../controller/user.controller.js'
import { protectRoute } from '../middleware/auth/auth.middleware.js';
const userRouter=express.Router()

userRouter.post("/register",registerUser)
export default userRouter;
userRouter.post("/login",loginUser)
userRouter.post("/logout",logout)
userRouter.put("/update-profile",protectRoute,updateProfile)
userRouter.get("/get-user",protectRoute,getUser)