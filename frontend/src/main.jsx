import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

/**
 * Clerk Publishable Key Configuration
 * 
 * This key is required for authentication to work.
 * 
 * Local Development:
 * - Set in frontend/.env.local as: VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
 * 
 * Production (Vercel/Netlify):
 * - Set in your hosting platform's environment variables
 * - Variable name: VITE_CLERK_PUBLISHABLE_KEY
 * - Value: Your Clerk publishable key (pk_live_... for production)
 * 
 * After setting environment variables in Vercel:
 * 1. Go to your project settings
 * 2. Navigate to "Environment Variables"
 * 3. Add VITE_CLERK_PUBLISHABLE_KEY with your key
 * 4. Redeploy your application
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  const isProduction = import.meta.env.PROD
  const errorMessage = isProduction
    ? "Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your Vercel project settings under Environment Variables, then redeploy."
    : "Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in frontend/.env.local file."
  
  console.error("❌ Configuration Error:", errorMessage)
  console.error("Current environment:", import.meta.env.MODE)
  console.error("Available env vars:", Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')))
  
  throw new Error(errorMessage)
}

// Create the root element and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </ClerkProvider>
);