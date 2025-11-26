import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";




// App setup
const app = express();

// Environment detection: Use NODE_ENV if set, otherwise default to 'development'
// In production deployments (Render, Heroku, etc.), NODE_ENV is typically set to 'production'
const nodeEnv = process.env.NODE_ENV || 'development';

// Port configuration: Use PORT from environment (required in production) or default to 8000 for local
// Production platforms (Render, Heroku) automatically set PORT
const port = process.env.PORT || 8000;

// CORS configuration: Use ALLOWED_ORIGINS from environment or default to localhost ports for development
// In production, set ALLOWED_ORIGINS to your actual frontend and admin URLs
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim().replace(/\/+$/, '')) // Remove trailing slashes
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'];

// Log allowed origins on server start
console.log('🌐 CORS Configuration:');
console.log(`   Environment: ${nodeEnv}`);
console.log(`   Allowed Origins: ${allowedOrigins.length > 0 ? allowedOrigins.join(', ') : 'None configured'}`);
if (nodeEnv === 'production' && allowedOrigins.length === 0) {
  console.warn('⚠️  WARNING: No ALLOWED_ORIGINS set in production! CORS will block all requests.');
  console.warn('   Set ALLOWED_ORIGINS environment variable in Render with your frontend URL(s)');
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Normalize origin by removing trailing slash for comparison
    const normalizedOrigin = origin.replace(/\/+$/, '');
    
    if (allowedOrigins.indexOf(normalizedOrigin) !== -1) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked origin: ${origin}`);
      console.log(`📋 Configured allowed origins: ${allowedOrigins.join(', ') || 'None'}`);
      console.log(`💡 To fix: Add "${origin}" to ALLOWED_ORIGINS environment variable in Render`);
      // In development, be more permissive
      if (nodeEnv === 'development') {
        console.log(`🔓 Development mode: Allowing origin ${origin}`);
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed. Add it to ALLOWED_ORIGINS.`));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware setup
app.use(express.json()); // For parsing application/json

// Database connection and server startup
// Ensure the server only starts after a successful DB connection to prevent
// API requests from hitting the server before the database is ready.

// API endpoint setup - MUST be registered BEFORE server starts
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api", contactRouter);

// Health check endpoint - Register early so it's available immediately
app.get("/api/health", (req, res) => {
  const dbReadyState = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.json({
    success: true,
    status: "ok",
    dbConnected: dbReadyState === 1,
    dbState: dbReadyState,
    env: nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// 404 handler for undefined routes (must be last, after all routes)
app.use((req, res) => {
    console.log(`⚠️ Route not found: ${req.method} ${req.path}`);
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.path}`,
        hint: "Check the API documentation for available endpoints"
    });
});

/**
 * Initialize the server after connecting to MongoDB.
 * Adds robust logging so issues are easier to diagnose in development/production.
 */
async function startServer() {
  try {
    await connectDB();

    // Check critical environment variables
    if (!process.env.CLERK_SECRET_KEY) {
      console.warn('⚠️  WARNING: CLERK_SECRET_KEY not set. Authentication will fail.');
      console.warn('   Set CLERK_SECRET_KEY in backend/.env or environment variables');
    } else {
      console.log('✅ Clerk authentication configured');
    }

    app.listen(port, () => {
      console.log(`🚀 Server started on port ${port}`);
      console.log(`🌍 Environment: ${nodeEnv}`);
      console.log(`🔗 Local URL: http://localhost:${port}`);
      if (nodeEnv === 'production') {
        console.log(`🌐 Production URL: ${process.env.BACKEND_URL || 'Not set'}`);
      }
      console.log(`📡 Routes registered: /api/food, /api/user, /api/cart, /api/order`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err?.message || err);
    console.error("Hint: Ensure MONGODB_URI is set in backend/.env and that your IP has access in MongoDB Atlas.");
    process.exit(1);
  }
}

// Kick off startup
startServer();

// Note: app.listen is now called inside startServer() after DB connection