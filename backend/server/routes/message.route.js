import express from 'express'
import { getMessage, getUserSidebar, sendMessage } from '../controller/message.controller.js'
import { protectRoute } from '../middleware/auth/auth.middleware.js'
const messageRouter=express.Router()

messageRouter.get("/user",protectRoute,getUserSidebar)
messageRouter.get("/get/:id",protectRoute,getMessage)
messageRouter.post("/send/:id",protectRoute,sendMessage)
export default messageRouter;