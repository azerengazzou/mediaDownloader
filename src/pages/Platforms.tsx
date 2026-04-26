import { SEO } from '../components/SEO';
import { platforms } from '../lib/platforms';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PLATFORM_ICONS } from '../components/downloader/HistoryList';

export function Platforms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO
        title="Supported Platforms"
        description="Download videos from YouTube, TikTok, Instagram, Facebook, and Twitter. High quality MP4 and MP3 downloads supported."
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
          Supported Platforms
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          MediaGrabber supports downloading videos, shorts, reels, and audio from all major social media platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platforms.map((platform) => {
          // ✅ FIX: resolve icon from safe map
          const Icon =
            PLATFORM_ICONS[platform.id] ?? PLATFORM_ICONS.unknown;

          return (
            <div
              key={platform.id}
              id={platform.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-700">
                <Icon className={cn('w-8 h-8', platform.color)} />
              </div>

              <h2 className="text-2xl font-bold font-heading mb-3 text-gray-900 dark:text-white">
                {platform.name} Downloader
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Download high-quality {platform.name} videos, shorts, and audio directly to your device. Simply paste the link and choose your preferred format.
              </p>

              <Link
                to={`/?url=https://${platform.id}.com`}
                className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
              >
                Try it now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}