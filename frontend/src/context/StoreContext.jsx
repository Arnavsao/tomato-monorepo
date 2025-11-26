/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from '../config/api.js';
import { useAuth, useUser } from '@clerk/clerk-react';

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

// Define the provider component
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    // Normalize URL to prevent double slashes
    const url = API_BASE_URL.replace(/\/+$/, '');
    const [food_list, setFoodlist] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const { getToken } = useAuth();
    const { user, isSignedIn } = useUser();

    // Create or get user from Clerk session
    const createOrGetUser = useCallback(async () => {
        if (!isSignedIn || !user) return;

        try {
            const token = await getToken();
            if (token) {
                const response = await axios.post(`${url}/api/user/create`, {
                    userId: user.id,
                    name: user.fullName || user.firstName || "User",
                    email: user.primaryEmailAddress?.emailAddress || "",
                    profilePicture: user.imageUrl || ""
                }, {
                    headers: { authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    setUserProfile(response.data.user);
                }
            }
        } catch (error) {
            console.error("Error creating/getting user:", error);
        }
    }, [isSignedIn, user, getToken, url]);

    // ✅ Fix: Prevent undefined item addition
    const addToCart = async (itemId) => {
        if (!itemId) return; // Prevent adding undefined

        // Check if user is signed in
        if (!isSignedIn || !user) {
            toast.error("Please sign in to add items to cart");
            return;
        }

        // Optimistically update UI
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };

            // ✅ Fix: Remove any undefined keys
            const sanitizedCart = Object.fromEntries(
                Object.entries(updatedCart).filter(([key]) => key !== "undefined")
            );

            return sanitizedCart;
        });

        try {
            // Get token from Clerk (no template needed - uses default session token)
            const token = await getToken();
            if (!token) {
                console.error('❌ No token available from Clerk');
                toast.error("Authentication failed. Please sign in again.");
                // Revert optimistic update
                setCartItems((prev) => {
                    const newCart = { ...prev };
                    if (newCart[itemId] > 1) {
                        newCart[itemId]--;
                    } else {
                        delete newCart[itemId];
                    }
                    return newCart;
                });
                return;
            }

            const response = await axios.post(
                `${url}/api/cart/add`,
                { itemId },
                { headers: { authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Item Added to Cart");
            } else {
                toast.error("Something went wrong");
                // Revert optimistic update
                setCartItems((prev) => {
                    const newCart = { ...prev };
                    if (newCart[itemId] > 1) {
                        newCart[itemId]--;
                    } else {
                        delete newCart[itemId];
                    }
                    return newCart;
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            
            // Revert optimistic update on error
            setCartItems((prev) => {
                const newCart = { ...prev };
                if (newCart[itemId] > 1) {
                    newCart[itemId]--;
                } else {
                    delete newCart[itemId];
                }
                return newCart;
            });

            // Show appropriate error message
            if (error.response?.status === 401) {
                const errorMessage = error.response?.data?.message || error.response?.data?.details || "Session expired. Please sign in again.";
                console.error("401 Error details:", errorMessage);
                toast.error(errorMessage);
            } else {
                toast.error("Server Error: Unable to add item to cart.");
            }
        }
    };

    // ✅ Fix: Remove item properly
    const removeFromCart = async (itemId) => {
        // Check if user is signed in
        if (!isSignedIn || !user) {
            toast.error("Please sign in to modify cart");
            return;
        }

        // Optimistically update UI
        const previousQuantity = cartItems[itemId] || 0;
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
            if (!token) {
                toast.error("Authentication failed. Please sign in again.");
                // Revert optimistic update
                setCartItems(prev => ({
                    ...prev,
                    [itemId]: previousQuantity
                }));
                return;
            }

            await axios.post(
                `${url}/api/cart/remove`, 
                { itemId }, 
                { headers: { authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error removing item from cart:", error);
            
            // Revert optimistic update on error
            setCartItems(prev => ({
                ...prev,
                [itemId]: previousQuantity
            }));

            // Show appropriate error message
            if (error.response?.status === 401) {
                toast.error("Session expired. Please sign in again.");
            } else {
                toast.error("Unable to remove item from cart.");
            }
        }
    };

    // ✅ Fix: Correct API headers and handle undefined cart data
    const loadCartData = useCallback(async () => {
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
            console.error("Error loading cart data:", error);
        }
    }, [getToken, url]);

    // Load user profile
    const loadUserProfile = useCallback(async () => {
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
            console.error("Error loading user profile:", error);
        }
    }, [getToken, url]);

    // Update user profile
    const updateUserProfile = async (profileData) => {
        try {
            const token = await getToken();
            if (token) {
                const response = await axios.put(`${url}/api/user/profile`, profileData, {
                    headers: { authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setUserProfile(response.data.user);
                    return { success: true };
                }
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
    const fetchFoodList = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodlist(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }, [url]);

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            if (isSignedIn && user) {
                await createOrGetUser();
                await loadCartData();
                await loadUserProfile();
            }
        }
        loadData();
    }, [isSignedIn, user, fetchFoodList, createOrGetUser, loadCartData, loadUserProfile]);

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
        isSignedIn
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;