import 'dotenv/config'
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";

// Debug environment variables
console.log("🔍 Environment Check:");
console.log("📝 NODE_ENV:", process.env.NODE_ENV);
console.log("📝 PORT:", process.env.PORT);
console.log("📝 MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");
console.log("📝 CLERK_JWT_KEY:", process.env.CLERK_JWT_KEY ? "✅ Set" : "❌ Missing");
console.log("📝 CLERK_ISSUER_URL:", process.env.CLERK_ISSUER_URL ? "✅ Set" : "❌ Missing");

// App setup
const app = express();
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.com'] 
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
})); // For handling cross-origin requests

// Database connection
connectDB();

// API endpoint setup
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)
app.use("/api", contactRouter)

// Test authentication endpoint
app.post("/api/test-auth", async (req, res) => {
    const { authorization } = req.headers;
    
    console.log("🧪 Test auth endpoint called");
    console.log("📝 Authorization header:", authorization);
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.json({ 
            success: false, 
            message: "No authorization header",
            hasAuth: false
        });
    }
    
    const token = authorization.replace('Bearer ', '');
    console.log("🔍 Token received:", token.substring(0, 50) + "...");
    
    try {
        // Try to decode as JWT first
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
            const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
            console.log("✅ Token decoded as JWT:", payload);
            return res.json({
                success: true,
                message: "Token decoded successfully",
                hasAuth: true,
                tokenType: "JWT",
                payload: payload
            });
        } else {
            return res.json({
                success: false,
                message: "Token doesn't look like JWT",
                hasAuth: false,
                tokenType: "Unknown",
                tokenLength: token.length
            });
        }
    } catch (error) {
        console.error("❌ Error decoding token:", error);
        return res.json({
            success: false,
            message: "Error decoding token",
            hasAuth: false,
            error: error.message
        });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Health check route
app.get("/health", (req, res) => {
    res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        message: "Server is running and healthy"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ 
        success: false, 
        message: "Internal server error",
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: "Route not found" 
    });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 CORS enabled for: ${process.env.NODE_ENV === 'production' ? 'production domains' : 'localhost'}`);
    console.log(`🔒 Authentication: Clerk JWT verification enabled`);
});