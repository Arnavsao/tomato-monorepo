// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
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
      <Routes>
        {/* Landing page - shown at root for evaluators */}
        <Route path='/' element={<Landing />} />
        
        {/* Customer app routes - with navbar and footer */}
        <Route path='/home' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <Home />
            </div>
            <Footer />
          </>
        } />
        <Route path='/cart' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <Cart />
            </div>
            <Footer />
          </>
        } />
        <Route path='/order' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <PlaceOrder />
            </div>
            <Footer />
          </>
        } />
        <Route path='/privacy-policy' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <PrivacyPolicy />
            </div>
            <Footer />
          </>
        } />
        <Route path='/terms-and-conditions' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <TermsAndConditions />
            </div>
            <Footer />
          </>
        } />
        <Route path='/refund-policy' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <RefundPolicy />
            </div>
            <Footer />
          </>
        } />
        <Route path='/delivery' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <Delivery />
            </div>
            <Footer />
          </>
        } />
        <Route path='/about-us' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <AboutUs />
            </div>
            <Footer />
          </>
        } />
        <Route path='/contact-us' element={
          <>
            <div className='app'>
              <Navbar setShowLogin={setShowLogin} setShowProfileSettings={setShowProfileSettings} />
              <ContactUs />
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;