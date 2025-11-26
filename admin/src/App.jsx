// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
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
import './App.css';

/**
 * Admin Panel Application Component
 * 
 * All admin routes are protected and require Clerk authentication.
 * Unauthenticated users are redirected to /login.
 * 
 * Environment Configuration:
 * - VITE_BACKEND_URL: Backend API URL (defaults to http://localhost:8000)
 * - VITE_CLERK_PUBLISHABLE_KEY: Clerk publishable key (required)
 */
const App = () => {
  // Mobile menu state management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Normalize backend URL - remove trailing slash to prevent double slashes
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const url = backendUrl.replace(/\/+$/, ''); // Remove trailing slashes

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Close mobile menu when clicking outside or on navigation
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /**
   * Close mobile menu when window is resized to desktop width
   * Prevents menu from staying open when switching from mobile to desktop view
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

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
              <div className="app-container">
                <Navbar 
                  isMobileMenuOpen={isMobileMenuOpen}
                  toggleMobileMenu={toggleMobileMenu}
                />
                <div className="app-main-layout">
                  {/* Mobile backdrop overlay */}
                  {isMobileMenuOpen && (
                    <div 
                      className="mobile-backdrop"
                      onClick={closeMobileMenu}
                      aria-hidden="true"
                    />
                  )}
                  <Sidebar 
                    isMobileMenuOpen={isMobileMenuOpen}
                    closeMobileMenu={closeMobileMenu}
                  />
                  <main className="app-main-content">
                    <div className="app-main-content-wrapper">
                      <Routes>
                        <Route path="/" element={<Navigate to="/add" replace />} />
                        <Route path="/add" element={<Add url={url} />} />
                        <Route path="/list" element={<List url={url} />} />
                        <Route path="/orders" element={<Orders url={url} />} />
                        <Route path="*" element={
                          <div className="app-not-found">
                            <h2 className="app-not-found-title">Page Not Found</h2>
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
