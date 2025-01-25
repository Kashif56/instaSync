import React from 'react';
import { AiOutlineInstagram, AiOutlineSchedule, AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';

const StatCard = ({ icon: Icon, label, value, subtext }) => (
  <div className="bg-gray-900/30 backdrop-blur-xl p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-purple-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <span className="text-xs font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
        {subtext}
      </span>
    </div>
    <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      icon: AiOutlineInstagram,
      label: 'Total Posts',
      value: stats.totalPosts || 0,
      subtext: 'All time'
    },
    {
      icon: AiOutlineSchedule,
      label: 'Scheduled',
      value: stats.scheduledPosts || 0,
      subtext: 'Pending'
    },
    {
      icon: AiOutlineCheckCircle,
      label: 'Completed',
      value: stats.completedPosts || 0,
      subtext: 'Success'
    },
    {
      icon: AiOutlineWarning,
      label: 'Failed',
      value: stats.failedPosts || 0,
      subtext: 'Error'
    }
  ];

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-semibold text-white mb-8">Account Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statItems.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
