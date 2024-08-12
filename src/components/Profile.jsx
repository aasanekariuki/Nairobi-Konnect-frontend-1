import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {
      name: 'Cross Joseph',
      following: 12800000,
      email: 'cross.joseph@example.com',
      profilePhoto: null,
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Profile of ${user.name}`,
          text: `Check out ${user.name}'s profile!`,
          url: window.location.href,
        })
        .then(() => console.log('Profile shared successfully!'))
        .catch((error) => console.log('Error sharing the profile:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1E2F] via-[#2F2F4F] to-[#4D4D87] bg-[length:400%_400%] animate-gradientShift">
      {/* Profile Picture */}
      <div className="relative">
        {user.profilePhoto ? (
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover border border-black"
          />
        ) : (
          <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center text-black text-3xl border border-black">
            <span>{user.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
      <span className="text-xl font-semibold text-white">
        {user.following.toLocaleString()} following
      </span>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleShare}
          className="bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-300"
        >
          + share
        </button>
        <button
          onClick={handleEditProfile}
          className="bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-full border border-gray-300 hover:bg-gray-300"
        >
          + edit profile
        </button>
      </div>

      {/* Additional Profile Details */}
      <div className="mt-6 text-white text-center">
        <p className="text-lg font-medium">Location: Nairobi, Kenya</p>
        <p className="text-lg font-medium">Bio: Passionate traveler and photographer</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>

      {/* Created and Saved */}
      <div className="mt-6 flex justify-around w-full max-w-xs">
        <div className="text-xl font-bold text-white">created</div>
        <div className="text-xl font-bold text-white">saved</div>
      </div>
    </div>
  );
};

export default Profile;
