import type { Event } from '../types';

interface TodayEventsProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export const TodayEvents = ({ events, onEventClick }: TodayEventsProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Today's Events</h3>
      <div className="space-y-3">
        {events.length > 0 ? (
          events.map(event => (
            <div 
              key={event.id} 
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => onEventClick?.(event)}
            >
              <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                <p className="text-xs text-gray-500">{event.time === '23:59' ? 'All day' : event.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No events today</p>
        )}
      </div>
    </div>
  );
};
