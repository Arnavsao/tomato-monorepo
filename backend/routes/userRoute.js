import express from "express";
import { createOrGetUser, updateProfile, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Apply auth middleware to all routes to get user information
userRouter.post("/create", authMiddleware, createOrGetUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;