// routes/userRoutes.js
import express from "express";
import { registerUser,loginUser, logoutUser, checkAuth } from "../controllers/userController.js";

const router = express.Router();

router.post("/user-register", registerUser);
router.post("/user-login", loginUser);
router.post('/user-logout',logoutUser)
router.get('/auth/check',checkAuth)

export default router;
