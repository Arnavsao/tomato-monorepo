/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar Component
 * 
 * Displays admin panel navigation sidebar with:
 * - Admin Panel title
 * - Navigation links (Add Items, List Items, Orders)
 * - Responsive design: hidden on mobile, overlay when menu is open
 * 
 * @param {boolean} isMobileMenuOpen - Whether the mobile menu is currently open
 * @param {function} closeMobileMenu - Function to close mobile menu
 */
const Sidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
  /**
   * Handle navigation click - close mobile menu on mobile devices
   */
  const handleNavClick = () => {
    // Close mobile menu when a navigation link is clicked
    if (window.innerWidth < 768) {
      closeMobileMenu();
    }
  };

  return (
    <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Admin Panel Title */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
      </div>
      
      {/* Navigation Items */}
      <div className="sidebar-nav">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={handleNavClick}
        >
          <img src={assets.add_icon} alt="Add Icon" className="sidebar-link-icon" />
          <span className="sidebar-link-text">Add Items</span>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={handleNavClick}
        >
          <img src={assets.order_icon} alt="List Icon" className="sidebar-link-icon" />
          <span className="sidebar-link-text">List Items</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          onClick={handleNavClick}
        >
          <img src={assets.order_icon} alt="Orders Icon" className="sidebar-link-icon" />
          <span className="sidebar-link-text">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isMobileMenuOpen: PropTypes.bool.isRequired,
  closeMobileMenu: PropTypes.func.isRequired,
};

export default Sidebar;