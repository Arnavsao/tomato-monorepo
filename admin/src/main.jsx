/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

/**
 * Clerk Publishable Key Configuration
 * 
 * Get your publishable key from: https://dashboard.clerk.com
 * Set it in admin/.env.local as: VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
 * 
 * For production, set it in your hosting platform's environment variables
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error('❌ Missing VITE_CLERK_PUBLISHABLE_KEY');
  console.error('Please set it in admin/.env.local file');
  throw new Error('Missing Clerk Publishable Key. Set VITE_CLERK_PUBLISHABLE_KEY in admin/.env.local');
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </ClerkProvider>
);