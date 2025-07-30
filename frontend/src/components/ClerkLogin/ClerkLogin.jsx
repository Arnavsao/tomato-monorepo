import { SignIn } from '@clerk/clerk-react';
import PropTypes from 'prop-types';

const ClerkLogin = ({ setShowLogin }) => {
  return (
    <div className='absolute z-10 w-full h-full  bg-black/60 grid'>
      <div className='place-self-center  bg-white rounded-lg animate-fadeIn flex flex-col items-end'>
        <div className="flex justify-between items-center w-full p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>
          <button 
            onClick={() => setShowLogin(false)} 
            className="bg-none border-none text-lg cursor-pointer text-gray-500 p-2.5 rounded-tr-lg w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border-none"
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