import { Clock } from 'lucide-react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
  showTime?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const EventCard = ({ 
  event, 
  onClick, 
  showTime = true, 
  size = 'medium' 
}: EventCardProps) => {
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-2',
    large: 'text-base px-4 py-3'
  };

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={`
        ${event.color} text-white rounded-lg font-medium
        flex items-center space-x-1 truncate cursor-pointer
        hover:opacity-90 transition-opacity duration-200
        ${sizeClasses[size]}
        ${onClick ? 'hover:shadow-md' : ''}
      `}
      onClick={handleClick}
    >
      {showTime && <Clock className="w-3 h-3 flex-shrink-0" />}
      <span className="truncate">
        {showTime && `${event.time === '23:59' ? 'All day' : event.time} `}
        {event.title}
      </span>
    </div>
  );
};
