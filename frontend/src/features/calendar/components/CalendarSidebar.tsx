import { MiniCalendar } from './MiniCalendar';
import { TodayEvents } from './TodayEvents';
import type { Event } from '../types';

interface CalendarSidebarProps {
  currentDate: Date;
  selectedDate: number | null;
  monthNames: string[];
  dayNames: string[];
  days: (number | null)[];
  todayEvents: Event[];
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onSelectDate: (day: number) => void;
  isToday: (day: number) => boolean;
  getDayEvents: (day: number) => Event[];
  onEventClick?: (event: Event) => void;
}

export const CalendarSidebar = ({
  currentDate,
  selectedDate,
  monthNames,
  dayNames,
  days,
  todayEvents,
  onNavigateMonth,
  onSelectDate,
  isToday,
  getDayEvents,
  onEventClick,
}: CalendarSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <MiniCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        monthNames={monthNames}
        dayNames={dayNames}
        days={days}
        onNavigateMonth={onNavigateMonth}
        onSelectDate={onSelectDate}
        isToday={isToday}
        getDayEvents={getDayEvents}
      />
      <TodayEvents 
        events={todayEvents} 
        onEventClick={onEventClick}
      />
    </div>
  );
};
