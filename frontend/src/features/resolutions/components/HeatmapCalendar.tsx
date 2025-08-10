import { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import type { ResolutionLog } from '../types/resolutions.types';
import TodayLogModal from './TodayLogModal';

interface HeatmapCalendarProps {
  goalLogs: ResolutionLog[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  onDateSelect: (date: {
    date: Date;
    dateStr: string;
    score: number;
    notes?: string;
    hasLog: boolean;
  } | null) => void;
  selectedHeatmapDate: {
    date: Date;
    dateStr: string;
    score: number;
    notes?: string;
    hasLog: boolean;
  } | null;
  resolutionTitle: string;
  onAddLog?: (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => void;
  onUpdateLog?: (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => void;
  onDeleteLog?: (title: string, logDate: string) => void;
}

export default function HeatmapCalendar({
  goalLogs,
  selectedYear,
  onYearChange,
  onDateSelect,
  selectedHeatmapDate,
  resolutionTitle,
  onAddLog,
  onUpdateLog,
  onDeleteLog
}: HeatmapCalendarProps) {
  const [showTodayModal, setShowTodayModal] = useState(false);
  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
  const todayLog = goalLogs.find(log => log.logDate === today);
  
  console.log('Heatmap goalLogs:', goalLogs);
  console.log('Today:', today);
  console.log('Today log:', todayLog);
  const getScoreColor = (score: number) => {
    if (score === 0) return 'bg-gray-100';
    if (score <= 2) return 'bg-green-100';
    if (score <= 4) return 'bg-green-200';
    if (score <= 6) return 'bg-green-300';
    if (score <= 8) return 'bg-green-400';
    return 'bg-green-500';
  };

  // Get available years based on goal creation date
  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const startDate = new Date(selectedYear, 0, 1); // January 1st of selected year
  const endDate = new Date(selectedYear, 11, 31); // December 31st of selected year
  const weeks = [];
  
  let currentDate = new Date(startDate);
  // Start from the beginning of the week
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());
  
  while (currentDate <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const log = goalLogs.find(log => log.logDate === dateStr);
      
      if (log) {
        console.log('Found log for date:', dateStr, 'with score:', log.followScore);
      }
      
      week.push({
        date: new Date(currentDate),
        dateStr,
        score: log?.followScore || 0,
        hasLog: !!log,
        notes: log?.notes
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Progress Heatmap</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
            >
              {getAvailableYears().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Less</span>
              <div className="flex space-x-1">
                {[0, 2, 4, 6, 8, 10].map(score => (
                  <div
                    key={score}
                    className={`w-3 h-3 rounded-sm ${getScoreColor(score)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col space-y-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}-${day.dateStr}`}
                    onClick={() => onDateSelect(day)}
                    className={`w-4 h-4 rounded-sm border border-gray-200 ${
                      day.hasLog ? getScoreColor(day.score) : 'bg-gray-50'
                    } hover:ring-2 hover:ring-purple-300 transition-all duration-200 cursor-pointer relative group`}
                    title={`${day.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}: ${
                      day.hasLog ? `Score ${day.score}/10` : 'No entry'
                    }${day.notes ? ` - ${day.notes}` : ''}`}
                  >
                    {/* Enhanced tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      <div className="font-medium">
                        {day.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-gray-300">
                        {day.hasLog ? `Score: ${day.score}/10` : 'No entry'}
                      </div>
                      {day.notes && (
                        <div className="text-gray-300 mt-1 max-w-xs truncate">
                          {day.notes}
                        </div>
                      )}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {goalLogs.filter(log => new Date(log.logDate).getFullYear() === selectedYear).length}
            </div>
            <div className="text-sm text-gray-600">Entries in {selectedYear}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {(() => {
                const yearLogs = goalLogs.filter(log => new Date(log.logDate).getFullYear() === selectedYear);
                return yearLogs.length > 0 ? Math.round(yearLogs.reduce((sum, log) => sum + log.followScore, 0) / yearLogs.length) : 0;
              })()}
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {(() => {
                const yearLogs = goalLogs.filter(log => new Date(log.logDate).getFullYear() === selectedYear);
                const daysInYear = new Date(selectedYear, 11, 31).getDate() === 31 ? 365 : 366;
                return Math.round((yearLogs.length / daysInYear) * 100);
              })()}%
            </div>
            <div className="text-sm text-gray-600">Consistency</div>
          </div>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedHeatmapDate && (
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {selectedHeatmapDate.date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          
          {selectedHeatmapDate.hasLog ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Score:</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded ${getScoreColor(selectedHeatmapDate.score)}`}></div>
                    <span className="text-lg font-bold text-gray-800">{selectedHeatmapDate.score}/10</span>
                  </div>
                </div>
              </div>
              
              {selectedHeatmapDate.notes && (
                <div>
                  <span className="text-sm font-medium text-gray-600 block mb-2">Notes:</span>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700">{selectedHeatmapDate.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No entry recorded for this date</p>
              {selectedHeatmapDate.dateStr === today ? (
                <button 
                  onClick={() => setShowTodayModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Entry for Today</span>
                </button>
              ) : (
                <p className="text-sm text-gray-400">You can only add entries for today</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Today's Log Modal */}
      <TodayLogModal
        isOpen={showTodayModal}
        onClose={() => setShowTodayModal(false)}
        onSubmit={(log) => {
          if (todayLog) {
            onUpdateLog?.(log);
          } else {
            onAddLog?.(log);
          }
        }}
        onDelete={onDeleteLog}
        resolutionTitle={resolutionTitle}
        existingLog={todayLog}
      />
    </div>
  );
} 