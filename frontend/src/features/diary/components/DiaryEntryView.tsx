import React from 'react';
import { Edit3, Save, Heart, Calendar as CalendarIcon, Star, Smile, Frown, Meh, Trash2 } from 'lucide-react';
import type { JournalEntry } from '../types/diary.types';

interface DiaryEntryViewProps {
  selectedEntry: JournalEntry;
  setSelectedEntry: React.Dispatch<React.SetStateAction<JournalEntry | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: () => void;
  onDelete: (dateStr: string) => void;
  onToggleFavorite: (entryId: string) => void;
  loading?: boolean;
  error?: string | null;
}

const DiaryEntryView: React.FC<DiaryEntryViewProps> = ({
  selectedEntry,
  setSelectedEntry,
  isEditing,
  setIsEditing,
  onUpdate,
  onDelete,
  onToggleFavorite,
  loading = false,
  error
}) => {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-4 h-4 text-green-500" />;
      case 'sad': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'bg-green-100 text-green-700 border-green-200';
      case 'sad': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this diary entry? This action cannot be undone.')) {
      onDelete(selectedEntry.date);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full border-2 ${getMoodColor(selectedEntry.mood)} flex items-center space-x-2`}>
            {getMoodIcon(selectedEntry.mood)}
            <span className="text-sm font-medium capitalize">{selectedEntry.mood}</span>
          </div>
          <button
            onClick={() => onToggleFavorite(selectedEntry.id)}
            disabled={loading}
            className={`p-2 rounded-xl transition-all duration-200 disabled:opacity-50 ${
              selectedEntry.isFavorite
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${selectedEntry.isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={selectedEntry.title}
              onChange={(e) => setSelectedEntry({ ...selectedEntry, title: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 disabled:opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedEntry.date}
              onChange={(e) => setSelectedEntry({ ...selectedEntry, date: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 disabled:opacity-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              value={selectedEntry.content}
              onChange={(e) => setSelectedEntry({ ...selectedEntry, content: e.target.value })}
              rows={12}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 resize-none disabled:opacity-50"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onUpdate}
              disabled={loading || !selectedEntry.title.trim() || !selectedEntry.content.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedEntry.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatSelectedDate(new Date(selectedEntry.date))}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Created {new Date(selectedEntry.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
                    <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedEntry.content}
            </div>
          </div>
          
          {selectedEntry.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEntry.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiaryEntryView;
