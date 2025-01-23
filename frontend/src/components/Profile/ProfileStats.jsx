import React from 'react';
import { AiOutlineInstagram, AiOutlineSchedule, AiOutlineCheckCircle, AiOutlineLike, AiOutlineComment, AiOutlineBarChart } from 'react-icons/ai';

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
      value: stats.totalPosts,
      subtext: 'All time'
    },
    {
      icon: AiOutlineSchedule,
      label: 'Scheduled',
      value: stats.scheduledPosts,
      subtext: 'Pending'
    },
    {
      icon: AiOutlineCheckCircle,
      label: 'Published',
      value: stats.publishedPosts,
      subtext: 'Complete'
    },
    {
      icon: AiOutlineLike,
      label: 'Total Likes',
      value: stats.totalLikes,
      subtext: 'All posts'
    },
    {
      icon: AiOutlineComment,
      label: 'Comments',
      value: stats.totalComments,
      subtext: 'All posts'
    },
    {
      icon: AiOutlineBarChart,
      label: 'Engagement',
      value: stats.avgEngagement,
      subtext: 'Average'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default ProfileStats;
