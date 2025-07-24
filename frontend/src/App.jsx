// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import LoginPopup from './components/LoginPopup/LoginPopup'; // Import LoginPopup

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // Manage login popup state
  

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} cursorState="Login" />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;