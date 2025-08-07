import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Target } from 'lucide-react';
import { useResolutions } from '../hooks/useResolutions';
import { useResolutionLogs } from '../hooks/useResolutionLogs';
import ResolutionCard from '../components/ResolutionCard';
import ResolutionStats from '../components/ResolutionStats';
import CreateResolutionModal from '../components/CreateResolutionModal';
import EditResolutionModal from '../components/EditResolutionModal';
import ResolutionDetail from '../components/ResolutionDetail';
import type { Resolution } from '../types/resolutions.types';
import ROUTES from '../../../constants/urls';
import { useUsername } from '../../../hooks/useUsername';
import resolutionService from '../../../api/resolutionService';

export default function Resolutions() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedGoal, setSelectedGoal] = useState<Resolution | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Resolution | null>(null);

  const { goals, loading, error, addGoal, updateGoal, deleteGoal } = useResolutions();
  const { username } = useUsername();
  const { logs: goalLogs, refetchLogs } = useResolutionLogs(
    selectedGoal ? username || '' : '',
    selectedGoal?.title || ''
  );

  console.log('Current username:', username);
  console.log('Selected goal:', selectedGoal);
  console.log('Goal logs:', goalLogs);

  const handleGoalClick = (goal: Resolution) => {
    setSelectedGoal(goal);
    setCurrentView('detail');
  };

  const handleCreateGoal = async (goalData: {
    title: string;
    description?: string;
    isPublic: boolean;
    isActive: boolean;
  }) => {
    try {
      await addGoal({
        title: goalData.title,
        description: goalData.description,
        isPublic: goalData.isPublic
      });
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };

  const handleUpdateGoal = async (goalData: {
    title: string;
    description?: string;
    isPublic: boolean;
  }) => {
    try {
      await updateGoal(goalData);
    } catch (error) {
      console.error('Failed to update goal:', error);
    }
  };

  const handleDeleteGoal = async (goalTitle: string) => {
    try {
      await deleteGoal(goalTitle);
      if (selectedGoal && selectedGoal.title === goalTitle) {
        setCurrentView('list');
        setSelectedGoal(null);
      }
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  const handleEditGoal = (goal: Resolution) => {
    setEditingGoal(goal);
    setIsEditing(true);
  };

  const handleAddLog = async (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => {
    try {
      console.log('Adding log:', log);
      const result = await resolutionService.addResolutionLog(log);
      console.log('Log added successfully, result:', result);
      console.log('Refetching logs...');
      refetchLogs();
    } catch (error: any) {
      // If log already exists, try to update it instead
      if (error.message && error.message.includes('already exists')) {
        try {
          console.log('Log already exists, updating instead...');
          const updateResult = await resolutionService.updateResolutionLog(log);
          console.log('Log updated successfully, result:', updateResult);
          refetchLogs();
        } catch (updateError) {
          console.error('Failed to update log:', updateError);
        }
      } else {
        console.error('Failed to add log:', error);
        // Show user-friendly error message
        alert(`Failed to add log: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleUpdateLog = async (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => {
    try {
      await resolutionService.updateResolutionLog(log);
      refetchLogs();
    } catch (error: any) {
      console.error('Failed to update log:', error);
      alert(`Failed to update log: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteLog = async (title: string, logDate: string) => {
    try {
      await resolutionService.deleteResolutionLog(title, logDate);
      refetchLogs();
    } catch (error: any) {
      console.error('Failed to delete log:', error);
      alert(`Failed to delete log: ${error.message || 'Unknown error'}`);
    }
  };

  if (currentView === 'detail' && selectedGoal) {
    return (
      <ResolutionDetail
        selectedGoal={selectedGoal}
        goalLogs={goalLogs}
        onBack={() => setCurrentView('list')}
        onAddLog={handleAddLog}
        onUpdateLog={handleUpdateLog}
        onDeleteLog={handleDeleteLog}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Goal Tracker</h1>
                <p className="text-sm text-gray-500">Manage your resolutions and track progress</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Goal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCreating ? (
          <CreateResolutionModal
            isOpen={isCreating}
            onClose={() => setIsCreating(false)}
            onSubmit={handleCreateGoal}
          />
        ) : (
          <div>
            {/* Stats Overview */}
            <ResolutionStats goals={goals} />

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <ResolutionCard
                  key={goal.title}
                  goal={goal}
                  onGoalClick={handleGoalClick}
                  onEdit={handleEditGoal}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>

            {goals.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Goals Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start your journey by creating your first goal or resolution. Track your progress and build lasting habits.
                </p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Goal</span>
                </button>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading goals...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Goal Modal */}
        <EditResolutionModal
          isOpen={isEditing}
          onClose={() => {
            setIsEditing(false);
            setEditingGoal(null);
          }}
          onSubmit={handleUpdateGoal}
          goal={editingGoal}
        />
      </div>
    </div>
  );
} 