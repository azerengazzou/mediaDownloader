import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Shield, Zap, Star } from 'lucide-react';
import { DownloadOption, DownloadResult } from '../../hooks/useDownloader';
import { AdBlock } from '../layout/AdBlock';
import { cn } from '../../lib/utils';

interface DownloadModalProps {
  result: DownloadResult;
  option: DownloadOption;
  onClose: () => void;
}

const SEO_TIPS: Record<string, { tips: string[]; keywords: string[] }> = {
  youtube: {
    tips: [
      'Download YouTube videos in 1080p, 4K, or MP3 format instantly.',
      'Save YouTube Shorts, playlists, and live streams offline.',
      'Convert YouTube to MP3 for music and podcasts — free and fast.',
    ],
    keywords: [
      'YouTube downloader HD', 'YouTube to MP3', 'YouTube Shorts downloader',
      'Save YouTube video offline', 'YouTube 4K downloader', 'YouTube playlist downloader',
    ],
  },
  tiktok: {
    tips: [
      'Download TikTok videos without watermark in HD quality.',
      'Save TikTok audio as MP3 for ringtones and music.',
      'Download TikTok slideshows and photo posts easily.',
    ],
    keywords: [
      'TikTok downloader no watermark', 'TikTok HD download', 'TikTok to MP3',
      'Save TikTok video', 'TikTok video saver', 'TikTok reels downloader',
    ],
  },
  instagram: {
    tips: [
      'Download Instagram Reels, Stories, and IGTV videos in HD.',
      'Save Instagram photos and carousel posts to your device.',
      'Download Instagram videos without logging in — 100% free.',
    ],
    keywords: [
      'Instagram Reels downloader', 'Instagram video download', 'Save Instagram story',
      'Instagram HD downloader', 'Instagram photo downloader', 'IGTV downloader',
    ],
  },
  facebook: {
    tips: [
      'Download Facebook videos in HD and SD quality.',
      'Save Facebook Reels and Watch videos offline.',
      'Download private and public Facebook videos easily.',
    ],
    keywords: [
      'Facebook video downloader HD', 'Facebook Reels download', 'Save Facebook video',
      'Facebook MP4 downloader', 'Facebook video saver', 'FB Watch downloader',
    ],
  },
  twitter: {
    tips: [
      'Download X (Twitter) videos and GIFs in best quality.',
      'Save Twitter video posts as MP4 instantly.',
      'Download Twitter Spaces audio recordings.',
    ],
    keywords: [
      'Twitter video downloader', 'X video download', 'Save Twitter GIF',
      'Twitter MP4 downloader', 'X.com video saver', 'Twitter HD download',
    ],
  },
};

export function DownloadModal({ result, option, onClose }: DownloadModalProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const platformSeo = SEO_TIPS[result.platform.id] || SEO_TIPS['youtube'];

  useEffect(() => {
    // Animate 0 → 42% over ~4s, then freeze until user clicks
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 42) {
          clearInterval(intervalRef.current!);
          return 42;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [option.url]);

  const handleStartDownload = () => {
    clearInterval(intervalRef.current!);
    setProgress(100);
    setPhase('ready');
    window.open(option.url, '_blank', 'noopener,noreferrer');
  };

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Downloading ${result.title}`}
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <img
              src={result.thumbnail}
              alt={result.title}
              className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
                {result.platform.name} · {option.type} · {option.quality}
              </p>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                {result.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Download className="w-4 h-4 text-brand-500 animate-bounce" />
              {phase === 'ready' ? 'Download ready!' : 'Preparing your download…'}
            </span>
            <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                phase === 'ready'
                  ? 'bg-green-500'
                  : 'bg-gradient-to-r from-brand-500 to-indigo-500'
              )}
              style={{
                width: `${progress}%`,
                transition: phase === 'ready' ? 'width 0.4s ease' : 'width 0.1s linear',
              }}
            />
          </div>

          {phase === 'loading' && progress < 42 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
              Securing your file — this takes a few seconds
            </p>
          )}
          {phase === 'loading' && progress >= 42 && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 text-center font-medium">
              ⚡ Your file is ready — click below to start
            </p>
          )}
          {phase === 'ready' && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center font-medium">
              ✓ Your download has started in a new tab
            </p>
          )}
        </div>

        {/* Ad slot — shown while user waits */}
        <div className="px-6 pb-4">
          <AdBlock format="rectangle" className="max-w-full h-[120px]" />
        </div>

        {/* SEO Content — rich, indexed, useful to user */}
        <div className="px-6 pb-6 space-y-4">

          {/* Trust badges */}
          <div className="flex items-center justify-around py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex flex-col items-center gap-1 text-center">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">100% Safe</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Fast Download</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Star className="w-5 h-5 text-brand-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">HD Quality</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Download className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Free Forever</span>
            </div>
          </div>

          {/* Platform tips — real content Google indexes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {result.platform.name} Download Tips
            </h3>
            <ul className="space-y-1.5">
              {platformSeo.tips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-brand-500 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Related searches — keyword-rich, visible, natural */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Related Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {platformSeo.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA — visible once frozen at 42%, triggers actual download */}
          {phase === 'loading' && progress >= 42 && (
            <button
              onClick={handleStartDownload}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-brand-500/30 animate-pulse"
            >
              <Download className="w-5 h-5" />
              ⚡ Start Download Now
            </button>
          )}

          {/* Fallback after auto-open */}
          {phase === 'ready' && (
            <a
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              ✓ Click here if download didn't start
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
