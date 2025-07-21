import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { Event } from '../types';
import { planService } from '../../../api/planService';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  event: Event | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = ({
  isOpen,
  event,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !event) return null;

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      const eventDate = event.id.split('-').slice(0, 3).join('-');
      await planService.deletePlan(eventDate, event.title);
      onConfirm();
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm w-full">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-2">
            Delete Event
          </h3>
          
          <p className="text-gray-600 text-center mb-6 text-sm sm:text-base px-2">
            Are you sure you want to delete "<strong className="break-words">{event.title}</strong>"? This action cannot be undone.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 text-sm"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
