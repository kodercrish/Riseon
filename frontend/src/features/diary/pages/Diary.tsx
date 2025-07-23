import React from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../constants/urls';
import type { DiaryProps } from '../types/diary.types';
import { useDiary } from '../hooks/useDiary';
import DiaryHeader from '../components/DiaryHeader';
import DiaryCalendar from '../components/DiaryCalendar';
import DiaryDateInfo from '../components/DiaryDateInfo';
import DiaryEntryForm from '../components/DiaryEntryForm';
import DiaryEntryView from '../components/DiaryEntryView';
import DiaryWelcome from '../components/DiaryWelcome';

const Diary: React.FC<DiaryProps> = ({ onBack }) => {
  const navigate = useNavigate();
  
  const {
    entries,
    selectedEntry,
    setSelectedEntry,
    isEditing,
    setIsEditing,
    isCreating,
    setIsCreating,
    selectedDate,
    setSelectedDate,
    currentCalendarDate,
    setCurrentCalendarDate,
    newEntry,
    setNewEntry,
    loading,
    error,
    setError,
    handleCreateEntry,
    handleUpdateEntry,
    handleDeleteEntry,
    toggleFavorite,
    handleDateClick
  } = useDiary();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentCalendarDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const handleCreateNew = () => {
    setError(null);
    setNewEntry({
      title: '',
      content: '',
      date: selectedDate.toISOString().split('T')[0],
      mood: 'neutral',
      tags: []
    });
    setIsCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleSaveCreate = async () => {
    await handleCreateEntry();
  };

  const handleSaveUpdate = async () => {
    await handleUpdateEntry();
  };

  const handleDelete = async (dateStr: string) => {
    await handleDeleteEntry(dateStr);
  };

  // Create entries map for calendar
  const entriesMap = new Map(
    entries.map(entry => [entry.date, true])
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <DiaryHeader 
        onBack={handleBack} 
        onCreateNew={handleCreateNew}
        loading={loading}
      />
      
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Calendar and Date Info */}
          <div className="lg:col-span-1">
            <DiaryCalendar
              currentCalendarDate={currentCalendarDate}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              onNavigateMonth={navigateMonth}
              loading={loading}
              entriesMap={entriesMap}
            />
            <DiaryDateInfo
              selectedDate={selectedDate}
              selectedEntry={selectedEntry}
              loading={loading}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {isCreating ? (
              <DiaryEntryForm
                newEntry={newEntry}
                setNewEntry={setNewEntry}
                onSave={handleSaveCreate}
                onCancel={handleCancelCreate}
                setSelectedDate={setSelectedDate}
                loading={loading}
                error={error}
              />
            ) : selectedEntry ? (
              <DiaryEntryView
                selectedEntry={selectedEntry}
                setSelectedEntry={setSelectedEntry}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onUpdate={handleSaveUpdate}
                onDelete={handleDelete}
                onToggleFavorite={toggleFavorite}
                loading={loading}
                error={error}
              />
            ) : (
              <DiaryWelcome
                selectedDate={selectedDate}
                onCreateNew={handleCreateNew}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
