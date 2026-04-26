import { Clock, Trash2, Youtube, Instagram, Facebook, Twitter, Video, Music2 } from 'lucide-react';
import { HistoryItem } from '../../hooks/useHistory';
import { cn } from '../../lib/utils';
import React from 'react';
import { Platform } from '../../lib/platforms';

interface HistoryListProps {
  history: HistoryItem[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

export const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  youtube: Youtube,
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  unknown: Video,
};

export function HistoryList({ history, onClear, onRemove }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Clock className="w-5 h-5 text-brand-500" />
          <h3 className="text-xl font-heading font-semibold">Recent Downloads</h3>
        </div>

        <button
          onClick={onClear}
          className="text-sm font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item) => {
          // ✅ FIX: use platform id, NOT iconKey
          const PlatformIcon =
            PLATFORM_ICONS[item.result.platform.id] ?? Video;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-700 transition-colors group"
            >
              <div className="relative w-24 h-16 flex-shrink-0 bg-black rounded-lg overflow-hidden">
                <img
                  src={item.result.thumbnail}
                  alt={item.result.title}
                  className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute top-1 left-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded p-0.5">
                  <PlatformIcon
                    className={cn(
                      'w-3 h-3',
                      item.result.platform.color
                    )}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.result.title}
                </h4>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                  <span>
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>{item.result.platform.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}