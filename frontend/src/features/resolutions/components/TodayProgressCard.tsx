import { Star, Calendar } from 'lucide-react';
import type { ResolutionLog } from '../types/resolutions.types';

interface TodayProgressCardProps {
  todayLog: ResolutionLog | undefined;
  resolutionTitle: string;
  onAddProgress: () => void;
}

export default function TodayProgressCard({ 
  todayLog, 
  // resolutionTitle, 
  onAddProgress 
}: TodayProgressCardProps) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getScoreColor = (score: number) => {
    if (score === 0) return 'text-gray-400';
    if (score <= 3) return 'text-red-500';
    if (score <= 6) return 'text-yellow-500';
    if (score <= 8) return 'text-green-500';
    return 'text-emerald-500';
  };

  const getScoreText = (score: number) => {
    if (score === 0) return 'No progress';
    if (score <= 3) return 'Poor progress';
    if (score <= 6) return 'Good progress';
    if (score <= 8) return 'Great progress';
    return 'Excellent progress';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-bold text-gray-800">Today's Progress</h3>
        </div>
        <div className="text-sm text-gray-500">{today}</div>
      </div>

      {todayLog ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Score:</span>
            <div className="flex items-center space-x-2">
              <Star className={`w-5 h-5 ${getScoreColor(todayLog.followScore)}`} />
              <span className={`text-lg font-bold ${getScoreColor(todayLog.followScore)}`}>
                {todayLog.followScore}/10
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {getScoreText(todayLog.followScore)}
          </div>
          
          {todayLog.notes && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm">{todayLog.notes}</p>
            </div>
          )}
          
          <button
            onClick={onAddProgress}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Update Progress
          </button>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">No progress recorded for today</p>
          <button
            onClick={onAddProgress}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Add Today's Progress
          </button>
        </div>
      )}
    </div>
  );
} 