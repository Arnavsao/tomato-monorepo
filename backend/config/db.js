import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Check if MongoDB URI is defined
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error("❌ MongoDB URI not found in environment variables");
      console.error("📝 Available env vars:", Object.keys(process.env).filter(key => key.includes('MONGO')));
      process.exit(1);
    }
    
    console.log("🔍 Connecting to MongoDB...");
    console.log("📝 URI:", mongoUri.substring(0, 20) + "...");
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB Connected Successfully");
    console.log("🌐 Database:", mongoose.connection.name);
    console.log("🔌 Connection State:", mongoose.connection.readyState);
    
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    console.error("🔍 Error details:", error);
    process.exit(1); // Exit process with failure
  }
};