import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dns from "dns";
import util from "util";

// Convert callback-based dns.resolveMx to promise-based
const resolveMx = util.promisify(dns.resolveMx);

// Function to verify if email domain exists
const isValidEmailDomain = async (email) => {
  const domain = email.split("@")[1]; // Get domain from email
  try {
    const mxRecords = await resolveMx(domain);
    return mxRecords && mxRecords.length > 0; // True if MX records exist
  } catch (error) {
    return false; // Domain does not exist
  }
};

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 🔹 Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// 🔹 Register User with Email Domain Validation
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    // Check if the email domain is valid
    const isRealDomain = await isValidEmailDomain(email);
    if (!isRealDomain) {
      return res.status(400).json({ success: false, message: "Invalid email domain." });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword, cartData: {} });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.status(201).json({ success: true, token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// 🔹 Add to Cart with Fixes
const addToCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid userId or itemId." });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is an object

    // Ensure the itemId is valid and not undefined
    if (!itemId || itemId === "undefined") {
      return res.status(400).json({ success: false, message: "Invalid itemId." });
    }

    // Add or increment item quantity
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    // Remove any undefined properties
    const sanitizedCart = Object.fromEntries(
      Object.entries(cartData).filter(([key]) => key !== "undefined")
    );

    // Update the user cart data
    await userModel.findByIdAndUpdate(userId, { cartData: sanitizedCart });

    res.json({ success: true, message: "Item added to cart", cartData: sanitizedCart });

  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export { loginUser, registerUser, addToCart };