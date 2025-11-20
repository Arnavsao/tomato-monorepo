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

const Login = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect to admin panel if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/add" replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - TOMATO Logo (50% width) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
        <div className="flex flex-col items-center justify-center">
          {/* Logo - Centered in left half */}
          <img 
            src={assets.logo} 
            alt="TOMATO Logo" 
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>

      {/* Right Side - Login Form (50% width) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Clerk Sign In Component - Centered in right half */}
          <SignIn 
            routing="path"
            path="/login"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-lg border border-gray-200 rounded-xl bg-white",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
                footerActionLink: "text-orange-500 hover:text-orange-600",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

