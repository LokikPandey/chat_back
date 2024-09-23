import express from 'express';
import { addmessage,getmessage } from '../controllers/msgCon.js';

const router = express.Router();

router.post("/addmessage/",addmessage);
router.post("/getmessage/",getmessage);


export default router;