// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ClerkLogin from './components/ClerkLogin/ClerkLogin';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import Delivery from './pages/Delivery';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AuthDebugger from './components/AuthDebugger';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {showLogin && <ClerkLogin setShowLogin={setShowLogin} />}
      {showProfileSettings && <ProfileSettings setShowProfileSettings={setShowProfileSettings} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
      {/* Debug component - remove in production */}
      {/* <AuthDebugger /> */}
    </>
  );
}

export default App;