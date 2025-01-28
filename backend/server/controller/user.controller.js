import errorHandler from "../middleware/error-logs/errorHandler.js"
import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import { generateToken } from "../utils/generateToken.js";
//! register contrller
export const registerUser=async (req,res)=>{
    const {fullname,email,password,gender}=req.body;
    if(!fullname || !email || !password ||!gender){
        return errorHandler(res,400,"all fields requied")
    }
    if(password.length <6){
        return errorHandler(res,400,"password lenght must be 6 ch")
    }
   if(!validator.isEmail(email)){
    return errorHandler(res,400,"please enter valid email")
   }
    try{
        // user exist check 
        const isExistUser=await userModel.findOne({email:email})
        if(isExistUser){
            return errorHandler(res,400,"user already exist ")
        }
        // password hash
        const hashPassword=await bcrypt.hash(password,12)
         
        const boyProfilePic="https://avatar.iran.liara.run/public/boy"
        const girlProfilePic="https://avatar.iran.liara.run/public/girl"
        // create user
        const user= new userModel({
            fullName:fullname,
            email:email,
            password:hashPassword,
            profilePic: gender ==='male' ? boyProfilePic:girlProfilePic,
        })
        if(user){
            generateToken(user._id,res)
             await user.save()
             return errorHandler(res,201,"user create sucessful",user)
        }else{
            return errorHandler(res,400,"user create failed try again")
        }
        console.log("registor user")
        return errorHandler(res,200,"user")
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}
//! login controller 
export const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return errorHandler(res,400,"all fields requied")
    }
    try{
        const checkUser= await userModel.findOne({email:email})
        if(!checkUser){
            return errorHandler(res,400,"user not found")
        }
        // check password 
        const checkpass=await bcrypt.compare(password,checkUser.password)
        if(checkpass){
            generateToken(checkUser._id,res)
            return errorHandler(res,200,"user login sucess",checkUser)
        }else{
            return errorHandler(res,400,"incorrect password")
        }
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}
//! logout 
export const logout=async (req,res)=>{
    try{
        res.cookie("token","",{maxAge:0})
        return errorHandler(res,200,"logout sucess")
    }catch(err){
        return errorHandler(res,500,`sever error ${err.message}`)
    }
}
//! updateProfile
export const updateProfile=async (req,res)=>{
    // const {profilePic}=req.file;
    // if(!profilePic){
    //     return errorHandler(res,400,"please select profile")
    // }
    try{
        console.log("upate")
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}
//! get user
export const getUser=async (req,res)=>{
    const userId=req.user._id
    try{
        const user= await  userModel.findById(userId)
        if(!user){
            return errorHandler(res,400,"get user not found")
        }
        return errorHandler(res,200,"get user sucess",user)
    }catch(err){
        return errorHandler(res,500,`server error ${err.message}`)
    }
}