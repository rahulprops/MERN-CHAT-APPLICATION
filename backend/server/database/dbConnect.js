import mongoose from "mongoose";
import 'dotenv/config.js'
const dbConnect= async ()=>{
    try{
         const db=mongoose.connect(process.env.DB_CONNECT)
         if(db){
            console.log("database connect sucessful")
         }else{
            console.log("database not connect")
         }
    }catch(err){
        throw new Error(err)
    }
}
export default dbConnect;