import { v2 as cloudinary } from 'cloudinary';
async function uploadimage(imagepath){
    try{
        const result= await cloudinary.uploader.upload(imagepath,{
            folder:"mern-chat-application"
        })
        return result;
    }catch(err){
        return err
    }
}
 export default uploadimage;