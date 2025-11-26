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
 * @param {boolean} isMobileMenuOpen - Whether the mobile menu is currently open
 * @param {function} toggleMobileMenu - Function to toggle mobile menu visibility
 */
const Navbar = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { user, isLoaded } = useUser();

  return (
    <div className='navbar'>
      <div className="navbar-left">
        {/* Hamburger menu button for mobile */}
        <button
          className="navbar-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
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
  isMobileMenuOpen: PropTypes.bool.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired,
};

export default Navbar;