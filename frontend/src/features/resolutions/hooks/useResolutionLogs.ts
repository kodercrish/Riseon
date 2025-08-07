import { useState, useEffect } from 'react';
import resolutionService from '../../../api/resolutionService';
import type { ResolutionLog } from '../types/resolutions.types';

export function useResolutionLogs(username: string, title: string) {
  const [logs, setLogs] = useState<ResolutionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    if (!username || !title) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await resolutionService.getResolutionLogs(username, title);
      console.log('Raw backend response:', response);
      // Transform the backend response to match our frontend interface
      const transformedLogs = response.resolutionLogsData?.map((log: any) => ({
        logDate: log.logDate,
        followScore: log.followScore,
        notes: log.notes,
        createdAt: log.createdAt
      })) || [];
      console.log('Fetched logs:', transformedLogs);
      setLogs(transformedLogs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [username, title]);

  const addLog = async (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => {
    try {
      setError(null);
      await resolutionService.addResolutionLog(log);
      await fetchLogs(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add log');
      throw err;
    }
  };

  const updateLog = async (log: {
    title: string;
    logDate: string;
    followScore: number;
    notes?: string;
  }) => {
    try {
      setError(null);
      await resolutionService.updateResolutionLog(log);
      await fetchLogs(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update log');
      throw err;
    }
  };

  const deleteLog = async (title: string, logDate: string) => {
    try {
      setError(null);
      await resolutionService.deleteResolutionLog(title, logDate);
      await fetchLogs(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete log');
      throw err;
    }
  };

  return { 
    logs, 
    loading, 
    error,
    addLog, 
    updateLog, 
    deleteLog, 
    setLogs,
    refetch: fetchLogs,
    refetchLogs: () => {
      console.log('Refetching logs for:', username, title);
      fetchLogs();
    }
  };
} 