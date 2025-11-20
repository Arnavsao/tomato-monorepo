/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Admin Panel Title */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-2">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
              isActive
                ? 'bg-orange-50 border-l-4 border-tomato text-tomato font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`
          }
        >
          <img src={assets.add_icon} alt="Add Icon" className="w-5 h-5" />
          <span className="text-sm">Add Items</span>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
              isActive
                ? 'bg-orange-50 border-l-4 border-tomato text-tomato font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`
          }
        >
          <img src={assets.order_icon} alt="List Icon" className="w-5 h-5" />
          <span className="text-sm">List Items</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
              isActive
                ? 'bg-orange-50 border-l-4 border-tomato text-tomato font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`
          }
        >
          <img src={assets.order_icon} alt="Orders Icon" className="w-5 h-5" />
          <span className="text-sm">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;