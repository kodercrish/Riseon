import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Event } from '../types';

interface CalendarDayProps {
  day: number | null;
  isToday: boolean;
  isSelected: boolean;
  events: Event[];
  onDayClick: (day: number) => void;
  onAddEvent: (day: number) => void;
  onEventClick?: (event: Event) => void;
}

export const CalendarDay = ({
  day,
  isToday,
  isSelected,
  events,
  onDayClick,
  onAddEvent,
  onEventClick,
}: CalendarDayProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!day) {
    return <div className="invisible min-h-[80px] sm:min-h-[120px]" />;
  }

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddEvent(day);
  };

  const handleDayClick = () => {
    onDayClick(day);
  };

  return (
    <div
      className={`
        min-h-[80px] sm:min-h-[120px] p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer relative
        ${isToday
          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50'
          : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-md'
        }
        ${isSelected ? 'ring-2 ring-purple-300' : ''}
      `}
      onClick={handleDayClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Add Event Button - Shows on Hover (Hidden on mobile) */}
      {isHovered && (
        <button
          onClick={handleAddClick}
          className="hidden sm:flex absolute top-2 left-2 w-6 h-6 bg-purple-500 hover:bg-purple-600 text-white rounded-full items-center justify-center transition-all duration-200 shadow-lg z-10"
          title="Add event"
        >
          <Plus className="w-3 h-3" />
        </button>
      )}
      
      {/* Day Number */}
      <div className={`
        text-base sm:text-lg font-bold mb-1 sm:mb-2 ${isHovered ? 'sm:ml-8' : ''}
        ${isToday ? 'text-purple-600' : 'text-gray-800'}
        transition-all duration-200
      `}>
        {day}
      </div>
      
      {/* Events */}
      <div className="space-y-1">
        {/* Show fewer events on mobile */}
        {events.slice(0, window.innerWidth < 640 ? 2 : 3).map(event => (
          <div
            key={event.id}
            className={`
              ${event.color} text-white text-xs px-1 sm:px-2 py-1 rounded-md sm:rounded-lg font-medium
              flex items-center space-x-1 truncate cursor-pointer
              hover:opacity-90 transition-opacity duration-200
            `}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(event);
            }}
          >
            <span className="truncate text-xs">
              <span className="hidden sm:inline">{event.time === '23:59' ? 'All day' : event.time} </span>
              {event.title}
            </span>
          </div>
        ))}
        {events.length > (window.innerWidth < 640 ? 2 : 3) && (
          <div className="text-xs text-gray-500 font-medium">
            +{events.length - (window.innerWidth < 640 ? 2 : 3)} more
          </div>
        )}
      </div>
    </div>
  );
};
