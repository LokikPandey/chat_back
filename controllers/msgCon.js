import { messages } from "../models/msgModel.js";

export const addmessage= async(req,res,next)=>{
    try{
        const {from,to,message} = req.body;
        const data= await messages.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });

        if(data) return res.json({msg:"message added successfully"});
        return res.json({msg:"message not added"});
    }
    catch(e)
    {
        next(e);
    }
};
export const getmessage = async(req,res,next)=>{
    try{
        const {from,to}= req.body;
        const message=await messages.find({
            users:{
                $all:[from,to],
            },
        })
        .sort({updatedAt:1});
        const projectMessage= message.map((msg)=>{
            return{
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            };
        });
        res.json(projectMessage);

    }
    catch(e)
    {
        next(e);
    }
};