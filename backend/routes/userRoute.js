import express from "express";
import { loginUser, registerUser, updateProfile, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;