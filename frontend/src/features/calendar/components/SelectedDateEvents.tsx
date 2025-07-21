import { Plus } from 'lucide-react';
import type { Event } from '../types';

interface SelectedDateEventsProps {
  selectedDate: number;
  currentDate: Date;
  monthNames: string[];
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export const SelectedDateEvents = ({
  selectedDate,
  currentDate,
  monthNames,
  events,
  onEventClick,
}: SelectedDateEventsProps) => {
  return (
    <div className="mt-4 sm:mt-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Events for {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {events.length > 0 ? (
            events.map(event => (
              <div 
                key={event.id} 
                className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => onEventClick?.(event)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 ${event.color} rounded-full mt-1 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base truncate">{event.title}</h4>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-2">
                      <span>{event.time === '23:59' ? 'All day' : event.time}</span>
                    </div>
                    {event.description && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{event.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-6 sm:py-8">
              <p className="text-gray-500 text-sm sm:text-base">No events scheduled for this date</p>
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto text-sm sm:text-base">
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
