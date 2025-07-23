import React from 'react';
import { ChevronLeft, Plus } from 'lucide-react';

interface DiaryHeaderProps {
  onBack?: () => void;
  onCreateNew: () => void;
  loading?: boolean;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({ onBack, onCreateNew, loading }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                disabled={loading}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Daily Journal</h1>
              <p className="text-sm text-gray-500">Reflect on your growth journey</p>
            </div>
          </div>
          
          <button
            onClick={onCreateNew}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryHeader;
