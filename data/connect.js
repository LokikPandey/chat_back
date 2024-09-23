import mongoose from "mongoose";
import { config } from "dotenv";

config({
    path: "./data/config.env",
});

export const connectDB =()=>{
    mongoose.connect(process.env.MONGO_URL,{
    })
    .then(()=>{
        console.log('connection made')
    }).catch((e)=>{
        console.log(e)
    })
}
