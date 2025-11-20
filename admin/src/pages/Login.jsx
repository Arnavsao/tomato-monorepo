/**
 * Login Page Component
 * 
 * Admin authentication page using Clerk.
 * Split layout with TOMATO branding on left and login form on right.
 */
import { SignIn } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Login.css';

const Login = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect to admin panel if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/add" replace />;
  }

  return (
    <div className="login-container">
      {/* Left Side - TOMATO Logo (50% width) */}
      <div className="login-left">
        <div className="login-logo-wrapper">
          {/* Logo - Centered in left half */}
          <img 
            src={assets.logo} 
            alt="TOMATO Logo" 
            className="login-logo"
          />
        </div>
      </div>

      {/* Right Side - Login Form (50% width) */}
      <div className="login-right">
        <div className="login-form-wrapper">
          {/* Clerk Sign In Component - Centered in right half */}
          <SignIn 
            routing="path"
            path="/login"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

