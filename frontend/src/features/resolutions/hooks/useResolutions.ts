import { useState, useEffect } from 'react';
import resolutionService from '../../../api/resolutionService';
import type { Resolution, ResolutionLog } from '../types/resolutions.types';

export function useResolutions() {
  const [goals, setGoals] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await resolutionService.getAllResolutions();
      // Transform the backend response to match our frontend interface
      const transformedGoals = response.resolutions?.map((resolution: any) => ({
        title: resolution.title,
        description: resolution.description,
        isPublic: resolution.isPublic,
        isActive: resolution.isActive,
        createdAt: resolution.createdAt
      })) || [];
      setGoals(transformedGoals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const addGoal = async (goal: {
    title: string;
    description?: string;
    isPublic: boolean;
  }) => {
    try {
      setError(null);
      await resolutionService.addResolution(goal);
      await fetchGoals(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add goal');
      throw err;
    }
  };

  const updateGoal = async (goal: {
    title: string;
    description?: string;
    isPublic: boolean;
  }) => {
    try {
      setError(null);
      await resolutionService.updateResolution(goal);
      await fetchGoals(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update goal');
      throw err;
    }
  };

  const deleteGoal = async (title: string) => {
    try {
      setError(null);
      await resolutionService.deleteResolution(title);
      await fetchGoals(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete goal');
      throw err;
    }
  };

  return { 
    goals, 
    loading, 
    error,
    addGoal, 
    updateGoal, 
    deleteGoal, 
    setGoals,
    refetch: fetchGoals
  };
}