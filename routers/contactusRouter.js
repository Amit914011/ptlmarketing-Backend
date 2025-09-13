import express from "express";
import {createContactUs, getAllContactusData} from '../controllers/contactusController.js'
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router()

router.post('/create-contact',createContactUs)
router.get('/get-contact',authMiddleware, getAllContactusData)


export default router