import { useState, useEffect } from 'react';
import { useUsername } from '../../../hooks/useUsername';

interface WelcomeData {
  fullName: string;
  streak: number;
  activeGoals: number;
  completionRate: number;
}

export const useWelcomeData = () => {
  const { username, loading: usernameLoading } = useUsername();
  
  const [welcomeData, setWelcomeData] = useState<WelcomeData>({
    fullName: '',
    streak: 7,
    activeGoals: 3,
    completionRate: 85
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      try {
        // Hardcode the other values for now
        const storedStreak = 7;
        const storedGoals = 3;
        const storedCompletion = 85;

        setWelcomeData({
          fullName: username ?? 'User', // Ensure fullName is always a string
          streak: storedStreak,
          activeGoals: storedGoals,
          completionRate: storedCompletion
        });
      } catch (error) {
        console.error('Error loading user data:', error);
        setWelcomeData(prev => ({ ...prev, fullName: username || 'User' }));
      } finally {
        setLoading(false);
      }
    };

    // Only load data when username is available (not loading)
    if (!usernameLoading) {
      loadUserData();
    }
  }, [username, usernameLoading]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return {
    ...welcomeData,
    loading: loading || usernameLoading, // Combined loading state
    greeting: getGreeting()
  };
};
