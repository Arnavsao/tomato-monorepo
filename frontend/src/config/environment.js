/**
 * Environment Configuration
 * 
 * This file automatically detects the environment (development vs production)
 * and configures the backend URL accordingly.
 * 
 * Priority order for backend URL:
 * 1. VITE_BACKEND_URL environment variable (highest priority - set in deployment)
 * 2. Auto-detected based on build mode (dev = localhost, production = production URL)
 * 
 * For local development:
 * - No .env file needed - defaults to http://localhost:8000
 * - Can override with VITE_BACKEND_URL in .env.local
 * 
 * For production deployment:
 * - Set VITE_BACKEND_URL in your hosting platform (Vercel, Netlify, etc.)
 * - Or it will use the production default URL below
 */

export const ENVIRONMENTS = {
  // Development - local backend
  development: {
    name: 'Development',
    backendUrl: 'http://localhost:8000',
    description: 'Local development environment'
  },
  
  // Production - deployed backend
  production: {
    name: 'Production', 
    backendUrl: 'https://tomato-backend-weqp.onrender.com',
    description: 'Live production environment'
  },
  
  // You can add more environments here
  // staging: {
  //   name: 'Staging',
  //   backendUrl: 'https://your-staging-backend.com',
  //   description: 'Staging environment for testing'
  // }
};

/**
 * Get the backend URL based on environment variables and build mode.
 * 
 * Priority:
 * 1. VITE_BACKEND_URL (explicit override from environment)
 * 2. Environment-specific default (development or production)
 */
const viteBackendUrl = import.meta.env.VITE_BACKEND_URL;

// Detect environment: Vite sets import.meta.env.DEV to true in dev mode, false in production builds
const isDevelopment = import.meta.env.DEV;
const currentEnv = isDevelopment ? 'development' : 'production';

// Resolve backend URL: explicit override takes precedence over environment defaults
export const CURRENT_ENV = ENVIRONMENTS[currentEnv];
export const BACKEND_URL = viteBackendUrl || CURRENT_ENV.backendUrl;

// Logging for debugging (only in development or if explicitly enabled)
if (isDevelopment || import.meta.env.VITE_ENABLE_LOGGING === 'true') {
  console.log(`🚀 Running in ${CURRENT_ENV.name} mode`);
  console.log(`📡 Backend URL: ${BACKEND_URL}`);
  if (viteBackendUrl) {
    console.log(`ℹ️  Using VITE_BACKEND_URL override: ${viteBackendUrl}`);
  }
} 