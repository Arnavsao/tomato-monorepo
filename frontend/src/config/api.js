import { BACKEND_URL } from './environment.js';

// Export the base URL for the current environment
export const API_BASE_URL = BACKEND_URL;

// Helper function to build API endpoints
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
}; 