import { BACKEND_URL } from './environment.js';

/**
 * Normalize URL by removing trailing slashes
 * Prevents double slashes when combining base URL with endpoints
 */
const normalizeUrl = (url) => {
  if (!url) return url;
  return url.replace(/\/+$/, ''); // Remove trailing slashes
};

// Export the base URL for the current environment (normalized)
export const API_BASE_URL = normalizeUrl(BACKEND_URL);

/**
 * Helper function to build API endpoints
 * Ensures no double slashes in the final URL
 * @param {string} endpoint - API endpoint (should start with /)
 * @returns {string} Full API URL
 */
export const buildApiUrl = (endpoint) => {
  const base = normalizeUrl(API_BASE_URL);
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}; 