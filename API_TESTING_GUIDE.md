# 🧪 API Testing Guide

Complete guide for testing all TOMATO APIs locally and in production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Testing](#local-testing)
3. [Production Testing](#production-testing)
4. [API Endpoints Reference](#api-endpoints-reference)
5. [Testing Tools](#testing-tools)

---

## 🔧 Prerequisites

### For Local Testing:
- Backend server running on `http://localhost:8000`
- MongoDB connection configured
- Clerk authentication set up

### For Production Testing:
- Backend deployed URL (e.g., `https://tomato-monorepo.onrender.com`)
- Valid Clerk authentication token
- CORS configured correctly

---

## 🏠 Local Testing

### Step 1: Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Server should start on `http://localhost:8000`

### Step 2: Test Health Endpoint

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "ok",
  "dbConnected": true,
  "dbState": 1,
  "env": "development"
}
```

---

## 📡 API Endpoints Reference

### Base URLs
- **Local**: `http://localhost:8000`
- **Production**: `https://tomato-monorepo.onrender.com` (or your deployed URL)

### Authentication
Most endpoints require Clerk authentication token in the header:
```
Authorization: Bearer <clerk_session_token>
```

---

## 🍕 Food APIs

### 1. Get Food List (Public)
```bash
# GET /api/food/list
curl http://localhost:8000/api/food/list
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Pizza",
      "price": 10,
      "category": "Pasta",
      "image": "image.jpg"
    }
  ]
}
```

### 2. Add Food Item (Admin - Requires Auth)
```bash
# POST /api/food/add
curl -X POST http://localhost:8000/api/food/add \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -F "name=Pizza" \
  -F "description=Delicious pizza" \
  -F "price=10" \
  -F "category=Pasta" \
  -F "image=@/path/to/image.jpg"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Food Added"
}
```

### 3. Remove Food Item (Admin - Requires Auth)
```bash
# POST /api/food/remove
curl -X POST http://localhost:8000/api/food/remove \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "food_item_id"}'
```

---

## 👤 User APIs

### 1. Create or Get User
```bash
# POST /api/user/create
curl -X POST http://localhost:8000/api/user/create \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "https://example.com/pic.jpg"
  }'
```

### 2. Get User Profile (Requires Auth)
```bash
# GET /api/user/profile
curl http://localhost:8000/api/user/profile \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

### 3. Update User Profile (Requires Auth)
```bash
# PUT /api/user/profile
curl -X PUT http://localhost:8000/api/user/profile \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

---

## 🛒 Cart APIs (All Require Auth)

### 1. Add Item to Cart
```bash
# POST /api/cart/add
curl -X POST http://localhost:8000/api/cart/add \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"itemId": "food_item_id"}'
```

### 2. Get Cart
```bash
# POST /api/cart/get
curl -X POST http://localhost:8000/api/cart/get \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 3. Remove Item from Cart
```bash
# POST /api/cart/remove
curl -X POST http://localhost:8000/api/cart/remove \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"itemId": "food_item_id"}'
```

---

## 📦 Order APIs (All Require Auth)

### 1. Create Razorpay Order
```bash
# POST /api/order/razorpay
curl -X POST http://localhost:8000/api/order/razorpay \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "INR",
    "receipt": "receipt_123"
  }'
```

**Expected Response:**
```json
{
  "orderId": "order_xyz123",
  "amount": 10000,
  "currency": "INR"
}
```

### 2. Verify Razorpay Payment
```bash
# POST /api/order/razorpay/verify
curl -X POST http://localhost:8000/api/order/razorpay/verify \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "razorpay_order_id": "order_xyz123",
    "razorpay_payment_id": "pay_abc456",
    "razorpay_signature": "signature_xyz",
    "orderData": {
      "userId": "user_123",
      "items": [{"itemId": "food_1", "quantity": 2}],
      "amount": 100,
      "address": {
        "street": "123 Main St",
        "city": "City",
        "state": "State",
        "zipCode": "12345",
        "country": "Country"
      }
    }
  }'
```

### 3. Place Order (Direct)
```bash
# POST /api/order/place
curl -X POST http://localhost:8000/api/order/place \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "items": [{"itemId": "food_1", "quantity": 2}],
    "amount": 100,
    "address": {
      "street": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "country": "Country"
    }
  }'
```

---

## 🌐 Production Testing

### Step 1: Update Base URL

Replace `http://localhost:8000` with your production URL:
```bash
export PROD_URL="https://tomato-monorepo.onrender.com"
```

### Step 2: Test Health Endpoint

```bash
curl $PROD_URL/api/health
```

### Step 3: Test All Endpoints

Use the same curl commands as local testing, but replace the base URL.

---

## 🛠️ Testing Tools

### Option 1: Using curl (Command Line)

See examples above. Best for quick testing and automation.

### Option 2: Using Postman

1. **Import Collection**: Create a new collection in Postman
2. **Set Environment Variables**:
   - `base_url`: `http://localhost:8000` (local) or production URL
   - `auth_token`: Your Clerk session token

3. **Create Requests**:
   - Method: GET/POST/PUT
   - URL: `{{base_url}}/api/food/list`
   - Headers: `Authorization: Bearer {{auth_token}}`
   - Body: JSON or form-data (for file uploads)

### Option 3: Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Create new requests
3. Set base URL and headers
4. Test endpoints directly from VS Code

### Option 4: Using Browser (For GET requests only)

```bash
# Open in browser:
http://localhost:8000/api/food/list
```

---

## 📝 Testing Checklist

### Local Testing
- [ ] Backend server starts successfully
- [ ] Health endpoint returns success
- [ ] Food list endpoint works (GET)
- [ ] Add food endpoint works (POST with auth)
- [ ] Remove food endpoint works (POST with auth)
- [ ] User creation works (POST)
- [ ] User profile endpoints work (GET/PUT with auth)
- [ ] Cart endpoints work (all POST with auth)
- [ ] Order endpoints work (POST with auth)

### Production Testing
- [ ] Health endpoint accessible
- [ ] CORS configured correctly
- [ ] All authenticated endpoints work with production tokens
- [ ] File uploads work (food images)
- [ ] Razorpay integration works (if configured)

---

## 🔍 Getting Clerk Token for Testing

### Method 1: From Browser Console

1. Open your frontend/admin app
2. Sign in
3. Open browser console (F12)
4. Run:
```javascript
// For Clerk React
const { getToken } = useAuth();
getToken().then(token => console.log('Token:', token));
```

### Method 2: From Network Tab

1. Open browser DevTools → Network tab
2. Sign in to your app
3. Find any API request
4. Copy the `Authorization` header value

---

## 🐛 Common Issues

### Issue: CORS Error
**Solution**: Add your frontend/admin URL to `ALLOWED_ORIGINS` in backend `.env`

### Issue: 401 Unauthorized
**Solution**: Check that your Clerk token is valid and not expired

### Issue: 404 Not Found
**Solution**: Verify the endpoint URL is correct and routes are registered

### Issue: 405 Method Not Allowed
**Solution**: Check that you're using the correct HTTP method (GET/POST/PUT)

### Issue: File Upload Fails
**Solution**: Ensure you're using `multipart/form-data` and the file is under 5MB

---

## 📚 Additional Resources

- [Postman Documentation](https://learning.postman.com/)
- [curl Documentation](https://curl.se/docs/)
- [Clerk Authentication Docs](https://clerk.com/docs)

---

## ✅ Quick Test Script

Save this as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="${1:-http://localhost:8000}"
TOKEN="${2:-your_token_here}"

echo "Testing API: $BASE_URL"
echo "================================"

# Health check
echo "1. Health Check..."
curl -s "$BASE_URL/api/health" | jq '.'

# Food list
echo -e "\n2. Food List..."
curl -s "$BASE_URL/api/food/list" | jq '.success'

# Add more tests as needed...
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh http://localhost:8000 YOUR_TOKEN
```

---

**Happy Testing! 🚀**

