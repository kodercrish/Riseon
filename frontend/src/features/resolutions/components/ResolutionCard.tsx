import React from 'react';
import { Target, Edit3, Trash2, Eye, EyeOff, Clock } from 'lucide-react';
import type { Resolution } from '../types/resolutions.types';

interface ResolutionCardProps {
  goal: Resolution;
  onGoalClick: (goal: Resolution) => void;
  onEdit: (goal: Resolution) => void;
  onDelete: (goalId: string) => void;
}

export default function ResolutionCard({ 
  goal, 
  onGoalClick, 
  onEdit, 
  onDelete 
}: ResolutionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div
      className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:scale-[1.02] cursor-pointer"
      onClick={() => onGoalClick(goal)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${goal.isActive ? 'bg-green-400' : 'bg-gray-300'}`}></div>
          {goal.isPublic ? (
            <Eye className="w-4 h-4 text-blue-500" />
          ) : (
            <EyeOff className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
        {goal.title}
      </h3>
      
      {goal.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {goal.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Created {formatDate(goal.createdAt)}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(goal);
            }}
            className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </button>
                      <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(goal.title);
              }}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
} 