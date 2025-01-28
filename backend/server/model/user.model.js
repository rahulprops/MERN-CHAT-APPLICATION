import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:3,
    },
    gender:{
        type:String,
        enum:["male","female"],
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})
const userModel=mongoose.model("user",userSchema)
export default userModel;