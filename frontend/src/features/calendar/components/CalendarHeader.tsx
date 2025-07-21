import { ChevronLeft } from 'lucide-react';
import type { ViewType } from '../types';

interface CalendarHeaderProps {
  view: ViewType;
  onBack?: () => void;
  onViewChange: (view: ViewType) => void;
}

export const CalendarHeader = ({ view, onBack, onViewChange }: CalendarHeaderProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Smart Planning</h1>
              <p className="text-xs sm:text-sm text-gray-500">Organize your growth journey</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* View Toggle - Hidden on small screens */}
            <div className="hidden sm:flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => onViewChange('month')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  view === 'month'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => onViewChange('week')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  view === 'week'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Week
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
