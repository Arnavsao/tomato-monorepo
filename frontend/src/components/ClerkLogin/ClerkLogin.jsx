import { SignIn } from '@clerk/clerk-react';
import PropTypes from 'prop-types';
import './ClerkLogin.css';

const ClerkLogin = ({ setShowLogin }) => {
  return (
    <div className='clerk-login-overlay'>
      <div className='clerk-login-container'> 
        <div className="clerk-login-header">
          <button 
            onClick={() => setShowLogin(false)} 
            className="close-button"
          >
            ✕
          </button>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "clerk-signin-root",
              card: "clerk-signin-card"
            }
          }}
          redirectUrl="/"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
};

ClerkLogin.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default ClerkLogin; 