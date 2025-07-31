// Environment Configuration
// This file allows you to easily switch between different backend URLs
// for different environments (development, staging, production, etc.)

export const ENVIRONMENTS = {
  // Development - local backend
  development: {
    name: 'Development',
    backendUrl: 'http://localhost:4000',
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

// Get current environment
const isDevelopment = import.meta.env.DEV;
const currentEnv = isDevelopment ? 'development' : 'production';

// Export current environment config
export const CURRENT_ENV = ENVIRONMENTS[currentEnv];
export const BACKEND_URL = CURRENT_ENV.backendUrl;

console.log(`🚀 Running in ${CURRENT_ENV.name} mode`);
console.log(`📡 Backend URL: ${BACKEND_URL}`); 