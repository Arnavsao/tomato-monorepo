import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';

const placeOrder = async (req,res)=>{
    try {
        const newOrder = new orderModel({
            userId: req.body.userId, // Clerk user ID
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findOneAndUpdate({ clerkId: req.body.userId }, { cartData: {} });
        
        res.json({ success: true, orderId: newOrder._id });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// POST /api/orders/razorpay
const createRazorpayOrder = async (req, res) => {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(501).json({
        error: 'Razorpay is not configured on the server',
        details: 'Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env to enable payments.'
      });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Razorpay order', details: error.message });
  }
};

export { placeOrder, createRazorpayOrder }