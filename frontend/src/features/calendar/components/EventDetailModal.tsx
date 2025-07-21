import { useState } from 'react';
import { Clock, FileText, Edit2, Save, X, Trash2 } from 'lucide-react';
import type { Event } from '../types';
import { planService } from '../../../api/planService';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export const EventDetailModal = ({
  event,
  isOpen,
  onClose,
  onUpdate,
}: EventDetailModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    date: '',
    deadline: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !event) return null;

  const handleEditClick = () => {
    setIsEditing(true);
    const eventDate = event.id.split('-').slice(0, 3).join('-');
    let deadline = '';
    if (event.time && event.time !== '23:59') {
      deadline = event.time;
    }
    
    setEditForm({
      title: event.title,
      description: event.description || '',
      date: eventDate,
      deadline: deadline,
    });
  };

  const handleSaveEdit = async () => {
    if (!event) return;
    
    try {
      setIsUpdating(true);
      
      const updateRequest = {
        title: editForm.title,
        description: editForm.description.trim(),
        date: editForm.date,
        deadline: editForm.deadline,
      };

      await planService.updatePlan(updateRequest);
      setIsEditing(false);
      onClose();
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      title: '',
      description: '',
      date: '',
      deadline: '',
    });
  };

  const handleDeleteSuccess = () => {
    setShowDeleteConfirm(false);
    onClose();
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 ${event.color} rounded-full mt-1 flex-shrink-0`}></div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{event.title}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'personal' ? 'bg-purple-100 text-purple-800' :
                    event.type === 'goal' ? 'bg-green-100 text-green-800' :
                    'bg-pink-100 text-pink-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl font-bold ml-2 flex-shrink-0"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Time */}
              <div className="flex items-start space-x-3 text-gray-600">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-1">
                    <input
                      type="time"
                      value={editForm.deadline}
                      onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}
                      className="border border-gray-300 rounded-lg px-2 py-1 focus:border-purple-500 outline-none text-sm"
                    />
                    <label className="flex items-center space-x-1 text-sm">
                      <input
                        type="checkbox"
                        checked={editForm.deadline === ''}
                        onChange={(e) => setEditForm({ ...editForm, deadline: e.target.checked ? '' : '09:00' })}
                        className="rounded"
                      />
                      <span>All day</span>
                    </label>
                  </div>
                ) : (
                  <span className="font-medium text-sm sm:text-base">Time: {event.time === '23:59' ? 'All day' : event.time}</span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Description:</span>
                </div>
                {isEditing ? (
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-3 ml-0 sm:ml-8 focus:border-purple-500 outline-none resize-none text-sm"
                    rows={3}
                    placeholder="Event description"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg ml-0 sm:ml-8 text-sm">
                    {event.description || 'No description'}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-sm"
                    disabled={isUpdating}
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                    disabled={isUpdating}
                  >
                    <Save className="w-4 h-4" />
                    <span>{isUpdating ? 'Saving...' : 'Save'}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        event={event}
        onConfirm={handleDeleteSuccess}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};
