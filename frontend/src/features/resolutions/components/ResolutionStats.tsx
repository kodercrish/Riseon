import React from 'react';
import { Target, TrendingUp, Eye, Award } from 'lucide-react';
import type { Resolution } from '../types/resolutions.types';

interface ResolutionStatsProps {
  goals: Resolution[];
}

export default function ResolutionStats({ goals }: ResolutionStatsProps) {
  const activeGoals = goals.filter(g => g.isActive).length;
  const publicGoals = goals.filter(g => g.isPublic).length;
  const thisMonthGoals = goals.filter(g => 
    new Date(g.createdAt).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Goals</p>
            <p className="text-3xl font-bold text-gray-800">{goals.length}</p>
          </div>
          <Target className="w-8 h-8 text-purple-500" />
        </div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Active Goals</p>
            <p className="text-3xl font-bold text-gray-800">{activeGoals}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Public Goals</p>
            <p className="text-3xl font-bold text-gray-800">{publicGoals}</p>
          </div>
          <Eye className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">This Month</p>
            <p className="text-3xl font-bold text-gray-800">{thisMonthGoals}</p>
          </div>
          <Award className="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>
  );
} 