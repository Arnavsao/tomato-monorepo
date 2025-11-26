/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets.js';
import { useUser, UserButton } from '@clerk/clerk-react';
import './Navbar.css';

/**
 * Navbar Component
 * 
 * Displays admin panel navigation with:
 * - Logo with "Tomato." text
 * - Hamburger menu button for mobile devices
 * - User information (name, email)
 * - Clerk UserButton for account management and logout
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.sidebarOpen - Whether the sidebar is currently open (mobile)
 * @param {Function} props.toggleSidebar - Function to toggle sidebar visibility
 */
const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const { user, isLoaded } = useUser();

  return (
    <div className='navbar'>
      <div className="navbar-left">
        {/* Hamburger Menu Button - Visible on mobile */}
        <button 
          className="navbar-hamburger"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          <span className={`hamburger-line ${sidebarOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${sidebarOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${sidebarOpen ? 'active' : ''}`}></span>
        </button>
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

Navbar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;