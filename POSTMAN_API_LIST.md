# 📋 Complete API List for Postman Testing

## 🔧 Setup Instructions

### 1. Create Environment Variables in Postman

Create a new environment called **"TOMATO Local"** or **"TOMATO Production"**:

| Variable | Local Value | Production Value |
|----------|-------------|------------------|
| `base_url` | `http://localhost:8000` | `https://tomato-monorepo.onrender.com` |
| `auth_token` | (Get from browser after login) | (Get from browser after login) |

### 2. Get Auth Token

1. Open your frontend/admin app in browser
2. Sign in with Clerk
3. Press F12 → Console
4. Run:
```javascript
const { getToken } = useAuth();
getToken().then(token => {
  console.log('Token:', token);
  navigator.clipboard.writeText(token);
});
```
5. Paste token into Postman environment variable `auth_token`

---

## 📡 All API Endpoints

### 🏥 Health Check (No Auth Required)

#### 1. Health Check
- **Method**: `GET`
- **URL**: `{{base_url}}/api/health`
- **Headers**: None
- **Body**: None
- **Expected Status**: `200 OK`
- **Expected Response**:
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

### 🍕 Food APIs

#### 2. Get Food List (Public)
- **Method**: `GET`
- **URL**: `{{base_url}}/api/food/list`
- **Headers**: None
- **Body**: None
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "food_id_123",
      "name": "Pizza",
      "description": "Delicious pizza",
      "price": 10,
      "category": "Pasta",
      "image": "1234567890-pizza.jpg"
    }
  ]
}
```

#### 3. Add Food Item (Admin - Requires Auth)
- **Method**: `POST`
- **URL**: `{{base_url}}/api/food/add`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
- **Body**: `form-data`
  - `name`: (Text) `Pizza`
  - `description`: (Text) `Delicious pizza with cheese`
  - `price`: (Text) `10`
  - `category`: (Text) `Pasta` (Options: Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles)
  - `image`: (File) Select image file (JPEG, PNG, JPG only, max 5MB)
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Food Added"
}
```

#### 4. Remove Food Item (Admin - Requires Auth)
- **Method**: `POST`
- **URL**: `{{base_url}}/api/food/remove`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "id": "food_item_id_here"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Food removed successfully"
}
```

---

### 👤 User APIs

#### 5. Create or Get User (Requires Auth)
- **Method**: `POST`
- **URL**: `{{base_url}}/api/user/create`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "userId": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "profilePicture": "https://example.com/pic.jpg"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "clerkId": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 6. Get User Profile (Requires Auth)
- **Method**: `GET`
- **URL**: `{{base_url}}/api/user/profile`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
- **Body**: None
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "clerkId": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "https://example.com/pic.jpg"
  }
}
```

#### 7. Update User Profile (Requires Auth)
- **Method**: `PUT`
- **URL**: `{{base_url}}/api/user/profile`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "profilePicture": "https://example.com/new-pic.jpg"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
}
```

---

### 🛒 Cart APIs (All Require Auth)

#### 8. Add Item to Cart
- **Method**: `POST`
- **URL**: `{{base_url}}/api/cart/add`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "itemId": "food_item_id_here"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Item added to cart"
}
```

#### 9. Get Cart
- **Method**: `POST`
- **URL**: `{{base_url}}/api/cart/get`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "cartData": {
    "food_item_id_1": 2,
    "food_item_id_2": 1
  }
}
```

#### 10. Remove Item from Cart
- **Method**: `POST`
- **URL**: `{{base_url}}/api/cart/remove`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "itemId": "food_item_id_here"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

---

### 📦 Order APIs (All Require Auth)

#### 11. Create Razorpay Order
- **Method**: `POST`
- **URL**: `{{base_url}}/api/order/razorpay`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "amount": 100,
  "currency": "INR",
  "receipt": "receipt_123"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "orderId": "order_xyz123",
  "amount": 10000,
  "currency": "INR"
}
```
- **Note**: Amount is in rupees, but response `amount` is in paise (100 rupees = 10000 paise)

#### 12. Verify Razorpay Payment
- **Method**: `POST`
- **URL**: `{{base_url}}/api/order/razorpay/verify`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_xyz",
  "orderData": {
    "userId": "user_123",
    "items": [
      {
        "itemId": "food_1",
        "name": "Pizza",
        "price": 10,
        "quantity": 2
      }
    ],
    "amount": 100,
    "address": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "country": "Country",
      "phone": "1234567890"
    }
  }
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "orderId": "order_db_id",
  "message": "Payment verified and order placed successfully"
}
```

#### 13. Place Order (Direct - Without Payment)
- **Method**: `POST`
- **URL**: `{{base_url}}/api/order/place`
- **Headers**: 
  - `Authorization: Bearer {{auth_token}}`
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "userId": "user_123",
  "items": [
    {
      "itemId": "food_1",
      "name": "Pizza",
      "price": 10,
      "quantity": 2
    }
  ],
  "amount": 100,
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country",
    "phone": "1234567890"
  }
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "orderId": "order_db_id"
}
```

---

### 📧 Contact APIs

#### 14. Submit Contact Form (Public)
- **Method**: `POST`
- **URL**: `{{base_url}}/api/contact`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "This is a test message",
  "subject": "Test Subject"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

#### 15. Get All Contacts (Admin - No Auth Currently)
- **Method**: `GET`
- **URL**: `{{base_url}}/api/contacts`
- **Headers**: None
- **Body**: None
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "contacts": [
    {
      "_id": "contact_id",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Test message",
      "status": "pending"
    }
  ]
}
```

#### 16. Get Contact by ID (Admin - No Auth Currently)
- **Method**: `GET`
- **URL**: `{{base_url}}/api/contacts/:id`
- **Example**: `{{base_url}}/api/contacts/contact_id_here`
- **Headers**: None
- **Body**: None
- **Expected Status**: `200 OK`

#### 17. Update Contact Status (Admin - No Auth Currently)
- **Method**: `PUT`
- **URL**: `{{base_url}}/api/contacts/:id/status`
- **Example**: `{{base_url}}/api/contacts/contact_id_here/status`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**: `raw` (JSON)
```json
{
  "status": "resolved"
}
```
- **Expected Status**: `200 OK`

#### 18. Delete Contact (Admin - No Auth Currently)
- **Method**: `DELETE`
- **URL**: `{{base_url}}/api/contacts/:id`
- **Example**: `{{base_url}}/api/contacts/contact_id_here`
- **Headers**: None
- **Body**: None
- **Expected Status**: `200 OK`

---

## 📝 Testing Order

### Recommended Testing Sequence:

1. **Health Check** - Verify server is running
2. **Get Food List** - See available items
3. **Create/Get User** - Set up user account
4. **Get User Profile** - Verify user creation
5. **Add Food Item** (Admin) - Add test food item
6. **Add to Cart** - Add item to cart
7. **Get Cart** - Verify cart contents
8. **Create Razorpay Order** - Test payment order creation
9. **Place Order** - Test direct order placement
10. **Remove from Cart** - Test cart removal
11. **Submit Contact** - Test contact form

---

## 🔍 Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution**: 
- Check that `auth_token` is set in environment variables
- Verify token is not expired (get a new one from browser)
- Ensure `Authorization: Bearer {{auth_token}}` header is included

### Issue: 404 Not Found
**Solution**: 
- Check `base_url` is correct
- Verify endpoint URL spelling
- Ensure server is running

### Issue: 405 Method Not Allowed
**Solution**: 
- Verify HTTP method matches endpoint (GET/POST/PUT/DELETE)
- Check route definition matches your request

### Issue: File Upload Fails
**Solution**: 
- Ensure using `form-data` body type (not raw JSON)
- Check file size is under 5MB
- Verify file type is JPEG, PNG, or JPG

---

## ✅ Postman Collection Tips

1. **Save Responses**: Right-click response → Save Response → Save as Example
2. **Use Variables**: Replace hardcoded IDs with variables like `{{food_id}}`
3. **Tests Tab**: Add assertions to verify responses automatically
4. **Pre-request Scripts**: Automate token refresh if needed
5. **Collection Runner**: Run all requests in sequence

---

## 🎯 Quick Reference

| Endpoint | Method | Auth | Public/Admin |
|----------|--------|------|--------------|
| `/api/health` | GET | ❌ | Public |
| `/api/food/list` | GET | ❌ | Public |
| `/api/food/add` | POST | ✅ | Admin |
| `/api/food/remove` | POST | ✅ | Admin |
| `/api/user/create` | POST | ✅ | User |
| `/api/user/profile` | GET | ✅ | User |
| `/api/user/profile` | PUT | ✅ | User |
| `/api/cart/add` | POST | ✅ | User |
| `/api/cart/get` | POST | ✅ | User |
| `/api/cart/remove` | POST | ✅ | User |
| `/api/order/razorpay` | POST | ✅ | User |
| `/api/order/razorpay/verify` | POST | ✅ | User |
| `/api/order/place` | POST | ✅ | User |
| `/api/contact` | POST | ❌ | Public |
| `/api/contacts` | GET | ❌ | Admin |
| `/api/contacts/:id` | GET | ❌ | Admin |
| `/api/contacts/:id/status` | PUT | ❌ | Admin |
| `/api/contacts/:id` | DELETE | ❌ | Admin |

---

**Total: 18 API Endpoints**

Happy Testing! 🚀

