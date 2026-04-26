import { cn } from '../../lib/utils';

interface AdBlockProps {
  className?: string;
  format?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'fluid';
  slotId?: string;
}

export function AdBlock({ className, format = 'rectangle', slotId }: AdBlockProps) {
  // Placeholder for Google AdSense
  // In production, this would be the actual ins tag
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden relative",
        {
          'w-full h-[250px] max-w-[300px] mx-auto': format === 'rectangle',
          'w-full h-[90px] max-w-[728px] mx-auto': format === 'leaderboard',
          'w-[160px] h-[600px]': format === 'skyscraper',
          'w-full min-h-[100px]': format === 'fluid',
        },
        className
      )}
    >
      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-gray-200/50 dark:bg-gray-700/50 rounded text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
        Advertisement
      </div>
      <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
        Ad Space {slotId ? `(${slotId})` : ''}
      </div>
    </div>
  );
}
