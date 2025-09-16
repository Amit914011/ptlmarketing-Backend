// routes/userRoutes.js
import express from "express";
import { registerUser,loginUser, logoutUser, getAllUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user-register", registerUser);
router.post("/user-login", loginUser);
router.post('/user-logout',logoutUser)
router.get('/user',authMiddleware,getAllUser)


export default router;
