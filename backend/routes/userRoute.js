import express from "express";
import { createOrGetUser, updateProfile, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create", createOrGetUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;