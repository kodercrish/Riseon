import { useState } from 'react';

export const useAddEventModal = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDayForAdd, setSelectedDayForAdd] = useState<number | null>(null);

  const openAddModal = (day: number) => {
    setSelectedDayForAdd(day);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setSelectedDayForAdd(null);
  };

  return {
    showAddModal,
    selectedDayForAdd,
    openAddModal,
    closeAddModal,
  };
};
