import mongoose from "mongoose";


// connectDB();

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvatarset:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    },
})

export const user = mongoose.model("user",userSchema);
