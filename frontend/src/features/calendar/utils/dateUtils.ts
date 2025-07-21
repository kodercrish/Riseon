export const formatDateForAPI = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const extractDateFromEventId = (eventId: string): string => {
  return eventId.split('-').slice(0, 3).join('-');
};

export const getTodayKey = (): string => {
  const today = new Date();
  return formatDateForAPI(today.getFullYear(), today.getMonth(), today.getDate());
};

export const getDateKey = (date: Date, day: number): string => {
  return formatDateForAPI(date.getFullYear(), date.getMonth(), day);
};
