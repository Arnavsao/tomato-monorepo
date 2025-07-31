/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from '../config/api.js';

// Create the context
export const StoreContext = createContext(null);

// Define the provider component
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = API_BASE_URL;
    const [token, setToken] = useState("");
    const [food_list, setFoodlist] = useState([]);
    const [userProfile, setUserProfile] = useState(null);

    // ✅ Fix: Prevent undefined item addition
    const addToCart = async (itemId) => {
        if (!itemId) return; // Prevent adding undefined

        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };

            // ✅ Fix: Remove any undefined keys
            const sanitizedCart = Object.fromEntries(
                Object.entries(updatedCart).filter(([key]) => key !== "undefined")
            );

            return sanitizedCart;
        });

        if (token) {
            try {
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );

                if (response.data.success) {
                    toast.success("Item Added to Cart");
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Server Error: Unable to add item to cart.");
            }
        }
    };

    // ✅ Fix: Remove item properly
    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId]--;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    // ✅ Fix: Correct API headers and handle undefined cart data
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } } // ✅ Fix: Correct header format
            );

            if (response.data.cartData) {
                setCartItems(response.data.cartData);
            } else {
                setCartItems({}); // Prevent undefined cart state
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Load user profile
    const loadUserProfile = async (token) => {
        try {
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: { token }
            });
            if (response.data.success) {
                setUserProfile(response.data.user);
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
        }
    };

    // Update user profile
    const updateUserProfile = async (profileData) => {
        try {
            const response = await axios.put(`${url}/api/user/profile`, profileData, {
                headers: { token }
            });
            if (response.data.success) {
                setUserProfile(response.data.user);
                return { success: true };
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            return { success: false, error: error.response?.data?.message || "Update failed" };
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // ✅ Fix: Add try-catch to prevent crashes
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodlist(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                const token = localStorage.getItem("token");
                setToken(token);
                await loadCartData(token);
                await loadUserProfile(token);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userProfile,
        updateUserProfile,
        loadUserProfile
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;