# ⚡ Quick API Testing Guide

## 🚀 Quick Start

### Local Testing

1. **Start Backend**:
```bash
cd backend
npm run dev
```

2. **Test Health Endpoint** (No auth needed):
```bash
curl http://localhost:8000/api/health
```

3. **Test Food List** (No auth needed):
```bash
curl http://localhost:8000/api/food/list
```

### Production Testing

Replace `http://localhost:8000` with your production URL:
```bash
curl https://tomato-monorepo.onrender.com/api/health
```

---

## 🔑 Getting Auth Token

### From Browser Console:

1. Open your frontend/admin app
2. Sign in
3. Press F12 → Console
4. Run:
```javascript
// For Clerk React
const { getToken } = useAuth();
getToken().then(token => {
  console.log('Token:', token);
  navigator.clipboard.writeText(token);
  console.log('Token copied to clipboard!');
});
```

---

## 📋 All API Endpoints

### Public Endpoints (No Auth)

```bash
# Health Check
GET /api/health

# Food List
GET /api/food/list
```

### Protected Endpoints (Require Auth)

Add header: `Authorization: Bearer YOUR_TOKEN`

```bash
# Food Management
POST /api/food/add          # Add food (multipart/form-data)
POST /api/food/remove      # Remove food

# User Management
POST /api/user/create      # Create/get user
GET  /api/user/profile     # Get profile
PUT  /api/user/profile     # Update profile

# Cart Management
POST /api/cart/add         # Add to cart
POST /api/cart/get         # Get cart
POST /api/cart/remove      # Remove from cart

# Orders
POST /api/order/place              # Place order
POST /api/order/razorpay           # Create Razorpay order
POST /api/order/razorpay/verify    # Verify payment

# Contact
POST /api/contact                  # Submit contact form
```

---

## 🧪 Using the Test Script

```bash
cd backend
node test-api.js http://localhost:8000 YOUR_TOKEN
```

For production:
```bash
node test-api.js https://tomato-monorepo.onrender.com YOUR_TOKEN
```

---

## 📱 Using Postman

See `API_TESTING_POSTMAN.md` for detailed Postman setup.

Quick steps:
1. Import collection
2. Set environment variables (`base_url`, `auth_token`)
3. Get token from browser
4. Test endpoints

---

## 🌐 Browser Testing (GET only)

Open these URLs directly in browser:

- `http://localhost:8000/api/health`
- `http://localhost:8000/api/food/list`

For production:
- `https://tomato-monorepo.onrender.com/api/health`
- `https://tomato-monorepo.onrender.com/api/food/list`

---

## ✅ Testing Checklist

### Local:
- [ ] Health endpoint works
- [ ] Food list works
- [ ] Can add food (with auth)
- [ ] Can manage cart (with auth)
- [ ] Can create orders (with auth)

### Production:
- [ ] Health endpoint accessible
- [ ] CORS configured
- [ ] All endpoints work with production token
- [ ] File uploads work

---

For detailed testing guide, see `API_TESTING_GUIDE.md`

