/**
 * Error Handler Utility
 * Provides consistent error handling and user-friendly messages
 */

import { toast } from 'react-toastify';

/**
 * Handle API errors and show appropriate user messages
 * @param {Error} error - The error object from axios or fetch
 * @param {string} context - Context of where the error occurred
 * @param {boolean} showToast - Whether to show toast notifications
 * @returns {Object} Error details for further handling
 */
export const handleApiError = (error, context = 'API call', showToast = true) => {
    console.error(`❌ Error in ${context}:`, error);
    
    const errorDetails = {
        status: error.response?.status,
        message: error.response?.data?.message || error.message || 'An unexpected error occurred',
        context,
        timestamp: new Date().toISOString()
    };
    
    if (showToast) {
        const userMessage = getUserFriendlyMessage(errorDetails.status, errorDetails.message);
        toast.error(userMessage);
    }
    
    return errorDetails;
};

/**
 * Get user-friendly error messages based on HTTP status codes
 * @param {number} status - HTTP status code
 * @param {string} defaultMessage - Default message to show
 * @returns {string} User-friendly error message
 */
export const getUserFriendlyMessage = (status, defaultMessage) => {
    switch (status) {
        case 400:
            return 'Invalid request. Please check your input and try again.';
        case 401:
            return 'Please login again to continue.';
        case 403:
            return 'You do not have permission to perform this action.';
        case 404:
            return 'The requested resource was not found.';
        case 409:
            return 'This resource already exists.';
        case 422:
            return 'Validation error. Please check your input.';
        case 429:
            return 'Too many requests. Please try again later.';
        case 500:
            return 'Server error. Please try again later.';
        case 502:
        case 503:
        case 504:
            return 'Service temporarily unavailable. Please try again later.';
        default:
            return defaultMessage || 'Something went wrong. Please try again.';
    }
};

/**
 * Handle network errors specifically
 * @param {Error} error - Network error object
 * @param {string} context - Context of the error
 */
export const handleNetworkError = (error, context = 'Network request') => {
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        toast.error('Network error. Please check your internet connection.');
    } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout. Please try again.');
    } else {
        handleApiError(error, context);
    }
};

/**
 * Handle authentication errors
 * @param {Error} error - Authentication error object
 */
export const handleAuthError = (error) => {
    if (error.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
        // You can add logic here to redirect to login or refresh token
    } else {
        handleApiError(error, 'Authentication');
    }
};

/**
 * Log error for debugging (only in development)
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = 'Application') => {
    if (import.meta.env.DEV) {
        console.group(`🚨 ${context} Error`);
        console.error('Error:', error);
        console.error('Stack:', error.stack);
        console.error('Context:', context);
        console.error('Timestamp:', new Date().toISOString());
        console.groupEnd();
    }
};

/**
 * Create a retry mechanism for failed requests
 * @param {Function} requestFn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Promise that resolves with the result or rejects after max retries
 */
export const withRetry = async (requestFn, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await requestFn();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) {
                throw error;
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
            
            console.log(`🔄 Retry attempt ${attempt}/${maxRetries} for failed request`);
        }
    }
    
    throw lastError;
};
