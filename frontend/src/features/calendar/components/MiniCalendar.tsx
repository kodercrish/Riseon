// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import type { Event } from '../types';

// interface MiniCalendarProps {
//   currentDate: Date;
//   selectedDate: number | null;
//   monthNames: string[];
//   dayNames: string[];
//   days: (number | null)[];
//   onNavigateMonth: (direction: 'prev' | 'next') => void;
//   onSelectDate: (day: number) => void;
//   isToday: (day: number) => boolean;
//   getDayEvents: (day: number) => Event[];
// }

// export const MiniCalendar = ({
//   currentDate,
//   selectedDate,
//   monthNames,
//   dayNames,
//   days,
//   onNavigateMonth,
//   onSelectDate,
//   isToday,
//   getDayEvents,
// }: MiniCalendarProps) => {
//   return (
//     <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100 mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-semibold text-gray-800">
//           {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//         </h3>
//         <div className="flex space-x-1">
//           <button
//             onClick={() => onNavigateMonth('prev')}
//             className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => onNavigateMonth('next')}
//             className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-7 gap-1 text-xs">
//         {dayNames.map(day => (
//           <div key={day} className="text-center text-gray-500 font-medium py-2">
//             {day.charAt(0)}
//           </div>
//         ))}
//         {days.map((day, index) => (
//           <button
//             key={index}
//             onClick={() => day && onSelectDate(day)}
//             className={`
//               aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
//               ${!day ? 'invisible' : ''}
//               ${isToday(day || 0) ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold' : ''}
//               ${selectedDate === day ? 'bg-purple-100 text-purple-600 font-semibold' : ''}
//               ${!isToday(day || 0) && selectedDate !== day ? 'hover:bg-gray-100 text-gray-700' : ''}
//               ${getDayEvents(day || 0).length > 0 && !isToday(day || 0) && selectedDate !== day ? 'bg-blue-50 text-blue-600' : ''}
//             `}
//           >
//             {day}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Event } from '../types';

interface MiniCalendarProps {
  currentDate: Date;
  selectedDate: number | null;
  monthNames: string[];
  dayNames: string[];
  days: (number | null)[];
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onSelectDate: (day: number) => void;
  isToday: (day: number) => boolean;
  getDayEvents: (day: number) => Event[];
}

export const MiniCalendar = ({
  currentDate,
  selectedDate,
  monthNames,
  dayNames,
  days,
  onNavigateMonth,
  onSelectDate,
  isToday,
  getDayEvents,
}: MiniCalendarProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onNavigateMonth('prev')}
            className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateMonth('next')}
            className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
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
            onClick={() => day && onSelectDate(day)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
              ${!day ? 'invisible' : ''}
              ${isToday(day || 0) ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold' : ''}
              ${selectedDate === day ? 'bg-purple-100 text-purple-600 font-semibold' : ''}
              ${!isToday(day || 0) && selectedDate !== day ? 'hover:bg-gray-100 text-gray-700' : ''}
              ${getDayEvents(day || 0).length > 0 && !isToday(day || 0) && selectedDate !== day ? 'bg-blue-50 text-blue-600' : ''}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
