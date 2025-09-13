import express from "express";
import { createBlog } from '../controllers/blogController.js'
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/create-blog',authMiddleware,upload.single("featuredImage"),createBlog)


export default router