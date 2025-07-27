import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    role: { type: String, default: "user" },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

// Ensure the model is not re-registered if already defined
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;