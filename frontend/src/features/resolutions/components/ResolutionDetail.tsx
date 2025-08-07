import React, { useState } from 'react';
import { ChevronLeft, Target, Calendar as CalendarIcon, Plus } from 'lucide-react';
import type { Resolution, ResolutionLog } from '../types/resolutions.types';
import HeatmapCalendar from './HeatmapCalendar';
import TodayLogModal from './TodayLogModal';
import TodayProgressCard from './TodayProgressCard';

interface ResolutionDetailProps {
  selectedGoal: Resolution;
  goalLogs: ResolutionLog[];
  onBack: () => void;
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

export default function ResolutionDetail({ 
  selectedGoal, 
  goalLogs, 
  onBack,
  onAddLog,
  onUpdateLog,
  onDeleteLog
}: ResolutionDetailProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedHeatmapDate, setSelectedHeatmapDate] = useState<{
    date: Date;
    dateStr: string;
    score: number;
    notes?: string;
    hasLog: boolean;
  } | null>(null);
  const [showTodayModal, setShowTodayModal] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const todayLog = goalLogs.find(log => log.logDate === today);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedGoal.title}</h1>
                <p className="text-sm text-gray-500">Track your progress and consistency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedGoal.isActive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {selectedGoal.isActive ? 'Active' : 'Inactive'}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedGoal.isPublic 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {selectedGoal.isPublic ? 'Public' : 'Private'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Goal Details */}
        <div className="mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedGoal.title}</h2>
                {selectedGoal.description && (
                  <p className="text-gray-600 mb-4">{selectedGoal.description}</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Created {formatDate(selectedGoal.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Progress Card */}
        <TodayProgressCard
          todayLog={todayLog}
          resolutionTitle={selectedGoal.title}
          onAddProgress={() => setShowTodayModal(true)}
        />

        {/* Heatmap */}
        <HeatmapCalendar
          goalLogs={goalLogs}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          onDateSelect={setSelectedHeatmapDate}
          selectedHeatmapDate={selectedHeatmapDate}
          resolutionTitle={selectedGoal.title}
          onAddLog={onAddLog}
          onUpdateLog={onUpdateLog}
          onDeleteLog={onDeleteLog}
        />
      </div>

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
        resolutionTitle={selectedGoal.title}
        existingLog={todayLog}
      />
    </div>
  );
} 