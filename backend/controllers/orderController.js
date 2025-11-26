import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Place order directly (without payment gateway)
 * @route POST /api/order/place
 * @access Private
 */
const placeOrder = async (req,res)=>{
    try {
        console.log('📦 Placing order for user:', req.body.userId);
        const newOrder = new orderModel({
            userId: req.body.userId, // Clerk user ID
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findOneAndUpdate({ clerkId: req.body.userId }, { cartData: {} });
        
        console.log('✅ Order placed successfully:', newOrder._id);
        res.json({ success: true, orderId: newOrder._id });
    }
    catch(error){
        console.error('❌ Error placing order:', error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

/**
 * Create Razorpay order
 * @route POST /api/order/razorpay
 * @access Private
 */
const createRazorpayOrder = async (req, res) => {
  try {
    console.log('💳 Creating Razorpay order');
    console.log('Request body:', req.body);
    console.log('Request amount:', req.body.amount);
    console.log('Request currency:', req.body.currency);
    console.log('Request receipt:', req.body.receipt);
    
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    console.log('Razorpay Key ID exists:', !!keyId);
    console.log('Razorpay Key Secret exists:', !!keySecret);

    if (!keyId || !keySecret) {
      console.error('❌ Razorpay keys not configured');
      return res.status(501).json({
        error: 'Razorpay is not configured on the server',
        details: 'Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env to enable payments.'
      });
    }

    // Initialize Razorpay client
    let razorpay;
    try {
      razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
      console.log('✅ Razorpay client initialized');
    } catch (initError) {
      console.error('❌ Failed to initialize Razorpay client:', initError);
      return res.status(500).json({
        error: 'Failed to initialize Razorpay',
        details: initError.message || 'Razorpay initialization failed'
      });
    }

    const { amount, currency = 'INR', receipt } = req.body;
    
    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Validate amount is a number
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount format' });
    }

    // Validate and sanitize receipt - Razorpay has restrictions on receipt format
    // Receipt must be max 40 characters, alphanumeric and underscore/hyphen only
    let sanitizedReceipt = receipt || `rcpt_${Date.now()}`;
    // Remove any invalid characters and limit length
    sanitizedReceipt = sanitizedReceipt.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 40);
    if (!sanitizedReceipt || sanitizedReceipt.length === 0) {
      sanitizedReceipt = `rcpt_${Date.now()}`;
    }

    const options = {
      amount: Math.round(numericAmount * 100), // Convert to paise (smallest currency unit)
      currency,
      receipt: sanitizedReceipt,
      payment_capture: 1,
    };
    
    console.log('📝 Razorpay order options:', { ...options, amount: `${options.amount} paise` });
    
    // Create Razorpay order
    let order;
    try {
      order = await razorpay.orders.create(options);
      console.log('✅ Razorpay order created:', order.id);
    } catch (razorpayError) {
      console.error('❌ Razorpay API error:', razorpayError);
      throw razorpayError; // Re-throw to be caught by outer catch
    }
    
    res.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });
  } catch (error) {
    console.error('❌ Failed to create Razorpay order:', error);
    console.error('Error type:', error.constructor.name);
    console.error('Error details:', {
      message: error.message,
      status: error.statusCode,
      description: error.description,
      field: error.field,
      source: error.source,
      step: error.step,
      reason: error.reason,
      metadata: error.metadata,
      code: error.code,
      error: error.error,
      stack: error.stack?.substring(0, 500)
    });
    
    // Extract error message from various possible sources
    let errorMessage = 'Unknown error';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.description) {
      errorMessage = error.description;
    } else if (error.error) {
      errorMessage = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
    } else if (error.toString && error.toString() !== '[object Object]') {
      errorMessage = error.toString();
    }
    
    res.status(500).json({ 
      error: 'Failed to create Razorpay order', 
      details: errorMessage,
      razorpayError: process.env.NODE_ENV === 'development' ? {
        statusCode: error.statusCode,
        description: error.description,
        field: error.field,
        code: error.code,
        error: error.error
      } : undefined
    });
  }
};

/**
 * Verify Razorpay payment and place order
 * @route POST /api/order/razorpay/verify
 * @access Private
 */
const verifyRazorpayPayment = async (req, res) => {
  try {
    console.log('🔍 Verifying Razorpay payment...');
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('❌ Missing payment verification data');
      return res.status(400).json({ 
        error: 'Missing payment verification data',
        details: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required'
      });
    }

    if (!orderData || !orderData.userId || !orderData.items || !orderData.address) {
      console.error('❌ Missing order data');
      return res.status(400).json({ 
        error: 'Missing order data',
        details: 'orderData with userId, items, and address is required'
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error('❌ Razorpay key secret not configured');
      return res.status(501).json({
        error: 'Razorpay is not configured on the server'
      });
    }

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('❌ Payment signature verification failed');
      return res.status(400).json({ 
        error: 'Payment verification failed',
        details: 'Invalid payment signature'
      });
    }

    console.log('✅ Payment signature verified successfully');

    // Create order in database
    const newOrder = new orderModel({
      userId: orderData.userId,
      items: orderData.items,
      amount: orderData.amount,
      address: orderData.address,
      payment: true, // Mark as paid
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await newOrder.save();
    console.log('✅ Order saved to database:', newOrder._id);

    // Clear user's cart
    await userModel.findOneAndUpdate(
      { clerkId: orderData.userId }, 
      { cartData: {} }
    );
    console.log('✅ Cart cleared for user:', orderData.userId);

    res.json({ 
      success: true, 
      orderId: newOrder._id,
      message: 'Payment verified and order placed successfully'
    });
  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Failed to verify payment', 
      details: error.message 
    });
  }
};

export { placeOrder, createRazorpayOrder, verifyRazorpayPayment }