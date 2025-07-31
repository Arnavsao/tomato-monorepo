/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, setShowProfileSettings }) => {

  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount } = useContext(StoreContext);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    setMenu(section);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = () => {
    setMenu("home");
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      // Scroll to top of home page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='py-5 flex justify-between items-center'>
      <Link to="/" onClick={handleHomeClick}>
        <img src={assets.logo} alt="Logo" className='w-[150px] lg:w-[150px] md:w-[140px] sm:w-[120px]' />
      </Link>
      
      <ul className='hidden md:flex list-none gap-5 text-[#49557e] text-lg md:text-lg sm:text-base md:gap-5 sm:gap-4'>
        <Link 
          to="/" 
          onClick={handleHomeClick} 
          className={`${menu === "home" && location.pathname === "/" ? "pb-0.5 border-b-2 border-[#49557e]" : ""} cursor-pointer`}
        >
          home
        </Link>
        <a 
          onClick={() => handleNavigation("explore-menu")} 
          className={`${menu === "menu" && location.pathname === "/" ? "pb-0.5 border-b-2 border-[#49557e]" : ""} cursor-pointer`}
        >
          menu
        </a>
        <a 
          onClick={() => handleNavigation("app-download")} 
          className={`${menu === "mobile-app" && location.pathname === "/" ? "pb-0.5 border-b-2 border-[#49557e]" : ""} cursor-pointer`}
        >
          mobile-app
        </a>
        <a 
          onClick = {() => navigate("/contact-us")}
          className='cursor-pointer'
        >
          contact-us
        </a>
      </ul>
      <div className='flex items-center gap-3 md:gap-8 sm:gap-5 lg:gap-10'>
        <img src={assets.search_icon} alt="Search" className='w-6' />
        <div className='relative'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" className='w-6' />
          </Link>
          <div className={`${getTotalCartAmount() === 0 ? "hidden" : "absolute min-w-[10px] min-h-[10px] bg-tomato rounded-[5px] -top-2 -right-2"}`}></div>
        </div>
        {!isSignedIn ? (
          <button 
            onClick={() => setShowLogin(true)}
            className='bg-transparent text-base text-[#49557e] border border-tomato py-2.5 px-8 rounded-[50px] cursor-pointer transition-all duration-300 hover:bg-[#fff4f2]'
          >
            sign in
          </button>
        ) : (
          <div className='relative group'>
            <img 
              src={user?.imageUrl || assets.profile_icon} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white shadow-md"
            />
            <ul className='absolute hidden group-hover:flex flex-col gap-2.5 right-0 z-10 bg-[#fff2ef] p-3 rounded border border-tomato outline-2 outline-white list-none'>
              <li className='flex items-center gap-2.5 cursor-pointer'>
                <img src={assets.bag_icon} alt="" className='w-5' />
                <p>Orders</p>
              </li>
              <hr />
              <li 
                onClick={() => setShowProfileSettings(true)}
                className='flex items-center gap-2.5 cursor-pointer'
              >
                <img src={assets.profile_icon} alt="" className='w-5' />
                <p>Profile Settings</p>
              </li>
              <hr />
              <li>
                <SignOutButton>
                  <div className="flex items-center gap-2.5 cursor-pointer hover:text-tomato">
                    <img src={assets.logout_icon} alt="" className='w-5' />
                    <p>Logout</p>
                  </div>
                </SignOutButton>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;