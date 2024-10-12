import express from "express"
import cors from "cors"
import {Server} from "socket.io";
import { config } from "dotenv"
import userRoutes from './routes/userRoutes.js'
// import { messages } from "./models/msgModel.js"
import msgRoutes from './routes/msgRoutes.js'
// import { connectDB } from "../data/connect.js";
import { connectDB } from "./data/connect.js"
config({
        path:"./data/config.env",
    })

connectDB();
    
const app=express();
    
const corsOptions = {
  origin: ['https://chat-front-ochre.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());



const server = app.listen(process.env.PORT,()=>{
    console.log(`the port is working in ${process.env.PORT}`);
})
 
app.use('/api/auth',userRoutes);
app.use('/api/messages',msgRoutes);

const io=new Server(server,{
    cors:{
        origin:"https://chat-front-ochre.vercel.app",
        methods:["GET","POST"],
        credentials:true
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    })
});
