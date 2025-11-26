# 💳 Razorpay Payment Gateway Integration

This document describes the Razorpay payment integration implementation for the TOMATO food delivery application.

## ✅ Implementation Summary

The Razorpay payment gateway has been fully integrated with the following features:

1. **Backend Payment Processing**
   - Razorpay order creation endpoint
   - Payment signature verification
   - Order placement after successful payment
   - Automatic cart clearing after order placement

2. **Frontend Payment Flow**
   - Form validation for delivery information
   - Razorpay checkout integration
   - Payment success/failure handling
   - Order confirmation and navigation

## 🔧 Environment Variables Required

### Backend (`backend/.env`)

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx  # Your Razorpay Key ID
RAZORPAY_KEY_SECRET=your_secret_key_here  # Your Razorpay Secret Key
```

**Note**: For production, use live keys (`rzp_live_...`)

### Frontend (`frontend/.env.local` or deployment environment)

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx  # Your Razorpay Key ID (same as backend)
```

**Important**: 
- Frontend only needs the Key ID (public key)
- Backend needs both Key ID and Secret Key
- All Vite environment variables must be prefixed with `VITE_`

## 📡 API Endpoints

### 1. Create Razorpay Order
- **Endpoint**: `POST /api/order/razorpay`
- **Auth**: Required (Bearer token)
- **Request Body**:
```json
{
  "amount": 100,
  "currency": "INR",
  "receipt": "receipt_123"
}
```
- **Response**:
```json
{
  "orderId": "order_xyz123",
  "amount": 10000,
  "currency": "INR"
}
```

### 2. Verify Payment and Place Order
- **Endpoint**: `POST /api/order/razorpay/verify`
- **Auth**: Required (Bearer token)
- **Request Body**:
```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_xyz",
  "orderData": {
    "userId": "user_123",
    "items": [...],
    "amount": 100,
    "address": {...}
  }
}
```
- **Response**:
```json
{
  "success": true,
  "orderId": "order_db_id",
  "message": "Payment verified and order placed successfully"
}
```

## 🔄 Payment Flow

1. **User fills delivery form** → Form validation
2. **User clicks "Pay with Razorpay"** → Frontend creates Razorpay order via backend
3. **Razorpay checkout opens** → User completes payment
4. **Payment success** → Frontend verifies payment with backend
5. **Backend verifies signature** → Creates order in database
6. **Cart cleared** → User redirected to home page

## 🛡️ Security Features

- ✅ Payment signature verification using HMAC SHA256
- ✅ Server-side payment verification (prevents tampering)
- ✅ Authentication required for all payment endpoints
- ✅ Form validation before payment initiation
- ✅ Error handling and logging throughout

## 📝 Code Changes

### Backend Files Modified

1. **`backend/controllers/orderController.js`**
   - Added `createRazorpayOrder` function
   - Added `verifyRazorpayPayment` function with signature verification
   - Added comprehensive logging

2. **`backend/routes/orderRoute.js`**
   - Fixed route path from `/orders/razorpay` to `/razorpay`
   - Added `/razorpay/verify` route

3. **`backend/models/orderModel.js`**
   - Added `razorpayOrderId` and `razorpayPaymentId` fields

### Frontend Files Modified

1. **`frontend/index.html`**
   - Added Razorpay checkout script

2. **`frontend/src/pages/PlaceOrder/PlaceOrder.jsx`**
   - Complete rewrite with form state management
   - Payment flow integration
   - Form validation
   - Error handling with toast notifications
   - Cart clearing after successful order

## 🧪 Testing

### Test Mode

Use Razorpay test credentials:
- Test cards: https://razorpay.com/docs/payments/test-cards/
- Test Key ID: `rzp_test_...`
- Test Secret Key: (from Razorpay dashboard)

### Test Flow

1. Add items to cart
2. Navigate to Place Order page
3. Fill in delivery information
4. Click "Pay with Razorpay"
5. Use test card: `4111 1111 1111 1111`
6. Complete payment
7. Verify order is created and cart is cleared

## 🐛 Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay script is loaded in `index.html`
- Verify `VITE_RAZORPAY_KEY_ID` is set correctly
- Check browser console for errors

### Payment Verification Fails
- Verify `RAZORPAY_KEY_SECRET` is set correctly in backend
- Check backend logs for signature verification errors
- Ensure payment details are not tampered with

### Order Not Created After Payment
- Check backend logs for errors
- Verify database connection
- Check if user authentication token is valid

## 📚 Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/test-cards/)
- [Razorpay Integration Guide](https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/)

## ✨ Features Implemented

- ✅ Complete payment flow
- ✅ Form validation
- ✅ Payment signature verification
- ✅ Order creation after payment
- ✅ Cart clearing
- ✅ Error handling
- ✅ Logging for debugging
- ✅ Toast notifications for user feedback
- ✅ Loading states
- ✅ Responsive design

