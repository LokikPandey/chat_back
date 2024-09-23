import { messages } from "../models/msgModel.js";
import { user } from "../models/usermodel.js";
import bcrypt from "bcrypt";

export const register = async (req,res,next) =>{
    try{

        const {username,email,password} = req.body;
        const userc = await user.findOne({username});
        if(userc)
        {
            console.log('user already');
            return res.json({msg:"User already exists",status:false});
        }
        const emailc = await user.findOne({email});
        if(emailc)
        {
            console.log('same email');
            res.json({msg:"email already registered",status:false});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUSer=await user.create({
            username,email,password:hashedPassword,
        })
        delete user.password;
        return res.json({status:true,user:newUSer});
    }catch(e)
    {
        next(e);
    }
}

export const login = async(req,res,next) =>{
    try{
        const {username,password}=req.body;
        const userc = await user.findOne({username});       
        if(!userc)
        {
            console.log("user not found")
            return res.json({message:"user not found",status:false});
        }

        const isMatch = await bcrypt.compare(password,userc.password);
        if(!isMatch)
        {
            console.log("wrong password")
            return res.json({message:"wrong password",status:false});
        }
        delete userc.password;
        return res.json({status:true,user:userc});
    }catch(e)
    {
        next(e);
    }
}

export const setavatar = async(req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await user.findByIdAndUpdate(userId, {
          isAvatarset: true,
          avatarImage,
        });
        
        return res.json({
          isSet: userData.isAvatarset,
          image: userData.avatarImage,
        });
      } catch (ex) {
        next(ex);
      }
}

export const getallusers =async(req,res,next)=>{
    try{
        const users= await user.find({_id : {$ne :req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    }catch(e)
    {
        next(e);
        
    }
}