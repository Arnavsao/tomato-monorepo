/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets.js';
import { useUser, UserButton } from '@clerk/clerk-react';

/**
 * Navbar Component
 * 
 * Displays admin panel navigation with:
 * - Logo with "Tomato." text
 * - User information (name, email)
 * - Clerk UserButton for account management and logout
 */
const Navbar = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className='flex justify-between items-center px-10 py-4 bg-white shadow-sm border-b border-gray-200'>
      <div className="flex items-center gap-3">
        <img className='h-10 w-auto object-contain' src={assets.logo} alt="Tomato Logo" />
      </div>
      <div className="flex items-center gap-4">
        {isLoaded && user && (
          <>
            <div className="hidden md:flex flex-col items-end gap-0.5">
              <span className="font-semibold text-gray-800 text-sm">
                {user.fullName || user.firstName || 'Admin'}
              </span>
              <span className="text-xs text-gray-600">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;