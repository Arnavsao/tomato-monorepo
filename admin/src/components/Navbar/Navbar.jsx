/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets.js';
import { useUser, UserButton } from '@clerk/clerk-react';
import './Navbar.css';

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
    <div className='navbar'>
      <div className="navbar-left">
        <img className='navbar-logo' src={assets.logo} alt="Tomato Logo" />
      </div>
      <div className="navbar-right">
        {isLoaded && user && (
          <>
            <div className="navbar-user-info">
              <span className="navbar-user-name">
                {user.fullName || user.firstName || 'Admin'}
              </span>
              <span className="navbar-user-email">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
            <UserButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;