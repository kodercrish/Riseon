import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'personal' | 'goal' | 'journal';
  color: string;
  location?: string;
  attendees?: number;
}

interface CalendarProps {
  onBack?: () => void;
}

export default function Calendar({ onBack }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [view, setView] = useState<'month' | 'week'>('month');

  // Sample events data
  const events: Record<string, Event[]> = {
    '2025-01-15': [
      {
        id: '1',
        title: 'Morning Meditation',
        time: '07:00',
        type: 'personal',
        color: 'bg-purple-500',
      },
      {
        id: '2',
        title: 'Team Planning Session',
        time: '10:00',
        type: 'meeting',
        color: 'bg-blue-500',
        location: 'Conference Room A',
        attendees: 5,
      },
    ],
    '2025-01-16': [
      {
        id: '3',
        title: 'Workout Session',
        time: '18:00',
        type: 'goal',
        color: 'bg-green-500',
      },
    ],
    '2025-01-18': [
      {
        id: '4',
        title: 'Weekly Review',
        time: '15:00',
        type: 'journal',
        color: 'bg-pink-500',
      },
      {
        id: '5',
        title: 'Client Call',
        time: '16:30',
        type: 'meeting',
        color: 'bg-blue-500',
        attendees: 3,
      },
    ],
    '2025-01-20': [
      {
        id: '6',
        title: 'Reading Time',
        time: '20:00',
        type: 'personal',
        color: 'bg-purple-500',
      },
    ],
  };

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

  const getEventKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDayEvents = (day: number) => {
    return events[getEventKey(day)] || [];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Smart Planning</h1>
                <p className="text-sm text-gray-500">Organize your growth journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    view === 'month'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    view === 'week'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Week
                </button>
              </div>
              
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mini Calendar Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
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
                    onClick={() => day && setSelectedDate(day)}
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

            {/* Today's Events */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Today's Events</h3>
              <div className="space-y-3">
                {getDayEvents(new Date().getDate()).length > 0 ? (
                  getDayEvents(new Date().getDate()).map(event => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No events today</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <p className="text-white/80 mt-1">Plan your growth journey</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {dayNames.map(day => (
                    <div key={day} className="text-center font-semibold text-gray-600 py-3">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-4">
                  {days.map((day, index) => {
                    const dayEvents = getDayEvents(day || 0);
                    return (
                      <div
                        key={index}
                        className={`
                          min-h-[120px] p-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                          ${!day ? 'invisible' : ''}
                          ${isToday(day || 0)
                             ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50'
                             : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-md'
                          }
                        `}
                        onClick={() => day && setSelectedDate(day)}
                      >
                        {day && (
                          <>
                            <div className={`
                              text-lg font-bold mb-2
                              ${isToday(day) ? 'text-purple-600' : 'text-gray-800'}
                            `}>
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map(event => (
                                <div
                                  key={event.id}
                                  className={`
                                    ${event.color} text-white text-xs px-2 py-1 rounded-lg font-medium
                                    flex items-center space-x-1 truncate
                                  `}
                                >
                                  <Clock className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{event.time} {event.title}</span>
                                </div>
                              ))}
                            {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500 font-medium">
                                  +{dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Events for {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getDayEvents(selectedDate).length > 0 ? (
                  getDayEvents(selectedDate).map(event => (
                    <div key={event.id} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-3">
                        <div className={`w-4 h-4 ${event.color} rounded-full mt-1 flex-shrink-0`}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{event.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.attendees && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No events scheduled for this date</p>
                    <button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto">
                      <Plus className="w-4 h-4" />
                      <span>Add Event</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}