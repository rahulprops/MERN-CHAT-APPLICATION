import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config.js'
async function cloudconnection(){
    try{

       await cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret: process.env.API_SECRET// Click 'View API Keys' above to copy your API secret
        });
        console.log( "cloudinary connect sucessful")
    }catch(err){
        return  err
    }
    // Configuration
    

}
export default cloudconnection;