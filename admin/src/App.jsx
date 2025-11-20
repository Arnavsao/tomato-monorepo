// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add.jsx';
import List from './pages/List/List.jsx';
import Orders from './pages/Orders/Orders.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Admin Panel Application Component
 * 
 * All admin routes are protected and require Clerk authentication.
 * Unauthenticated users are redirected to /login.
 * 
 * Environment Configuration:
 * - VITE_BACKEND_URL: Backend API URL (defaults to http://localhost:10000)
 * - VITE_CLERK_PUBLISHABLE_KEY: Clerk publishable key (required)
 */
const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:10000";

  return (
    <div>
      <ToastContainer/>
      <Routes>
        {/* Public route - Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - Require authentication */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
                <div className="flex flex-1 overflow-hidden">
        <Sidebar />
                  <main className="flex-1 overflow-y-auto">
                    <div className="p-8">
          <Routes>
                        <Route path="/" element={<Navigate to="/add" replace />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="*" element={
                          <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-tomato">Page Not Found</h2>
              </div>
            } />
          </Routes>
                    </div>
                  </main>
        </div>
      </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
