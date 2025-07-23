import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DiaryCalendarProps {
  currentCalendarDate: Date;
  selectedDate: Date;
  onDateClick: (day: number) => void;
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  loading?: boolean;
  entriesMap?: Map<string, boolean>; // Map of date strings to whether entry exists
}

const DiaryCalendar: React.FC<DiaryCalendarProps> = ({
  currentCalendarDate,
  selectedDate,
  onDateClick,
  onNavigateMonth,
  loading = false,
  entriesMap = new Map()
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentCalendarDate.getMonth() === today.getMonth() &&
      currentCalendarDate.getFullYear() === today.getFullYear()
    );
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const hasEntry = (day: number) => {
    const dateStr = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day)
      .toISOString().split('T')[0];
    return entriesMap.has(dateStr);
  };

  const days = getDaysInMonth(currentCalendarDate);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">
          {monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
        </h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onNavigateMonth('prev')}
            disabled={loading}
            className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateMonth('next')}
            disabled={loading}
            className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-xs">
        {dayNames.map(day => (
          <div key={day} className="text-center text-gray-500 font-medium py-2">
            {day.charAt(0)}
          </div>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && onDateClick(day)}
            disabled={loading || !day}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 relative
              ${!day ? 'invisible' : ''}
              ${isToday(day || 0) ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold' : ''}
              ${isSameDate(selectedDate, new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day || 0)) && !isToday(day || 0) ? 'bg-purple-100 text-purple-600 font-semibold' : ''}
              ${!isToday(day || 0) && !isSameDate(selectedDate, new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day || 0)) ? 'hover:bg-gray-100 text-gray-700' : ''}
              ${loading ? 'cursor-not-allowed opacity-50' : ''}
            `}
          >
            {day}
            {day && hasEntry(day) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiaryCalendar;
