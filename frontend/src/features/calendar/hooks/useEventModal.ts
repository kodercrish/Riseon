import { useState } from 'react';
import type { Event } from '../types';

export const useEventModal = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  return {
    selectedEvent,
    showEventModal,
    openEventModal,
    closeEventModal,
  };
};
