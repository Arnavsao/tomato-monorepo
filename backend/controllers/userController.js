import userModel from "../models/userModel.js";
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

// 🔹 Create or Get User from Clerk Session
const createOrGetUser = async (req, res) => {
  const { userId, name, email, profilePicture } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    // Check if user already exists
    let user = await userModel.findOne({ clerkId: userId });
    
    if (!user) {
      // Create new user
      const newUser = new userModel({ 
        clerkId: userId,
        name: name || "User", 
        email: email || "", 
        profilePicture: profilePicture || "",
        cartData: {} 
      });
      user = await newUser.save();
    }

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// 🔹 Update User Profile
const updateProfile = async (req, res) => {
  const { name, profilePicture } = req.body;
  const userId = req.body.userId; // From Clerk middleware

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (profilePicture) updateData.profilePicture = profilePicture;

    const updatedUser = await userModel.findOneAndUpdate(
      { clerkId: userId },
      updateData,
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        clerkId: updatedUser.clerkId,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// 🔹 Get User Profile
const getUserProfile = async (req, res) => {
  const userId = req.body.userId; // From Clerk middleware

  try {
    const user = await userModel.findOne({ clerkId: userId }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export { createOrGetUser, updateProfile, getUserProfile };