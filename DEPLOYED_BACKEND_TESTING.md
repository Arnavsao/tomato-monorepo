# 🧪 Testing Your Deployed Backend

## 🌐 Your Backend URL
**Base URL**: `https://tomato-monorepo.onrender.com`

---

## ✅ Quick Health Check

### 1. Health Endpoint (No Auth Required)
**URL**: `https://tomato-monorepo.onrender.com/api/health`

**Test in Browser**: Just open this URL directly
- ✅ Should return JSON with `"success": true`
- ✅ Shows database connection status
- ✅ Shows environment info

**Expected Response**:
```json
{
  "success": true,
  "status": "ok",
  "dbConnected": true,
  "dbState": 1,
  "env": "production",
  "timestamp": "2024-..."
}
```

---

## 📋 All Testable Endpoints

### 🍕 Food APIs (Public - No Auth)

#### 1. Get Food List
**URL**: `https://tomato-monorepo.onrender.com/api/food/list`

**Test in Browser**: ✅ Yes (just open the URL)

**Expected**: List of all food items

---

### 👤 User APIs (Require Auth Token)

#### 2. Create/Get User
**URL**: `https://tomato-monorepo.onrender.com/api/user/create`

**Method**: `POST`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
  "userId": "user_123",
  "name": "Test User",
  "email": "test@example.com",
  "profilePicture": ""
}
```

#### 3. Get User Profile
**URL**: `https://tomato-monorepo.onrender.com/api/user/profile`

**Method**: `GET`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
```

#### 4. Update User Profile
**URL**: `https://tomato-monorepo.onrender.com/api/user/profile`

**Method**: `PUT`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

### 🛒 Cart APIs (Require Auth Token)

#### 5. Add to Cart
**URL**: `https://tomato-monorepo.onrender.com/api/cart/add`

**Method**: `POST`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
  "itemId": "food_item_id_here"
}
```

#### 6. Get Cart
**URL**: `https://tomato-monorepo.onrender.com/api/cart/get`

**Method**: `POST`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{}
```

#### 7. Remove from Cart
**URL**: `https://tomato-monorepo.onrender.com/api/cart/remove`

**Method**: `POST`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
  "itemId": "food_item_id_here"
}
```

---

### 📦 Order APIs (Require Auth Token)

#### 8. Create Razorpay Order
**URL**: `https://tomato-monorepo.onrender.com/api/order/razorpay`

**Method**: `POST`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
  "amount": 100,
  "currency": "INR",
  "receipt": "receipt_123"
}
```

#### 9. Place Order (Direct)
**URL**: `https://tomato-monorepo.onrender.com/api/order/place`

**Method**: `POST`

**Headers**: 
```
Authorization: Bearer YOUR_CLERK_TOKEN
Content-Type: application/json
```

**Body**:
```json
{
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
```

---

### 📧 Contact APIs (Public - No Auth)

#### 10. Submit Contact Form
**URL**: `https://tomato-monorepo.onrender.com/api/contact`

**Method**: `POST`

**Headers**: 
```
Content-Type: application/json
```

**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Test message",
  "subject": "Test Subject"
}
```

---

### 🏠 Root Endpoint

#### 11. Root Test
**URL**: `https://tomato-monorepo.onrender.com/`

**Test in Browser**: ✅ Yes (just open the URL)

**Expected**: `"API Working"`

---

## 🧪 How to Test

### Method 1: Browser (GET requests only)

Just open these URLs directly in your browser:

1. ✅ `https://tomato-monorepo.onrender.com/`
2. ✅ `https://tomato-monorepo.onrender.com/api/health`
3. ✅ `https://tomato-monorepo.onrender.com/api/food/list`

### Method 2: curl (Command Line)

#### Health Check:
```bash
curl https://tomato-monorepo.onrender.com/api/health
```

#### Food List:
```bash
curl https://tomato-monorepo.onrender.com/api/food/list
```

#### With Auth Token:
```bash
curl https://tomato-monorepo.onrender.com/api/user/profile \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

### Method 3: Postman

1. Create new request
2. Set method (GET/POST/PUT)
3. Enter URL: `https://tomato-monorepo.onrender.com/api/...`
4. Add headers if needed (Authorization, Content-Type)
5. Add body if POST/PUT
6. Click Send

### Method 4: Browser Console (JavaScript)

Open browser console (F12) and run:

```javascript
// Health check
fetch('https://tomato-monorepo.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log);

// Food list
fetch('https://tomato-monorepo.onrender.com/api/food/list')
  .then(r => r.json())
  .then(console.log);

// With auth token
fetch('https://tomato-monorepo.onrender.com/api/user/profile', {
  headers: {
    'Authorization': 'Bearer YOUR_CLERK_TOKEN'
  }
})
  .then(r => r.json())
  .then(console.log);
```

---

## ✅ Quick Verification Checklist

### Step 1: Basic Connectivity
- [ ] Open `https://tomato-monorepo.onrender.com/` → Should see "API Working"
- [ ] Open `https://tomato-monorepo.onrender.com/api/health` → Should see JSON with success: true
- [ ] Open `https://tomato-monorepo.onrender.com/api/food/list` → Should see food items array

### Step 2: Check Response Format
- [ ] Health endpoint returns JSON
- [ ] Food list returns JSON with `success: true` and `data` array
- [ ] No CORS errors in browser console

### Step 3: Check Database Connection
- [ ] Health endpoint shows `dbConnected: true`
- [ ] Food list loads successfully (requires DB)

### Step 4: Check CORS (if testing from frontend)
- [ ] No CORS errors in browser console
- [ ] Requests succeed from your frontend domain

---

## 🔍 Troubleshooting

### Issue: 404 Not Found
**Check**:
- URL spelling is correct
- No typos in endpoint path
- Server is deployed and running

### Issue: CORS Error
**Solution**: Add your frontend URL to `ALLOWED_ORIGINS` in Render environment variables

### Issue: 401 Unauthorized
**Solution**: Add valid Clerk token in Authorization header

### Issue: 500 Internal Server Error
**Check**:
- Backend logs in Render dashboard
- Database connection (check MONGODB_URI)
- Environment variables are set correctly

### Issue: Database Not Connected
**Check**:
- `MONGODB_URI` is set in Render environment variables
- MongoDB Atlas IP whitelist includes Render's IP (or 0.0.0.0/0)
- Database credentials are correct

---

## 📊 Expected Status Codes

| Endpoint | Method | Expected Status | Notes |
|----------|--------|----------------|-------|
| `/` | GET | 200 | Root endpoint |
| `/api/health` | GET | 200 | Health check |
| `/api/food/list` | GET | 200 | Public endpoint |
| `/api/user/create` | POST | 200 | Requires auth |
| `/api/user/profile` | GET | 200 | Requires auth |
| `/api/user/profile` | PUT | 200 | Requires auth |
| `/api/cart/*` | POST | 200 | Requires auth |
| `/api/order/*` | POST | 200 | Requires auth |
| `/api/contact` | POST | 200 | Public endpoint |
| Any invalid route | Any | 404 | Not found |

---

## 🎯 Quick Test Commands

Copy and paste these in your terminal:

```bash
# 1. Health check
curl https://tomato-monorepo.onrender.com/api/health

# 2. Root endpoint
curl https://tomato-monorepo.onrender.com/

# 3. Food list
curl https://tomato-monorepo.onrender.com/api/food/list

# 4. Test with auth (replace YOUR_TOKEN)
curl https://tomato-monorepo.onrender.com/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📱 Testing from Your Frontend

Your frontend should be configured with:
- **Environment Variable**: `VITE_BACKEND_URL`
- **Value**: `https://tomato-monorepo.onrender.com` (no trailing slash)

Then your frontend will automatically use this URL for all API calls.

---

## 🔗 Quick Links

- **Health Check**: https://tomato-monorepo.onrender.com/api/health
- **Food List**: https://tomato-monorepo.onrender.com/api/food/list
- **Root**: https://tomato-monorepo.onrender.com/

---

**Happy Testing! 🚀**

