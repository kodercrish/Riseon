import { useState } from 'react';
import { Calendar, Clock, FileText, Save } from 'lucide-react';
import { planService } from '../../../api/planService';
import type { AddPlanRequest } from '../../../api/planService';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedDate: string;
  dayNumber: number;
  monthName: string;
  year: number;
}

export const AddEventModal = ({
  isOpen,
  onClose,
  onSuccess,
  selectedDate,
  dayNumber,
  monthName,
  year,
}: AddEventModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    isAllDay: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const planData: AddPlanRequest = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: selectedDate,
        deadline: formData.isAllDay ? '' : formData.deadline,
      };

      await planService.addPlan(planData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        deadline: '',
        isAllDay: false,
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error adding plan:', error);
      setError('Failed to add event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      deadline: '',
      isAllDay: false,
    });
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Add New Event</h2>
              <p className="text-sm text-gray-500 mt-1">
                {monthName} {dayNumber}, {year}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Event Title *</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none text-sm"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allDay"
                    checked={formData.isAllDay}
                    onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="allDay" className="text-sm text-gray-600">
                    All day event
                  </label>
                </div>
                {!formData.isAllDay && (
                  <input
                    type="time"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none text-sm"
                  />
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4" />
                <span>Description</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-purple-500 outline-none resize-none text-sm"
                rows={3}
                placeholder="Enter event description (optional)"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Adding...' : 'Add Event'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
