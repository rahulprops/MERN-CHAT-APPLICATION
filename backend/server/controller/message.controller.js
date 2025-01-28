
import mongoose from "mongoose";
import errorHandler from "../middleware/error-logs/errorHandler.js"
import userModel from "../model/user.model.js";
import messageModel from "../model/message.model.js";
import conversationModel from "../model/conversation.model.js";
//! getUserSidebar
export const getUserSidebar=async (req,res)=>{
    try{
      const UserId=req.user._id;
    //   console.log(UserId)
    const filterUsers=await userModel.find({_id:{$ne: UserId}}).select("-password")
    return errorHandler(res,200,"get user sucess",filterUsers)
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}
//! get message
export const getMessage= async (req,res)=>{
    const {id:userToChatId}=req.params;
    const senderId=req.user._id
    try{
        // validate userto chat id
        if(!mongoose.Types.ObjectId.isValid(userToChatId)){
            return errorHandler(res,400,"please enter valid id")
        }
        const conversation= await conversationModel.findOne({
            participants:{$all: [senderId,userToChatId]}
        }).populate("message")
        if(!conversation){
            return errorHandler(res,200,[])
        }
        const message=conversation.message
        return errorHandler(res,200,"message get sucess",message)
        console.log(message)
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}
//! send message
export const sendMessage=async (req,res)=>{
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    const {text,image}=req.body;
    try{
        let conversation=await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            conversation= await conversationModel.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage=new messageModel({
            senderId,
            receiverId,
            text,
        })
        if(newMessage){
            conversation.message.push(newMessage._id)
            // await conversation.save()
            // await newMessage.save()
            await Promise.all([conversation.save(),newMessage.save()])
            // realtime socket.io
            return errorHandler(res,201,"message send sucess",newMessage)
        }else{
            return errorHandler(res,400,"message send failed")
        }

    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}
