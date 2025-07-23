import React from 'react';
import { X, Save, Smile, Meh, Frown } from 'lucide-react';
import type { NewEntryData } from '../types/diary.types';

interface DiaryEntryFormProps {
  newEntry: NewEntryData;
  setNewEntry: React.Dispatch<React.SetStateAction<NewEntryData>>;
  onSave: () => void;
  onCancel: () => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  loading?: boolean;
  error?: string | null;
}

const DiaryEntryForm: React.FC<DiaryEntryFormProps> = ({
  newEntry,
  setNewEntry,
  onSave,
  onCancel,
  setSelectedDate,
  loading = false,
  error
}) => {
  const handleDateChange = (dateStr: string) => {
    const newDate = new Date(dateStr);
    setSelectedDate(newDate);
    setNewEntry({ ...newEntry, date: dateStr });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">New Journal Entry</h2>
        <button
          onClick={onCancel}
          disabled={loading}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={newEntry.title}
            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
            placeholder="Give your entry a meaningful title..."
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) => handleDateChange(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
          <div className="flex space-x-4">
            {[
              { mood: 'happy', icon: Smile, color: 'text-green-500', bg: 'bg-green-50 border-green-200' },
              { mood: 'neutral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200' },
              { mood: 'sad', icon: Frown, color: 'text-red-500', bg: 'bg-red-50 border-red-200' }
            ].map(({ mood, icon: Icon, color, bg }) => (
              <button
                key={mood}
                type="button"
                onClick={() => setNewEntry({ ...newEntry, mood: mood as any })}
                disabled={loading}
                className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  newEntry.mood === mood ? bg : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="capitalize text-sm font-medium">{mood}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your thoughts *</label>
          <textarea
            value={newEntry.content}
            onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
            placeholder="What's on your mind today? Reflect on your experiences, thoughts, and feelings..."
            rows={12}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={loading || !newEntry.title.trim() || !newEntry.content.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Entry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryForm;
