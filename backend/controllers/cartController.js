import userModel from "../models/userModel.js";  

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ clerkId: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is an object

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findOneAndUpdate({ clerkId: req.body.userId }, { cartData });

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ clerkId: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is an object

        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findOneAndUpdate({ clerkId: req.body.userId }, { cartData });

        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// Get user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ clerkId: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };