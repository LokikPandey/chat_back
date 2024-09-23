import express from 'express'
import { register,login,setavatar, getallusers } from '../controllers/userCon.js'

const router = express.Router()
router.post("/register",register);
router.post("/login",login);
router.post("/avatar/:id",setavatar);
router.get("/allusers/:id",getallusers);

export default router;
