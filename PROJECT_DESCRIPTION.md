# TOMATO - Full-Stack Food Delivery Platform

## Project Overview

**TOMATO** is a comprehensive full-stack food delivery platform I developed from scratch, featuring a customer-facing web application, an admin dashboard, and a robust RESTful API backend. This project demonstrates my ability to build end-to-end web applications with modern technologies, implement secure authentication, handle real-time data management, and create intuitive user interfaces.

## Key Highlights

- **Full-Stack Development**: Built complete monorepo architecture with separate frontend, admin panel, and backend services
- **Modern Tech Stack**: Leveraged React 18, Node.js, Express.js, MongoDB, and Clerk authentication
- **Production-Ready**: Implemented proper error handling, logging, CORS configuration, and environment-based deployment
- **Secure Authentication**: Integrated Clerk for enterprise-grade user authentication and session management
- **Payment Integration**: Integrated Razorpay payment gateway for secure transaction processing
- **Responsive Design**: Built mobile-first, responsive UI using Tailwind CSS
- **File Upload System**: Implemented image upload functionality using Multer for food item management
- **RESTful API**: Designed and developed comprehensive REST API with proper route structure and middleware

## Technical Architecture

### Frontend (Customer App)
- **Framework**: React 18 with Vite for fast development and optimized builds
- **Routing**: React Router for client-side navigation
- **State Management**: React Context API for global state management
- **Styling**: Tailwind CSS for responsive, modern UI design
- **HTTP Client**: Axios for API communication
- **Authentication**: Clerk React SDK for seamless user authentication
- **Features**:
  - Browse food menu with category filtering
  - Search and filter functionality
  - Shopping cart management
  - Order placement and tracking
  - User profile management
  - Responsive design for all devices

### Admin Dashboard
- **Framework**: React 18 with Vite
- **Features**:
  - Add/edit/delete food items with image upload
  - View and manage customer orders
  - Order analytics and insights
  - User management capabilities
  - Protected routes for admin-only access

### Backend API
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk backend SDK for secure API authentication
- **File Handling**: Multer for image uploads
- **Payment**: Razorpay integration for payment processing
- **Security**: 
  - JWT-based authentication middleware
  - CORS configuration for cross-origin requests
  - Environment-based configuration
  - Input validation and sanitization
- **API Features**:
  - RESTful API design
  - User authentication and authorization
  - Food item CRUD operations
  - Cart management endpoints
  - Order processing endpoints
  - Contact form handling
  - Health check endpoints for monitoring

## Key Features Implemented

### Customer Features
1. **User Authentication**: Secure signup/login using Clerk authentication
2. **Menu Browsing**: Browse food items with categories and search functionality
3. **Shopping Cart**: Add/remove items, quantity management, persistent cart
4. **Order Management**: Place orders, view order history, track order status
5. **Profile Management**: Update user profile information
6. **Payment Processing**: Secure payment integration with Razorpay
7. **Responsive UI**: Mobile-first design that works seamlessly across devices

### Admin Features
1. **Food Management**: Complete CRUD operations for food items
2. **Image Upload**: Upload and manage food item images
3. **Order Management**: View all orders, update order status
4. **Analytics**: Order insights and statistics
5. **User Management**: View and manage customer accounts

## Technical Challenges Solved

1. **Database Connection Management**: Implemented robust MongoDB connection handling with retry logic and proper error handling for production deployments
2. **CORS Configuration**: Configured dynamic CORS settings for different environments (development/production)
3. **File Upload Handling**: Implemented secure file upload system with Multer, handling image storage and serving
4. **Authentication Flow**: Integrated Clerk authentication seamlessly across frontend and backend
5. **State Management**: Managed complex application state including cart, user data, and food items
6. **Environment Configuration**: Set up proper environment variable management for different deployment stages
7. **API Design**: Created well-structured REST API with proper error handling and response formatting

## Deployment & DevOps

- **Backend**: Configured for deployment on Render/Heroku with MongoDB Atlas
- **Frontend**: Deployed on Vercel with environment-based configuration
- **Admin Panel**: Separate deployment on Vercel
- **Database**: MongoDB Atlas cloud database
- **Environment Management**: Proper `.env` configuration for development and production
- **CORS Setup**: Dynamic origin whitelisting for production deployments

## Code Quality & Best Practices

- **Modular Architecture**: Separated concerns with proper folder structure
- **Error Handling**: Comprehensive error handling throughout the application
- **Logging**: Implemented detailed logging for debugging and monitoring
- **Code Documentation**: Well-documented code with comments explaining complex logic
- **Environment Variables**: Secure handling of sensitive data
- **API Documentation**: Clear API endpoint structure and usage

## Technologies Used

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Axios
- Clerk React SDK
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Clerk Backend SDK
- Multer
- Razorpay SDK

**DevOps & Tools:**
- Git/GitHub
- MongoDB Atlas
- Vercel (Frontend deployment)
- Render/Heroku (Backend deployment)
- Environment-based configuration

## Project Impact

This project demonstrates:
- **Full-stack development capabilities** from database design to frontend implementation
- **Modern web development practices** using current industry-standard tools
- **Security awareness** with proper authentication and authorization
- **Production readiness** with proper error handling, logging, and deployment configuration
- **User experience focus** with responsive design and intuitive interfaces
- **API design skills** with well-structured REST endpoints

## Learning Outcomes

Through this project, I gained hands-on experience in:
- Building scalable full-stack applications
- Integrating third-party authentication services (Clerk)
- Implementing payment gateway integration
- Managing file uploads and storage
- Deploying applications to cloud platforms
- Working with NoSQL databases (MongoDB)
- Implementing secure API endpoints
- Creating responsive, modern UIs

## Future Enhancements

Potential improvements include:
- Real-time order tracking with WebSockets
- Push notifications for order updates
- Advanced analytics dashboard
- Multi-restaurant support
- Rating and review system
- Email notifications
- Admin role-based access control

---

**Note**: This project showcases my ability to build production-ready applications with modern web technologies. The codebase follows best practices for maintainability, scalability, and security.

