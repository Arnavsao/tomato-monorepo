/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from '../config/api.js';
import { useAuth, useUser } from '@clerk/clerk-react';

// Create the context
export const StoreContext = createContext(null);

// Define the provider component
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = API_BASE_URL;
    const [food_list, setFoodlist] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [authAttempted, setAuthAttempted] = useState(false);
    const { getToken } = useAuth();
    const { user, isSignedIn } = useUser();

    // Test authentication function for debugging
    const testAuth = async () => {
        if (!isSignedIn || !user) {
            console.log("🚫 User not signed in, cannot test auth");
            return;
        }

        try {
            const token = await getToken();
            if (token) {
                console.log("🔍 Testing auth with token:", token.substring(0, 50) + "...");
                
                const response = await axios.post(`${url}/api/test-auth`, {}, {
                    headers: { authorization: `Bearer ${token}` }
                });
                
                console.log("🧪 Auth test response:", response.data);
                return response.data;
            }
        } catch (error) {
            console.error("❌ Error testing auth:", error);
        }
    };

    // Create or get user from Clerk session
    const createOrGetUser = async () => {
        if (!isSignedIn || !user) {
            console.log("🚫 User not signed in, skipping user creation");
            return false;
        }

        try {
            setIsLoading(true);
            const token = await getToken();
            if (token) {
                // Don't send userId in body - it will come from auth middleware
                const response = await axios.post(`${url}/api/user/create`, {
                    name: user.fullName || user.firstName || "User",
                    email: user.primaryEmailAddress?.emailAddress || "",
                    profilePicture: user.imageUrl || ""
                }, {
                    headers: { authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    setUserProfile(response.data.user);
                    console.log("✅ User profile loaded successfully");
                    setAuthAttempted(true);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("❌ Error creating/getting user:", error);
            
            // Handle specific error cases
            if (error.response?.status === 409) {
                console.log("ℹ️ User already exists, this is normal");
                setAuthAttempted(true);
                return true; // Treat as success since user exists
            } else if (error.response?.status === 500) {
                toast.error("Server error. Please try again later.");
            } else if (error.response?.status === 400) {
                toast.error("Invalid user data. Please check your profile.");
            } else {
                toast.error("Failed to load user profile. Please refresh the page.");
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Fix: Prevent undefined item addition
    const addToCart = async (itemId) => {
        if (!itemId || !isSignedIn || !user) {
            toast.error("Please login to add items to cart");
            return;
        }

        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };

            // ✅ Fix: Remove any undefined keys
            const sanitizedCart = Object.fromEntries(
                Object.entries(updatedCart).filter(([key]) => key !== "undefined")
            );

            return sanitizedCart;
        });

        try {
            const token = await getToken();
            if (token) {
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    toast.success("Item Added to Cart");
                } else {
                    toast.error("Something went wrong");
                }
            }
        } catch (error) {
            console.error("❌ Error adding to cart:", error);
            
            // Handle specific error cases
            if (error.response?.status === 401) {
                toast.error("Please login again to continue.");
                // Don't call createOrGetUser here to avoid loops
            } else if (error.response?.status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error("Failed to add item to cart. Please try again.");
            }
        }
    };

    // ✅ Fix: Remove item properly
    const removeFromCart = async (itemId) => {
        if (!isSignedIn || !user) {
            console.log("🚫 User not signed in, cannot remove from cart");
            return;
        }

        setCartItems(prev => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId]--;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });

        try {
            const token = await getToken();
            if (token) {
                await axios.post(
                    `${url}/api/cart/remove`, 
                    { itemId }, 
                    { headers: { authorization: `Bearer ${token}` } }
                );
            }
        } catch (error) {
            console.error("❌ Error removing item from cart:", error);
            toast.error("Failed to remove item. Please try again.");
        }
    };

    // ✅ Fix: Correct API headers and handle undefined cart data
    const loadCartData = async () => {
        if (!isSignedIn || !user) {
            console.log("🚫 User not signed in, skipping cart load");
            setCartItems({});
            return;
        }

        try {
            const token = await getToken();
            if (token) {
                const response = await axios.post(
                    `${url}/api/cart/get`,
                    {},
                    { headers: { authorization: `Bearer ${token}` } }
                );

                if (response.data.cartData) {
                    setCartItems(response.data.cartData);
                } else {
                    setCartItems({}); // Prevent undefined cart state
                }
            }
        } catch (error) {
            // Handle specific error cases
            if (error.response?.status === 401) {
                console.log("❌ User not authenticated, cart will be empty");
                setCartItems({});
                // Don't call createOrGetUser here to avoid loops
            } else if (error.response?.status === 404) {
                // This is normal for new users - they don't have a cart yet
                console.log("ℹ️ No cart found (normal for new users), setting empty cart");
                setCartItems({});
            } else {
                console.error("❌ Error loading cart data:", error);
                toast.error("Failed to load cart. Please refresh the page.");
            }
        }
    };

    // Load user profile
    const loadUserProfile = async () => {
        if (!isSignedIn || !user) {
            console.log("🚫 User not signed in, skipping profile load");
            setUserProfile(null);
            return;
        }

        try {
            const token = await getToken();
            if (token) {
                const response = await axios.get(`${url}/api/user/profile`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setUserProfile(response.data.user);
                }
            }
        } catch (error) {
            // Handle specific error cases
            if (error.response?.status === 401) {
                console.log("❌ User not authenticated, profile will be empty");
                setUserProfile(null);
                // Don't call createOrGetUser here to avoid loops
            } else if (error.response?.status === 404) {
                // This is normal for new users - profile is created after this call
                console.log("ℹ️ Profile not found (normal for new users), will be created shortly");
                setUserProfile(null);
            } else {
                console.error("❌ Error loading user profile:", error);
                toast.error("Failed to load profile. Please refresh the page.");
            }
        }
    };

    // Update user profile
    const updateUserProfile = async (profileData) => {
        if (!isSignedIn || !user) {
            toast.error("Please login to update your profile");
            return { success: false, error: "Not authenticated" };
        }

        try {
            const token = await getToken();
            if (token) {
                const response = await axios.put(`${url}/api/user/profile`, profileData, {
                    headers: { authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setUserProfile(response.data.user);
                    toast.success("Profile updated successfully!");
                    return { success: true };
                }
            }
        } catch (error) {
            console.error("❌ Error updating profile:", error);
            
            // Handle specific error cases
            if (error.response?.status === 401) {
                toast.error("Please login again to update your profile.");
                // Don't call createOrGetUser here to avoid loops
            } else if (error.response?.status === 400) {
                toast.error("Invalid profile data. Please check your input.");
            } else {
                toast.error("Failed to update profile. Please try again.");
            }
            
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
            console.error("❌ Error fetching food list:", error);
            toast.error("Failed to load menu. Please refresh the page.");
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            if (isSignedIn && user) {
                console.log("🔐 User is signed in, initializing user data...");
                // First create/get user, then load related data
                const userCreated = await createOrGetUser();
                if (userCreated) {
                    await loadCartData();
                    await loadUserProfile();
                }
            } else {
                console.log("🚫 User not signed in, skipping user data initialization");
                // Clear user data when not signed in
                setUserProfile(null);
                setCartItems({});
                setAuthAttempted(false);
            }
        }
        loadData();
    }, [isSignedIn, user]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        userProfile,
        updateUserProfile,
        loadUserProfile,
        isSignedIn,
        isLoading,
        authAttempted,
        testAuth // Add test function for debugging
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;