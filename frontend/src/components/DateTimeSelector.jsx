import React from 'react';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';

const DateTimeSelector = ({ date, time, onDateChange, onTimeChange }) => {
  // Get current date and time in local timezone
  const now = new Date();
  const localDate = now.toISOString().split('T')[0];
  const localTime = now.toTimeString().slice(0, 5);

  // Calculate min date (today) and max date (1 year from now)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date Selector */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-black/30 border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex items-center p-3 border-b border-gray-700">
            <AiOutlineCalendar className="w-5 h-5 text-purple-400" />
            <span className="ml-2 text-sm font-medium text-purple-400">Schedule Date</span>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            min={localDate}
            max={maxDateString}
            className="w-full p-3 bg-transparent text-white focus:outline-none focus:ring-0 border-none"
            required
          />
        </div>
      </div>

      {/* Time Selector */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-black/30 border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex items-center p-3 border-b border-gray-700">
            <AiOutlineClockCircle className="w-5 h-5 text-purple-400" />
            <span className="ml-2 text-sm font-medium text-purple-400">Schedule Time</span>
          </div>
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            min={date === localDate ? localTime : undefined}
            className="w-full p-3 bg-transparent text-white focus:outline-none focus:ring-0 border-none"
            required
          />
        </div>
      </div>

      {/* Time Zone Indicator */}
      <div className="md:col-span-2 text-center">
        <span className="text-sm text-gray-400">
          All times are in your local timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone})
        </span>
      </div>
    </div>
  );
};

export default DateTimeSelector;
