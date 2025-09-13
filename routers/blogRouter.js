import express from "express";
import { createBlog,deleteBlog,getBlogBySlug,getBlogs, updateBlog } from '../controllers/blogController.js'
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/create-blog',authMiddleware,upload.single("featuredImage"),createBlog)
router.get("/get-blog", getBlogs);
router.get("/get-blog/:slug", getBlogBySlug);
router.put("/update-blog/:id",authMiddleware, upload.single("featuredImage"), updateBlog);
router.delete("/delete-blog/:id",authMiddleware, deleteBlog);


export default router