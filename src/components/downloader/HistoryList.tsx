import { Clock, Trash2, Video } from 'lucide-react';
import { HistoryItem } from '../../hooks/useHistory';
import { cn } from '../../lib/utils';
import React from 'react';
import { Platform } from '../../lib/platforms';

interface HistoryListProps {
  history: HistoryItem[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .6 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.6 3a4.6 4.6 0 0 1-4.6-4.6h-3.3v13.7a2.8 2.8 0 1 1-2-2.7V6a6.1 6.1 0 1 0 5.3 6V8.7A8 8 0 0 0 19.6 9V5.7A4.6 4.6 0 0 1 19.6 3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23.1 10.1 24v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.2h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z" />
  </svg>
);

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7.1 4H5.1l11.9 16z" />
  </svg>
);

export const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  twitter: TwitterXIcon,
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