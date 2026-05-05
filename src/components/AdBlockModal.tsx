import { ShieldOff, RefreshCw } from 'lucide-react';

export function AdBlockModal() {
  return null;
 /* return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="adblock-title"
      aria-describedby="adblock-desc"
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-500 to-indigo-500" />

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldOff className="w-8 h-8 text-red-500" />
          </div>

          <h2
            id="adblock-title"
            className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-3"
          >
            Ad Blocker Detected
          </h2>

          <p
            id="adblock-desc"
            className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
          >
            MediaGrabber is <strong className="text-gray-900 dark:text-white">100% free</strong> and
            supported entirely by ads. Please disable your ad blocker to continue using the site.
          </p>

          {/* Steps */}
          <ol className="text-left space-y-3 mb-8">
            {[
              'Click the ad blocker icon in your browser toolbar',
              'Select "Disable on this site" or "Pause protection"',
              'Reload the page',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>

          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            I've disabled it — Reload
          </button>

          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Thank you for supporting free tools ❤️
          </p>
        </div>
      </div>
    </div>
  );*/
}
