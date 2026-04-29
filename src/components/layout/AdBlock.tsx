import { cn } from '../../lib/utils';
import { useEffect, useRef } from 'react';

interface AdBlockProps {
  className?: string;
  format?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'fluid';
  slotId?: string;
}

const DEFAULT_ZONE = '234495';

export function AdBlock({ className, format = 'rectangle', slotId }: AdBlockProps) {
  const zone = slotId || DEFAULT_ZONE;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SCRIPT_SRC = 'https://quge5.com/88/tag.min.js';

    // Create a script element next to the ad container so the provider's
    // `document.currentScript` references the script and it can discover
    // and render the banner in the nearby DOM node.
    function insertScriptNearContainer(container: HTMLDivElement) {
      // Avoid inserting duplicate script nodes for the same container
      const markerAttr = 'data-monetag-injected';
      if (container.getAttribute(markerAttr) === '1') return;

      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.setAttribute('data-zone', zone);
      s.setAttribute('data-cfasync', 'false');

      // Append the script as a child of the container so the provider can
      // locate the ad slot relative to the script's position.
      container.appendChild(s);
      container.setAttribute(markerAttr, '1');
    }

    if (containerRef.current) {
      insertScriptNearContainer(containerRef.current);
    }
  }, [slotId]);

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

      {/* Monetag ad container — the provider script will look for elements with data-zone */}
      <div className="w-full flex items-center justify-center" ref={containerRef}>
        <div
          className="monetag-ad w-full h-full"
          data-zone={zone}
          data-format={format}
        />
      </div>
    </div>
  );
}
