import express from "express";
import { getTotalData } from '../controllers/dashboardController.js'
const router= express.Router()

router.get('/dashboard',getTotalData)

export default router