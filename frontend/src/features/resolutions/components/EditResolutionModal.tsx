import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Resolution } from '../types/resolutions.types';

interface EditResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resolution: {
    title: string;
    description?: string;
    isPublic: boolean;
  }) => void;
  goal: Resolution | null;
}

export default function EditResolutionModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  goal
}: EditResolutionModalProps) {
  const [editingGoal, setEditingGoal] = useState<Resolution | null>(null);

  useEffect(() => {
    if (goal) {
      setEditingGoal(goal);
    }
  }, [goal]);

  const handleSubmit = () => {
    if (editingGoal && editingGoal.title.trim()) {
      onSubmit({
        title: editingGoal.title,
        description: editingGoal.description,
        isPublic: editingGoal.isPublic
      });
      onClose();
    }
  };

  if (!isOpen || !editingGoal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Goal</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title *</label>
            <input
              type="text"
              value={editingGoal.title}
              onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={editingGoal.description || ''}
              onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 resize-none"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={editingGoal.isPublic}
                onChange={(e) => setEditingGoal({ ...editingGoal, isPublic: e.target.checked })}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Public goal</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={editingGoal.isActive}
                onChange={(e) => setEditingGoal({ ...editingGoal, isActive: e.target.checked })}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Active goal</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 