import { useState, useEffect } from 'react';
import { X, Save, Star } from 'lucide-react';
import type { ResolutionLog } from '../types/resolutions.types';

interface TodayLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => void;
  onDelete?: (title: string, logDate: string) => void;
  resolutionTitle: string;
  existingLog?: ResolutionLog | null;
}

export default function TodayLogModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  onDelete,
  resolutionTitle,
  existingLog
}: TodayLogModalProps) {
  const [logData, setLogData] = useState({
    followScore: 1,
    notes: ''
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (existingLog) {
      setLogData({
        followScore: existingLog.followScore,
        notes: existingLog.notes || ''
      });
    } else {
      setLogData({
        followScore: 1,
        notes: ''
      });
    }
  }, [existingLog]);

  const handleSubmit = () => {
    console.log('Submitting log with date:', today);
    onSubmit({
      title: resolutionTitle,
      logDate: today,
      followScore: logData.followScore,
      notes: logData.notes.trim() || undefined
    });
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && existingLog) {
      onDelete(resolutionTitle, today);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {existingLog ? 'Edit Today\'s Progress' : 'Add Today\'s Progress'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resolution: {resolutionTitle}
            </label>
            <p className="text-sm text-gray-500">
              Date: {new Date(today).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How well did you follow your resolution today? (1-10)
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  onClick={() => setLogData({ ...logData, followScore: score })}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    logData.followScore === score
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Star className={`w-4 h-4 ${logData.followScore > 0 ? 'text-yellow-500' : 'text-gray-300'}`} />
              <span className="text-sm text-gray-600">
                {logData.followScore <= 3 && 'Poor progress'}
                {logData.followScore > 3 && logData.followScore <= 6 && 'Good progress'}
                {logData.followScore > 6 && logData.followScore <= 8 && 'Great progress'}
                {logData.followScore > 8 && 'Excellent progress'}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={logData.notes}
              onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
              placeholder="How did it go? Any challenges or achievements?"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            {existingLog && onDelete && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{existingLog ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 