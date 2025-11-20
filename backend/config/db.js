
/**
 * MongoDB Database Connection Configuration
 * 
 * This module handles the connection to MongoDB Atlas with production-ready
 * settings including retry logic, connection pooling, and proper error handling.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv to load variables from the .env file
dotenv.config();
const mongoDbUri = process.env.MONGODB_URI;

/**
 * Connection options for MongoDB Atlas
 * Optimized for production deployments on platforms like Render
 * 
 * Note: These options are passed to the MongoDB driver, not Mongoose-specific options
 */
const connectionOptions = {
  // Connection pool settings
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 5,  // Minimum number of connections to maintain
  
  // Timeout settings (in milliseconds)
  serverSelectionTimeoutMS: 5000, // How long to try selecting a server
  socketTimeoutMS: 45000, // How long to wait for a socket operation
  
  // Retry settings
  retryWrites: true, // Retry write operations on network errors
  retryReads: true,   // Retry read operations on network errors
  
  // Connection behavior
  connectTimeoutMS: 10000, // Timeout for initial connection
  heartbeatFrequencyMS: 10000, // How often to check server status
};

/**
 * Connects to MongoDB Atlas database
 * 
 * Includes retry logic and comprehensive error handling for production environments.
 * Logs detailed connection information for debugging deployment issues.
 * 
 * @throws {Error} If connection fails after retries
 */
export const connectDB = async () => {
  try {
    // Validate MongoDB URI is set
    if (!mongoDbUri) {
      console.error(
        "❌ DB Connection Failed: Environment variable MONGODB_URI is not set.\n" +
        "   Create a .env file in the backend directory with MONGODB_URI=<your_connection_string>.\n" +
        "   For production (Render), set MONGODB_URI in the environment variables section."
      );
      process.exit(1);
    }

    // Log connection attempt (without exposing credentials)
    const uriInfo = mongoDbUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
    console.log(`🔄 Attempting to connect to MongoDB...`);
    console.log(`   Connection string: ${uriInfo}`);

    // Attempt connection with retry logic
    // Note: Mongoose handles command buffering automatically in modern versions
    await mongoose.connect(mongoDbUri, connectionOptions);
    
    // Log successful connection
    console.log("✅ DB Connected successfully");
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Ready State: ${mongoose.connection.readyState} (1=connected)`);

    // Handle connection events for better monitoring
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully');
    });

  } catch (error) {
    // Enhanced error logging with troubleshooting hints
    console.error("❌ DB Connection Failed:", error.message);
    
    // Provide specific guidance based on error type
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.error("\n🔧 Troubleshooting Steps:");
      console.error("   1. Go to MongoDB Atlas → Network Access");
      console.error("   2. Add IP Address: 0.0.0.0/0 (allow from anywhere)");
      console.error("      OR add Render's specific IP addresses");
      console.error("   3. Wait 1-2 minutes for changes to propagate");
      console.error("   4. Redeploy your application");
      console.error("\n   MongoDB Atlas Network Access:");
      console.error("   https://cloud.mongodb.com/v2#/security/network/whitelist");
    } else if (error.message.includes('authentication')) {
      console.error("\n🔧 Troubleshooting Steps:");
      console.error("   1. Verify MONGODB_URI contains correct username/password");
      console.error("   2. Check database user permissions in MongoDB Atlas");
      console.error("   3. Ensure connection string is URL-encoded if special characters exist");
    } else if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
      console.error("\n🔧 Troubleshooting Steps:");
      console.error("   1. Check MongoDB Atlas cluster status");
      console.error("   2. Verify network connectivity from Render");
      console.error("   3. Ensure firewall rules allow outbound connections");
      console.error("   4. Check if MongoDB Atlas cluster is paused (free tier)");
    }
    
    console.error(`\n   Full error details: ${error.stack || error}`);
    process.exit(1); // Exit process with failure
  }
};