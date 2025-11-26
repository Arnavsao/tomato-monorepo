/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar Component
 * 
 * Displays admin panel navigation sidebar with:
 * - Admin Panel title
 * - Navigation links (Add Items, List Items, Orders)
 * - Responsive design: overlay on mobile, fixed on desktop
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the sidebar is currently open (mobile)
 * @param {Function} props.onClose - Function to close the sidebar (mobile)
 */
const Sidebar = ({ isOpen, onClose }) => {
  // Close sidebar when a link is clicked (mobile only)
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay - Shows when sidebar is open */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
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
            onClick={handleLinkClick}
          >
            <img src={assets.add_icon} alt="Add Icon" className="sidebar-link-icon" />
            <span className="sidebar-link-text">Add Items</span>
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleLinkClick}
          >
            <img src={assets.order_icon} alt="List Icon" className="sidebar-link-icon" />
            <span className="sidebar-link-text">List Items</span>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
            onClick={handleLinkClick}
          >
            <img src={assets.order_icon} alt="Orders Icon" className="sidebar-link-icon" />
            <span className="sidebar-link-text">Orders</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;