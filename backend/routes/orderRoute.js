import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, createRazorpayOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/orders/razorpay", authMiddleware, createRazorpayOrder);

export default orderRouter;

