import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface CreateResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resolution: {
    title: string;
    description?: string;
    isPublic: boolean;
    isActive: boolean;
  }) => void;
}

export default function CreateResolutionModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: CreateResolutionModalProps) {
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    isPublic: false,
    isActive: true
  });

  const handleSubmit = () => {
    if (newGoal.title.trim()) {
      onSubmit(newGoal);
      setNewGoal({ title: '', description: '', isPublic: false, isActive: true });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Goal</h2>
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
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Enter your goal or resolution..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            placeholder="Describe your goal in detail..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 resize-none"
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-2">Visibility</span>
              <button
                onClick={() => setNewGoal({ ...newGoal, isPublic: !newGoal.isPublic })}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  newGoal.isPublic
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {newGoal.isPublic ? 'Make Private' : 'Make Public'}
              </button>
            </div>
          
            <div>
              <span className="text-sm font-medium text-gray-700 block mb-2">Status</span>
              <button
                onClick={() => setNewGoal({ ...newGoal, isActive: !newGoal.isActive })}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  newGoal.isActive
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {newGoal.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
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
            disabled={!newGoal.title.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>Create Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
} 