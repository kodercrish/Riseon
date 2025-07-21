import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalendar } from '../hooks/useCalendar';
import { useEventModal } from '../hooks/useEventModal';
import { CalendarHeader, CalendarSidebar, MainCalendar, SelectedDateEvents, EventDetailModal } from '../components';
import { planService } from '../../../api/planService';
import { getTodayKey, getDateKey } from '../utils/dateUtils';
import type { Event } from '../types';
import ROUTES from '../../../constants/urls';

const PlansCalendar = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
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
  } = useCalendar();

  const {
    selectedEvent,
    showEventModal,
    openEventModal,
    closeEventModal,
  } = useEventModal();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await planService.getAllPlans();
      setEvents(fetchedEvents);
    } catch (err) {
      setError('Failed to fetch plans');
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDayEvents = (day: number): Event[] => {
    const dateKey = getDateKey(currentDate, day);
    return events.filter(event => event.id.startsWith(dateKey));
  };

  const getTodayEvents = (): Event[] => {
    const todayKey = getTodayKey();
    return events.filter(event => event.id.startsWith(todayKey));
  };

  const handleBack = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleEventUpdate = () => {
    fetchPlans(); // Refresh events after update/add/delete
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = selectedDate ? getDayEvents(selectedDate) : [];
  const todayEvents = getTodayEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchPlans}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <CalendarHeader 
        view={view} 
        onViewChange={setView}
        onBack={handleBack}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Layout - Single Column */}
        <div className="lg:hidden">
          <MainCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            monthNames={monthNames}
            dayNames={dayNames}
            days={days}
            onNavigateMonth={navigateMonth}
            onSelectDate={setSelectedDate}
            isToday={isToday}
            getDayEvents={getDayEvents}
            onEventUpdate={handleEventUpdate}
            onEventClick={openEventModal}
          />
          
          {selectedDate && (
            <SelectedDateEvents
              selectedDate={selectedDate}
              currentDate={currentDate}
              monthNames={monthNames}
              events={selectedDateEvents}
              onEventClick={openEventModal}
            />
          )}
        </div>

        {/* Desktop Layout - Two Column with Sidebar */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          <CalendarSidebar
            currentDate={currentDate}
            selectedDate={selectedDate}
            monthNames={monthNames}
            dayNames={dayNames}
            days={days}
            todayEvents={todayEvents}
            onNavigateMonth={navigateMonth}
            onSelectDate={setSelectedDate}
            isToday={isToday}
            getDayEvents={getDayEvents}
            onEventClick={openEventModal}
          />
          
          <div className="lg:col-span-3">
            <MainCalendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              monthNames={monthNames}
              dayNames={dayNames}
              days={days}
              onNavigateMonth={navigateMonth}
              onSelectDate={setSelectedDate}
              isToday={isToday}
              getDayEvents={getDayEvents}
              onEventUpdate={handleEventUpdate}
              onEventClick={openEventModal}
            />
            
            {selectedDate && (
              <SelectedDateEvents
                selectedDate={selectedDate}
                currentDate={currentDate}
                monthNames={monthNames}
                events={selectedDateEvents}
                onEventClick={openEventModal}
              />
            )}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={showEventModal}
        onClose={closeEventModal}
        onUpdate={handleEventUpdate}
      />
    </div>
  );
};

export default PlansCalendar;
