import React from 'react';
import { HiOutlineLockClosed, HiOutlineUser, HiOutlineCamera, HiOutlineMail, HiOutlineGlobeAlt } from 'react-icons/hi';

const SettingButton = ({ icon: Icon, label, onClick, status, description }) => (
  <button
    onClick={onClick}
    className="group w-full flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
  >
    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-grow text-left">
      <div className="flex items-center justify-between">
        <span className="font-medium text-white group-hover:text-purple-400 transition-colors">
          {label}
        </span>
        {status && (
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
            {status}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      )}
    </div>
  </button>
);

const ProfileSettings = ({ onUpdateProfile, onChangePassword, onConnectInstagram }) => {
  const settings = [
    {
      icon: HiOutlineUser,
      label: 'Personal Information',
      onClick: onUpdateProfile,
      description: 'Update your name, bio, and location'
    },
    {
      icon: HiOutlineMail,
      label: 'Email Settings',
      onClick: onUpdateProfile,
      description: 'Manage your email preferences and notifications'
    },
    {
      icon: HiOutlineLockClosed,
      label: 'Security',
      onClick: onChangePassword,
      description: 'Change password and security settings'
    },
    {
      icon: HiOutlineCamera,
      label: 'Media Preferences',
      onClick: onUpdateProfile,
      description: 'Configure image quality and upload settings'
    },
    {
      icon: HiOutlineGlobeAlt,
      label: 'Connected Accounts',
      onClick: onConnectInstagram,
      status: 'Instagram Connected',
      description: 'Manage your connected social media accounts'
    }
  ];

  return (
    <div className="divide-y divide-gray-800">
      {settings.map((setting, index) => (
        <SettingButton key={index} {...setting} />
      ))}
    </div>
  );
};

export default ProfileSettings;
