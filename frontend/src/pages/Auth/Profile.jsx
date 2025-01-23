import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileStats from '../../components/Profile/ProfileStats';
import ProfileSettings from '../../components/Profile/ProfileSettings';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Toast from '../../components/Toast';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineGlobe } from 'react-icons/hi';

const Profile = () => {
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: null,
    joinDate: '2024-01-01',
    timezone: 'UTC+5',
    lastActive: '2025-01-23T12:00:00',
    bio: 'Digital content creator and social media enthusiast',
    location: 'New York, USA',
    instagramHandle: '@johndoe'
  });

  const [stats, setStats] = useState({
    totalPosts: 125,
    scheduledPosts: 15,
    publishedPosts: 110,
    totalLikes: 1250,
    totalComments: 450,
    avgEngagement: '3.2%'
  });

  const breadcrumbItems = [
    { label: 'Profile', path: '/profile' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, profileImage: reader.result }));
        setToast({ type: 'success', message: 'Profile picture updated successfully!' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    setToast({ type: 'info', message: 'Profile update coming soon!' });
  };

  const handleChangePassword = () => {
    setToast({ type: 'info', message: 'Password change coming soon!' });
  };

  const handleConnectInstagram = () => {
    setToast({ type: 'info', message: 'Instagram connection coming soon!' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      
      {/* Main content */}
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 py-8 pt-32">
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}

        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 sticky top-32">
                <ProfileHeader
                  user={user}
                  onImageChange={handleImageChange}
                />
                <div className="mt-8 space-y-6 text-gray-400">
                  <div className="flex items-center space-x-3">
                    <HiOutlineGlobe className="w-5 h-5 text-purple-400" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiOutlineClock className="w-5 h-5 text-purple-400" />
                    <span>{user.timezone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiOutlineCalendar className="w-5 h-5 text-purple-400" />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Bio</h3>
                  <p className="text-gray-400">{user.bio}</p>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Instagram</h3>
                  <p className="text-purple-400">{user.instagramHandle}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Settings */}
            <div className="lg:col-span-2 space-y-8 xl:space-y-12">
              {/* Stats Cards */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
                <h2 className="text-2xl font-semibold text-white mb-8">Account Statistics</h2>
                <ProfileStats stats={stats} />
              </div>

              {/* Settings */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
                <h2 className="text-2xl font-semibold text-white mb-8">Account Settings</h2>
                <ProfileSettings
                  onUpdateProfile={handleUpdateProfile}
                  onChangePassword={handleChangePassword}
                  onConnectInstagram={handleConnectInstagram}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;