import { useEffect, useState } from 'react';

export function useAdBlockDetector(): boolean {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        // Fetch a URL that ad blockers reliably block (Google Ads script)
        await fetch(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          { method: 'HEAD', mode: 'no-cors', cache: 'no-store' }
        );
        // no-cors always returns opaque — if we get here, the request wasn't blocked
        if (!cancelled) setDetected(false);
      } catch {
        // Network error = blocked by ad blocker
        if (!cancelled) setDetected(true);
      }
    }

    // Also check via a bait DOM element (catches blockers that don't block network)
    const bait = document.createElement('div');
    bait.className = 'adsbox ad-placement pub_300x250 pub_300x250m';
    bait.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;';
    document.body.appendChild(bait);

    // Give CSS-based blockers time to hide it
    const timer = setTimeout(() => {
      const hidden =
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        window.getComputedStyle(bait).display === 'none' ||
        window.getComputedStyle(bait).visibility === 'hidden';

      document.body.removeChild(bait);

      if (hidden) {
        if (!cancelled) setDetected(true);
      } else {
        detect();
      }
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (document.body.contains(bait)) document.body.removeChild(bait);
    };
  }, []);

  return detected;
}
