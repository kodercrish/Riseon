import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface DiaryWelcomeProps {
  selectedDate: Date;
  onCreateNew: () => void;
  loading?: boolean;
}

const DiaryWelcome: React.FC<DiaryWelcomeProps> = ({ 
  selectedDate, 
  onCreateNew, 
  loading = false 
}) => {
  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        No Entry for {formatSelectedDate(selectedDate)}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        You haven't written anything for this date yet. Start documenting your thoughts and experiences for this day.
      </p>
      
      <button
        onClick={onCreateNew}
        disabled={loading}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-5 h-5" />
        <span>{loading ? 'Loading...' : 'Write Entry for This Date'}</span>
      </button>
    </div>
  );
};

export default DiaryWelcome;
