export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date string (YYYY-MM-DD)
  mood: 'happy' | 'neutral' | 'sad';
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}

export interface NewEntryData {
  title: string;
  content: string;
  date: string; // ISO date string (YYYY-MM-DD)
  mood: 'happy' | 'neutral' | 'sad';
  tags: string[];
}

export interface DiaryProps {
  onBack?: () => void;
}

export interface ApiDiaryEntry {
  title: string;
  content: string;
  diaryDate: string;
}
