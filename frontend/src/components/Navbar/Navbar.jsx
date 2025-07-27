/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, setShowProfileSettings }) => {

  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount } = useContext(StoreContext);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="Logo" className='logo' />
      </Link>
      
      <ul className='navbar-menu'>
        <Link 
          to="/" 
          onClick={() => setMenu("home")} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a 
          href='#explore-menu' 
          onClick={() => setMenu("menu")} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a 
          href='#app-download' 
          onClick={() => setMenu("mobile-app")} 
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a 
          href='#footer' 
          onClick={() => setMenu("contact-us")} 
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="Search" />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!isSignedIn ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img 
              src={user?.imageUrl || assets.profile_icon} 
              alt="Profile" 
              className="profile-picture"
            />
            <ul className='nav-profile-dropdown'>
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={() => setShowProfileSettings(true)}><img src={assets.profile_icon} alt="" /><p>Profile Settings</p></li>
              <hr />
              <li>
                <SignOutButton>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <img src={assets.logout_icon} alt="" />
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