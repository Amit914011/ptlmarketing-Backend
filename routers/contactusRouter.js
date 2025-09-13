import express from "express";
import {createContactUs, deleteContactusDataById, getAllContactusData, getConatctusDataById} from '../controllers/contactusController.js'
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router()

router.post('/create-contact',createContactUs)
router.get('/get-contact',authMiddleware, getAllContactusData)
router.get('/get-contact/:id',authMiddleware,getConatctusDataById)
router.delete('/delete-contact/:id',authMiddleware,deleteContactusDataById)


export default router