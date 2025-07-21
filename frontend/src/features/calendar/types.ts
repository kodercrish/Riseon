export interface Event {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'personal' | 'goal' | 'journal';
  color: string;
  description?: string;
}

export interface CalendarProps {
  onBack?: () => void;
}

export type ViewType = 'month' | 'week';
