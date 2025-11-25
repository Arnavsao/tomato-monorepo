# 📬 Postman Collection for TOMATO API Testing

This guide helps you set up Postman to test all TOMATO APIs.

## 🚀 Quick Setup

### Step 1: Import Collection

1. Open Postman
2. Click **Import** button
3. Create a new collection called "TOMATO API"
4. Add the requests below

### Step 2: Set Up Environment Variables

Create two environments:

#### **Local Environment**
```
base_url: http://localhost:8000
auth_token: (leave empty, will be set after login)
```

#### **Production Environment**
```
base_url: https://tomato-monorepo.onrender.com
auth_token: (leave empty, will be set after login)
```

---

## 📋 API Requests Collection

### 1. Health Check
- **Method**: `GET`
- **URL**: `{{base_url}}/api/health`
- **Auth**: None
- **Expected**: 200 OK

---

### 2. Get Food List
- **Method**: `GET`
- **URL**: `{{base_url}}/api/food/list`
- **Auth**: None
- **Expected**: 200 OK with food array

---

### 3. Add Food Item
- **Method**: `POST`
- **URL**: `{{base_url}}/api/food/add`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `form-data`
  - `name`: (text) "Pizza"
  - `description`: (text) "Delicious pizza"
  - `price`: (text) "10"
  - `category`: (text) "Pasta"
  - `image`: (file) Select image file
- **Expected**: 200 OK

---

### 4. Remove Food Item
- **Method**: `POST`
- **URL**: `{{base_url}}/api/food/remove`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
  "id": "food_item_id_here"
}
```
- **Expected**: 200 OK

---

### 5. Create/Get User
- **Method**: `POST`
- **URL**: `{{base_url}}/api/user/create`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
  "userId": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  }
```
- **Expected**: 200 OK

---

### 6. Get User Profile
- **Method**: `GET`
- **URL**: `{{base_url}}/api/user/profile`
- **Auth**: Bearer Token `{{auth_token}}`
- **Expected**: 200 OK

---

### 7. Update User Profile
- **Method**: `PUT`
- **URL**: `{{base_url}}/api/user/profile`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```
- **Expected**: 200 OK

---

### 8. Add to Cart
- **Method**: `POST`
- **URL**: `{{base_url}}/api/cart/add`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
  "itemId": "food_item_id_here"
}
```
- **Expected**: 200 OK

---

### 9. Get Cart
- **Method**: `POST`
- **URL**: `{{base_url}}/api/cart/get`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{}
```
- **Expected**: 200 OK

---

### 10. Remove from Cart
- **Method**: `POST`
- **URL**: `{{base_url}}/api/cart/remove`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
  "itemId": "food_item_id_here"
}
```
- **Expected**: 200 OK

---

### 11. Create Razorpay Order
- **Method**: `POST`
- **URL**: `{{base_url}}/api/order/razorpay`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
  "amount": 100,
  "currency": "INR",
  "receipt": "receipt_123"
}
```
- **Expected**: 200 OK with orderId

---

### 12. Verify Razorpay Payment
- **Method**: `POST`
- **URL**: `{{base_url}}/api/order/razorpay/verify`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
```json
{
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
}
```
- **Expected**: 200 OK

---

### 13. Place Order (Direct)
- **Method**: `POST`
- **URL**: `{{base_url}}/api/order/place`
- **Auth**: Bearer Token `{{auth_token}}`
- **Body**: `raw` (JSON)
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
- **Expected**: 200 OK

---

## 🔑 Getting Auth Token

### Method 1: From Browser Console

1. Open your frontend/admin app
2. Sign in with Clerk
3. Open browser console (F12)
4. Run:
```javascript
// For Clerk React
const { getToken } = useAuth();
getToken().then(token => {
  console.log('Token:', token);
  // Copy this token to Postman
});
```

### Method 2: From Network Tab

1. Open browser DevTools → Network tab
2. Sign in to your app
3. Make any API request
4. Click on the request → Headers
5. Copy the `Authorization` header value (without "Bearer ")

### Method 3: Set Up Postman Script

Add this to a pre-request script for authenticated endpoints:

```javascript
// This is just for reference - actual token must come from Clerk
pm.environment.set("auth_token", "your_token_here");
```

---

## 🧪 Testing Workflow

### Local Testing:
1. Start backend: `cd backend && npm run dev`
2. Set Postman environment to "Local"
3. Get auth token from browser
4. Set `auth_token` in Postman environment
5. Run requests

### Production Testing:
1. Set Postman environment to "Production"
2. Get auth token from production app
3. Set `auth_token` in Postman environment
4. Run requests

---

## 📝 Tips

1. **Save Responses**: Right-click response → Save Response → Save as Example
2. **Use Tests Tab**: Add assertions to verify responses
3. **Collection Runner**: Run all requests in sequence
4. **Variables**: Use `{{variable_name}}` for dynamic values
5. **Pre-request Scripts**: Automate token refresh if needed

---

## ✅ Example Test Scripts

Add to **Tests** tab of each request:

```javascript
// Check status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Check response structure
pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
});
```

---

**Happy Testing! 🚀**

