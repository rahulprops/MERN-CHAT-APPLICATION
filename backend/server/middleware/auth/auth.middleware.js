import userModel from "../../model/user.model.js"
import errorHandler from "../error-logs/errorHandler.js"
import jwt from 'jsonwebtoken'
export const protectRoute=async (req,res,next)=>{
    try{
        const token=req.cookies.token
        // console.log(token)
        if(!token){
            return errorHandler(res,400,"unAutherized : token not found")
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return errorHandler(res,400,"token not verify")
        }
        // ischeck token user found or not
        const user=await userModel.findById(decode.userId)
        if(!user){
            return errorHandler(res,400,"user not found")
        }
        req.user=user;
        next()
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}