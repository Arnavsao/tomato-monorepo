# Backend Setup with Clerk Authentication

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk (Get these from your Clerk dashboard)
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Razorpay (Optional - for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

## Getting Clerk Secret Key

1. Go to your Clerk dashboard
2. Navigate to "API Keys"
3. Copy your "Secret Key" (starts with `sk_test_` or `sk_live_`)

## Installation

```bash
npm install
```

## Running the Server

```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

- `POST /api/user/create` - Create or get user from Clerk session
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `POST /api/cart/remove` - Remove item from cart (requires auth)
- `POST /api/cart/get` - Get user cart (requires auth)
- `POST /api/order/place` - Place order (requires auth)
- `GET /api/food/list` - Get food items (public)

## Authentication

All protected endpoints require a valid Clerk session token in the Authorization header:
```
Authorization: Bearer <clerk_session_token>
```