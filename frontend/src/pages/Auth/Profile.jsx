import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileStats from '../../components/Profile/ProfileStats';
import ProfileSettings from '../../components/Profile/ProfileSettings';
import Breadcrumb from '../../components/Common/Breadcrumb';
import Toast from '../../components/Toast';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineGlobe } from 'react-icons/hi';
import { AiOutlineInstagram, AiOutlineLink, AiOutlineCheckCircle } from 'react-icons/ai';
import { getUserProfile } from '../../api/generalApiService';

const Profile = () => {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [postsData, setPostsData] = useState({
    posts: 0,
    completedPosts: 0,
    pendingPosts: 0
  });

  const navigate = useNavigate();

  // Check authentication
  const accessToken = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    // Redirect if not authenticated
    if (!accessToken || !isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        if (response?.data) {
          console.log(response);
          
          setUserProfile(response.data);
          setPostsData({
            posts: response.posts,
            completedPosts: response.completedPosts,
            pendingPosts: response.pendingPosts
          });
        }
      } catch (error) {
        setToast({
          type: 'error',
          message: error || 'Failed to load profile data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    console.log(postsData);
    
  }, [accessToken, isAuthenticated, navigate]);

  const handleImageChange = async (file) => {
    try {
      setToast({
        type: 'info',
        message: 'Updating profile image...'
      });
      // TODO: Implement profile image update
      setToast({
        type: 'success',
        message: 'Profile image updated successfully!'
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: error || 'Failed to update profile image'
      });
    }
  };

  const handleConnectInstagram = () => {
    setToast({
      type: 'info',
      message: 'Connecting to Instagram...'
    });
    // TODO: Implement Instagram OAuth
    window.location.href = '/api/auth/instagram/connect/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Profile', href: '/profile' }
            ]}
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Profile Card */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
                <ProfileHeader
                  user={{
                    name: userProfile?.user?.username || 'User',
                    profileImage: userProfile?.profile_image || null,
                    email: userProfile?.user?.email
                  }}
                  onImageChange={handleImageChange}
                />
                <div className="mt-8 space-y-6 text-gray-400">
                 
                  <div className="flex items-center space-x-3">
                    <HiOutlineClock className="w-5 h-5 text-purple-400" />
                    <span>{userProfile?.timezone || 'Timezone not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiOutlineCalendar className="w-5 h-5 text-purple-400" />
                    <span>Joined on {new Date(userProfile?.user?.date_joined || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Instagram Connection Card */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <AiOutlineInstagram className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-medium text-gray-200">Instagram Account</h3>
                  </div>
                </div>
                {userProfile?.instagram_connected ? (
                  <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center space-x-3">
                      <AiOutlineCheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm font-medium text-green-400">Connected</p>
                        <p className="text-xs text-gray-400">@{userProfile.instagram_username}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setToast({
                          type: 'info',
                          message: 'Disconnecting Instagram account...'
                        });
                      }}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <p className="text-sm text-gray-400">Connect your Instagram account to start scheduling posts.</p>
                    </div>
                    <button
                      onClick={handleConnectInstagram}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <AiOutlineLink className="w-5 h-5" />
                      <span>Connect Instagram</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bio Section */}
              <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Bio</h3>
                <p className="text-gray-400">
                  {userProfile?.bio || 'No bio added yet'}
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ProfileStats
                stats={{
                  totalPosts: postsData.posts,
                  scheduledPosts: postsData.pendingPosts,
                  completedPosts: postsData.completedPosts,
                  failedPosts: postsData.failedPosts
                }}
              />
              <ProfileSettings
                settings={{
                  emailNotifications: userProfile?.email_notifications || false,
                  pushNotifications: userProfile?.push_notifications || false,
                  weeklyDigest: userProfile?.weekly_digest || false,
                  darkMode: userProfile?.dark_mode || true
                }}
                onSettingChange={(setting, value) => {
                  setToast({
                    type: 'info',
                    message: 'Settings update coming soon!'
                  });
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;