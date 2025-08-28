

import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv to load variables from the .env file
dotenv.config();
const mongoDbUri = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    if (!mongoDbUri) {
      console.error(
        "DB Connection Failed: Environment variable MONGODB_URI is not set. Create a .env file in the backend directory with MONGODB_URI=<your_connection_string>."
      );
      process.exit(1);
    }

    await mongoose.connect(mongoDbUri);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};