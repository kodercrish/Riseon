// import { useState } from 'react';
// import type { Event } from '../types';

// export const useCalendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState<number | null>(null);
//   const [view, setView] = useState<'month' | 'week'>('month');

//   // Sample events data - in a real app, this would come from an API
//   const events: Record<string, Event[]> = {
//     '2025-01-15': [
//       {
//         id: '1',
//         title: 'Morning Meditation',
//         time: '07:00',
//         type: 'personal',
//         color: 'bg-purple-500',
//       },
//       {
//         id: '2',
//         title: 'Team Planning Session',
//         time: '10:00',
//         type: 'meeting',
//         color: 'bg-blue-500',
//         location: 'Conference Room A',
//         attendees: 5,
//       },
//     ],
//     '2025-01-16': [
//       {
//         id: '3',
//         title: 'Workout Session',
//         time: '18:00',
//         type: 'goal',
//         color: 'bg-green-500',
//       },
//     ],
//     '2025-01-18': [
//       {
//         id: '4',
//         title: 'Weekly Review',
//         time: '15:00',
//         type: 'journal',
//         color: 'bg-pink-500',
//       },
//       {
//         id: '5',
//         title: 'Client Call',
//         time: '16:30',
//         type: 'meeting',
//         color: 'bg-blue-500',
//         attendees: 3,
//       },
//     ],
//     '2025-01-20': [
//       {
//         id: '6',
//         title: 'Reading Time',
//         time: '20:00',
//         type: 'personal',
//         color: 'bg-purple-500',
//       },
//     ],
//   };

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const getDaysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();
//     const days = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }
    
//     // Add days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(day);
//     }
    
//     return days;
//   };

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       if (direction === 'prev') {
//         newDate.setMonth(prev.getMonth() - 1);
//       } else {
//         newDate.setMonth(prev.getMonth() + 1);
//       }
//       return newDate;
//     });
//   };

//   const getEventKey = (day: number) => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//   };

//   const getDayEvents = (day: number) => {
//     return events[getEventKey(day)] || [];
//   };

//   const isToday = (day: number) => {
//     const today = new Date();
//     return (
//       day === today.getDate() &&
//       currentDate.getMonth() === today.getMonth() &&
//       currentDate.getFullYear() === today.getFullYear()
//     );
//   };

//   return {
//     currentDate,
//     selectedDate,
//     view,
//     events,
//     monthNames,
//     dayNames,
//     setSelectedDate,
//     setView,
//     getDaysInMonth,
//     navigateMonth,
//     getDayEvents,
//     isToday,
//   };
// };

import { useState } from 'react';
import type { ViewType } from '../types';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [view, setView] = useState<ViewType>('month');

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return {
    currentDate,
    selectedDate,
    view,
    monthNames,
    dayNames,
    setSelectedDate,
    setView,
    getDaysInMonth,
    navigateMonth,
    isToday,
  };
};
