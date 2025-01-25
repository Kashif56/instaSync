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

const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`${
      enabled ? 'bg-purple-600' : 'bg-gray-700'
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
  >
    <span
      className={`${
        enabled ? 'translate-x-6' : 'translate-x-1'
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
    />
  </button>
);

const SettingItem = ({ label, description, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-lg font-medium text-gray-200">{label}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
};

const ProfileSettings = ({ settings, onSettingChange, onUpdateProfile, onChangePassword, onConnectInstagram }) => {
  const userSettings = [
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
    }
  ];

  return (
    <div className="space-y-4 mt-4 bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
      {userSettings.map((setting, index) => (
        <SettingButton key={index} {...setting} />
      ))}
      <div className="p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-white mb-8">Notification Settings</h2>
        <div className="space-y-4">
          <SettingItem
            label="Email Notifications"
            description="Receive email notifications for scheduled posts"
            enabled={settings.emailNotifications}
            onChange={(value) => onSettingChange('emailNotifications', value)}
          />
          <SettingItem
            label="Push Notifications"
            description="Get browser notifications for important updates"
            enabled={settings.pushNotifications}
            onChange={(value) => onSettingChange('pushNotifications', value)}
          />
          <SettingItem
            label="Weekly Digest"
            description="Receive a weekly summary of your post performance"
            enabled={settings.weeklyDigest}
            onChange={(value) => onSettingChange('weeklyDigest', value)}
          />
          <SettingItem
            label="Dark Mode"
            description="Toggle between light and dark theme"
            enabled={settings.darkMode}
            onChange={(value) => onSettingChange('darkMode', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
