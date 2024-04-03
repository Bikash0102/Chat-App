import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_Name="chat-app";
const connectMongodb=async()=>
{ try{

    const connectInstance=await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`\n MongoDB connected !! DB HOST :${connectInstance.connection.host}`)
}
catch(error)
{
    console.log("Mongodb connection error",error);
    process.exit(1);

}

}
export default connectMongodb;