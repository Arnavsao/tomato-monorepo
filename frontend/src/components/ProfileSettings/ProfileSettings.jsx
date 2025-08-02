import { useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const ProfileSettings = ({ setShowProfileSettings }) => {
  const { userProfile, updateUserProfile } = useContext(StoreContext);
  const [profilePicture, setProfilePicture] = useState(userProfile?.profilePicture || '');
  const [name, setName] = useState(userProfile?.name || '');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateUserProfile({
      name: name || userProfile?.name,
      profilePicture: profilePicture || userProfile?.profilePicture
    });
    
    setLoading(false);
    
    if (result.success) {
      alert('Profile updated successfully!');
      setShowProfileSettings(false);
    } else {
      alert(result.error || 'Failed to update profile');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='absolute z-10 w-full h-full bg-black/60 grid'>
      <div className='place-self-center w-full md:w-[max(25vw,400px)] text-gray-600 bg-white flex flex-col gap-6 p-6 rounded-lg text-sm animate-fadeIn'>
        <div className="flex justify-center items-center relative text-black">
          <h2 className="m-0 absolute left-1/2 transform -translate-x-1/2">Profile Settings</h2>
          <button 
            onClick={() => setShowProfileSettings(false)} 
            className="absolute right-0 w-4 h-5 cursor-pointer"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-4 mb-5">
            <div className="relative">
              <img 
                src={previewImage || profilePicture || userProfile?.profilePicture || assets.profile_icon} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-3 border-gray-200 shadow-lg"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute -bottom-2 -right-2 bg-tomato text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-tomato-dark transition-colors"
                title="Change profile picture"
              >
                📷
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileInput}
              className="text-tomato text-sm hover:text-tomato-dark transition-colors"
            >
              Upload new photo
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border border-gray-300 p-2.5 rounded"
            />
            <p className="text-xs text-gray-500 m-0 leading-relaxed">
              Click the camera icon or &quot;Upload new photo&quot; button to change your profile picture
            </p>
          </div>
          
          <button 
            type='submit' 
            disabled={loading}
            className="border-none p-2.5 rounded bg-orange-500 text-white bg-tomato text-sm cursor-pointer hover:bg-tomato-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

ProfileSettings.propTypes = {
  setShowProfileSettings: PropTypes.func.isRequired
};

export default ProfileSettings; 