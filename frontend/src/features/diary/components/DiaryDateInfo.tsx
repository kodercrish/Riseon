import React from 'react';
import { BookOpen, Smile, Frown, Meh, Loader2 } from 'lucide-react';
import type { JournalEntry } from '../types/diary.types';

interface DiaryDateInfoProps {
  selectedDate: Date;
  selectedEntry: JournalEntry | null;
  loading?: boolean;
}

const DiaryDateInfo: React.FC<DiaryDateInfoProps> = ({ 
  selectedDate, 
  selectedEntry, 
  loading = false 
}) => {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-4 h-4 text-green-500" />;
      case 'sad': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-2">Selected Date</h3>
      <p className="text-sm text-gray-600 mb-4">{formatSelectedDate(selectedDate)}</p>
      
      {loading ? (
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-purple-500 mx-auto mb-2 animate-spin" />
          <p className="text-sm text-gray-500">Loading entry...</p>
        </div>
      ) : selectedEntry ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {getMoodIcon(selectedEntry.mood)}
            <span className="text-sm font-medium text-gray-700">Entry exists</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2">{selectedEntry.title}</p>
        </div>
      ) : (
        <div className="text-center">
          <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No entry for this date</p>
        </div>
      )}
    </div>
  );
};

export default DiaryDateInfo;
