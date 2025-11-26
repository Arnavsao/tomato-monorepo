import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, createRazorpayOrder, verifyRazorpayPayment } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/razorpay", authMiddleware, createRazorpayOrder);
orderRouter.post("/razorpay/verify", authMiddleware, verifyRazorpayPayment);

export default orderRouter;

