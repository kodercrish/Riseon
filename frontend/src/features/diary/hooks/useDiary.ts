import { useState, useEffect, useCallback } from 'react';
import { diaryService } from '../../../api/diaryService';
import type { JournalEntry, NewEntryData, ApiDiaryEntry } from '../types/diary.types';

export const useDiary = () => {
  const [entries, setEntries] = useState<Map<string, JournalEntry>>(new Map());
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [newEntry, setNewEntry] = useState<NewEntryData>({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    tags: []
  });

  // Convert API response to JournalEntry
  const apiToJournalEntry = (apiEntry: ApiDiaryEntry, dateStr: string): JournalEntry => ({
    id: dateStr, // Use date as ID since backend uses date as unique identifier
    title: apiEntry.title,
    content: apiEntry.content,
    date: dateStr,
    mood: 'neutral', // Default mood since backend doesn't store mood yet
    tags: [], // Default empty tags since backend doesn't store tags yet
    isFavorite: false, // Default favorite status
    createdAt: new Date().toISOString()
  });

  // Convert JournalEntry to API format
  const journalEntryToApi = (entry: JournalEntry | NewEntryData): ApiDiaryEntry => ({
    title: entry.title,
    content: entry.content,
    diaryDate: entry.date
  });

  // Load diary entry for a specific date
  const loadDiaryEntry = useCallback(async (dateStr: string) => {
    // Check if we already have this entry cached
    if (entries.has(dateStr)) {
      return entries.get(dateStr)!;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await diaryService.getDiaryEntry(dateStr);
      
      if (response.title && response.content && response.diaryDate) {
        const journalEntry = apiToJournalEntry(
          {
            title: response.title,
            content: response.content,
            diaryDate: response.diaryDate
          },
          dateStr
        );
        
        // Cache the entry
        setEntries(prev => new Map(prev).set(dateStr, journalEntry));
        return journalEntry;
      }
      
      return null;
    } catch (err) {
      // If entry doesn't exist, that's not an error - just return null
      if (err instanceof Error && err.message.includes('not found')) {
        return null;
      }
      setError(err instanceof Error ? err.message : 'Failed to load diary entry');
      return null;
    } finally {
      setLoading(false);
    }
  }, [entries]);

  // Create new diary entry
  const handleCreateEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const apiEntry = journalEntryToApi(newEntry);
      const response = await diaryService.addDiaryEntry(apiEntry);

      if (response.title && response.content && response.diaryDate) {
        const journalEntry = apiToJournalEntry(
          {
            title: response.title,
            content: response.content,
            diaryDate: response.diaryDate
          },
          newEntry.date
        );

        // Update cache
        setEntries(prev => new Map(prev).set(newEntry.date, journalEntry));
        
        // Reset form
        setNewEntry({
          title: '',
          content: '',
          date: new Date().toISOString().split('T')[0],
          mood: 'neutral',
          tags: []
        });
        
        setIsCreating(false);
        setSelectedEntry(journalEntry);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create diary entry');
    } finally {
      setLoading(false);
    }
  };

  // Update existing diary entry
  const handleUpdateEntry = async () => {
    if (!selectedEntry || !selectedEntry.title.trim() || !selectedEntry.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const apiEntry = journalEntryToApi(selectedEntry);
      const response = await diaryService.updateDiaryEntry(apiEntry);

      if (response.title && response.content && response.diaryDate) {
        const updatedEntry = {
          ...selectedEntry,
          title: response.title,
          content: response.content,
          date: response.diaryDate
        };

        // Update cache
        setEntries(prev => new Map(prev).set(selectedEntry.date, updatedEntry));
        setSelectedEntry(updatedEntry);
        setIsEditing(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update diary entry');
    } finally {
      setLoading(false);
    }
  };

  // Delete diary entry
  const handleDeleteEntry = async (dateStr: string) => {
    try {
      setLoading(true);
      setError(null);

      await diaryService.deleteDiaryEntry(dateStr);
      
      // Remove from cache
      setEntries(prev => {
        const newEntries = new Map(prev);
        newEntries.delete(dateStr);
        return newEntries;
      });

      // Clear selected entry if it was the deleted one
      if (selectedEntry && selectedEntry.date === dateStr) {
        setSelectedEntry(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete diary entry');
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite (local only since backend doesn't support favorites yet)
  const toggleFavorite = (entryId: string) => {
    const entry = entries.get(entryId);
    if (entry) {
      const updatedEntry = { ...entry, isFavorite: !entry.isFavorite };
      setEntries(prev => new Map(prev).set(entryId, updatedEntry));
      
      if (selectedEntry && selectedEntry.id === entryId) {
        setSelectedEntry(updatedEntry);
      }
    }
  };

  // Handle date click
  const handleDateClick = async (day: number) => {
    const clickedDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day);
    setSelectedDate(clickedDate);
    
    const dateString = clickedDate.toISOString().split('T')[0];
    
    // Load entry for this date
    const entryForDate = await loadDiaryEntry(dateString);
    
    if (entryForDate) {
      setSelectedEntry(entryForDate);
      setIsCreating(false);
      setIsEditing(false);
    } else {
      setSelectedEntry(null);
      setIsCreating(false);
      setIsEditing(false);
    }
  };

  // Load entry for initially selected date
  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    loadDiaryEntry(dateString).then(entry => {
      setSelectedEntry(entry);
    });
  }, [selectedDate, loadDiaryEntry]);

  return {
    entries: Array.from(entries.values()),
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
  };
};
