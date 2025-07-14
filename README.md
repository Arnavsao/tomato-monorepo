# 🍅 Tomato - Food Delivery Platform

A full-stack food delivery application built with React, Node.js, and MongoDB. This monorepo contains three main applications: a customer-facing frontend, an admin dashboard, and a backend API.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)

## ✨ Features

### Customer Frontend
- 🍽️ Browse food menu with categories
- 🔍 Search and filter food items
- 🛒 Add items to cart
- 👤 User authentication (login/signup)
- 💳 Secure payment processing with Stripe
- 📱 Responsive design for mobile devices
- 📍 Order tracking and history

### Admin Dashboard
- ➕ Add new food items with image upload
- 📝 Manage existing menu items
- 📊 View and manage orders
- 👥 User management
- 📈 Order analytics and insights

### Backend API
- 🔐 JWT-based authentication
- 🗄️ MongoDB database integration
- 📁 File upload handling
- 💳 Stripe payment integration
- 🔒 Secure API endpoints
- 📧 Order notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Vite** - Build tool

### Admin Dashboard
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Stripe** - Payment processing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
tomato-monorepo/
├── frontend/                 # Customer-facing React app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── assets/         # Static assets
│   └── package.json
├── admin/                   # Admin dashboard React app
│   ├── src/
│   │   ├── components/     # Admin UI components
│   │   ├── pages/         # Admin pages
│   │   └── assets/        # Admin assets
│   └── package.json
├── backend/                # Node.js API server
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded images
│   └── server.js         # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tomato-monorepo
   ```

2. **Install dependencies for all applications**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Install admin dependencies
   cd ../admin
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Start the applications**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on `http://localhost:4000`

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will start on `http://localhost:5173`

   **Admin Dashboard (Terminal 3):**
   ```bash
   cd admin
   npm run dev
   ```
   Admin dashboard will start on `http://localhost:5174`

## 🔌 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login

### Food Items
- `GET /api/food` - Get all food items
- `POST /api/food` - Add new food item (admin only)
- `PUT /api/food/:id` - Update food item (admin only)
- `DELETE /api/food/:id` - Delete food item (admin only)

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Orders
- `POST /api/order/place` - Place new order
- `GET /api/order/:userId` - Get user's orders
- `GET /api/order` - Get all orders (admin only)

## 💻 Usage

### For Customers
1. Visit the frontend application
2. Browse the food menu
3. Add items to your cart
4. Login or signup to proceed
5. Complete your order with payment

### For Administrators
1. Access the admin dashboard
2. Add new food items with images
3. Manage existing menu items
4. View and process customer orders
5. Monitor order analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy coding! 🍅**
