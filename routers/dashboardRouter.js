import express from "express";
import { getTotalData } from '../controllers/dashboardController.js'
import authMiddleware from "../middleware/authMiddleware.js";
const router= express.Router()

router.get('/dashboard',authMiddleware,getTotalData)

export default router