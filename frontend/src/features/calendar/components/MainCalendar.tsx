import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Event } from '../types';
import { CalendarDay } from './CalendarDay';
import { AddEventModal } from './AddEventModal';
import { useAddEventModal } from '../hooks/useAddEventModal';
import { formatDateForAPI } from '../utils/dateUtils';

interface MainCalendarProps {
  currentDate: Date;
  selectedDate: number | null;
  monthNames: string[];
  dayNames: string[];
  days: (number | null)[];
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onSelectDate: (day: number) => void;
  isToday: (day: number) => boolean;
  getDayEvents: (day: number) => Event[];
  onEventUpdate?: () => void;
  onEventClick?: (event: Event) => void;
}

export const MainCalendar = ({
  currentDate,
  selectedDate,
  monthNames,
  dayNames,
  days,
  onNavigateMonth,
  onSelectDate,
  isToday,
  getDayEvents,
  onEventUpdate,
  onEventClick,
}: MainCalendarProps) => {
  const { showAddModal, selectedDayForAdd, openAddModal, closeAddModal } = useAddEventModal();

  const handleAddEventSuccess = () => {
    closeAddModal();
    if (onEventUpdate) {
      onEventUpdate();
    }
  };

  const getSelectedDateForAdd = () => {
    if (!selectedDayForAdd) return '';
    return formatDateForAPI(currentDate.getFullYear(), currentDate.getMonth(), selectedDayForAdd);
  };

  return (
    <>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p className="text-white/80 mt-1 text-sm sm:text-base">Plan your growth journey</p>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => onNavigateMonth('prev')}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => onNavigateMonth('next')}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-3 sm:p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-2 sm:mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2 sm:py-3 text-sm sm:text-base">
                <span className="sm:hidden">{day.charAt(0)}</span>
                <span className="hidden sm:inline">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {days.map((day, index) => (
              <div key={index} className="min-h-[80px] sm:min-h-[120px]">
                <CalendarDay
                  day={day}
                  isToday={isToday(day || 0)}
                  isSelected={selectedDate === day}
                  events={getDayEvents(day || 0)}
                  onDayClick={onSelectDate}
                  onAddEvent={openAddModal}
                  onEventClick={onEventClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && selectedDayForAdd && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={closeAddModal}
          onSuccess={handleAddEventSuccess}
          selectedDate={getSelectedDateForAdd()}
          dayNumber={selectedDayForAdd}
          monthName={monthNames[currentDate.getMonth()]}
          year={currentDate.getFullYear()}
        />
      )}
    </>
  );
};
