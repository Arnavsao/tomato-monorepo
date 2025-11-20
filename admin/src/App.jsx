// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add.jsx';
import List from './pages/List/List.jsx';
import Orders from './pages/Orders/Orders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

/**
 * Admin Panel Application Component
 * 
 * Environment Configuration:
 * - Uses VITE_BACKEND_URL from environment variables if set
 * - Defaults to http://localhost:10000 for local development
 * - For production deployment, set VITE_BACKEND_URL in your hosting platform
 * 
 * Local Development:
 * - No .env file needed - defaults to localhost:10000
 * - Can override with VITE_BACKEND_URL in .env.local
 * 
 * Production Deployment:
 * - Set VITE_BACKEND_URL in your hosting platform (Vercel, Netlify, etc.)
 */
const App = () => {
  // Get backend URL from environment variable or use localhost default
  // This works seamlessly for both local development and production deployment
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000"

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="*" element={
              <div style={{ textAlign: "center", margin: "10px", color: "tomato" }}>
                <h2>Page Not Found</h2>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
