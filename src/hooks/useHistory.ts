import { useState, useEffect } from 'react';
import { DownloadResult } from './useDownloader';

export interface HistoryItem {
  id: string;
  result: DownloadResult;
  timestamp: number;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('mediagrabber_history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse history', err);
      }
    }
  }, []);

  const addToHistory = (result: DownloadResult) => {
    setHistory(prev => {
      // Remove if it already exists (by ID or URL, let's use ID for simplicity)
      const filtered = prev.filter(item => item.result.id !== result.id);
      
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        result,
        timestamp: Date.now()
      };
      
      const newHistory = [newItem, ...filtered].slice(0, 10); // Keep last 10
      localStorage.setItem('mediagrabber_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mediagrabber_history');
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.id !== id);
      localStorage.setItem('mediagrabber_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return { history, addToHistory, clearHistory, removeFromHistory };
}
