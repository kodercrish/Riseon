import { useState, useEffect } from 'react';

export const useUsername = () => {
  const [username, setUsername] = useState<string>('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsername = () => {
      try {
        const storedUsername = localStorage.getItem('username') || 'User';
        setUsername(storedUsername);
      } catch (error) {
        console.error('Error loading username from localStorage:', error);
        setUsername('User');
      } finally {
        setLoading(false);
      }
    };

    loadUsername();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'username') {
        loadUsername();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { username, loading };
};
