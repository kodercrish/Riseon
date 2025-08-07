import { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints';

export function useUsername() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(ENDPOINTS.AUTH.FETCH, {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || data.user?.username);
        }
      } catch (error) {
        console.error('Failed to fetch username:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  return { username, loading };
}
