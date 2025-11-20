/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
        >
          <img src={assets.add_icon} alt="Add Icon" className="sidebar-link-icon" />
          <span className="sidebar-link-text">Add Items</span>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <img src={assets.order_icon} alt="List Icon" className="sidebar-link-icon" />
          <span className="sidebar-link-text">List Items</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <img src={assets.order_icon} alt="Orders Icon" className="sidebar-link-icon" />
          <span className="sidebar-link-text">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;