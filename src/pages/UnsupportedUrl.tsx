import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2, Search } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdsterraNativeBanner } from '../components/layout/AdBlock';
import { detectPlatform } from '../lib/platforms';
import { useAnalytics } from '../hooks/useAnalytics';

export function UnsupportedUrl() {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { trackError } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const detected = detectPlatform(url);
    if (!detected) {
      trackError('Second unsupported URL attempt');
      const failCount = parseInt(sessionStorage.getItem('failCount') || '1', 10) + 1;
      sessionStorage.setItem('failCount', String(failCount));
      if (failCount >= 2) {
        sessionStorage.removeItem('failCount');
        navigate('/download-ai-video-mp3');
      }
      return;
    }

    // Valid URL — go back home with it
    sessionStorage.removeItem('failCount');
    setIsLoading(true);
    navigate(`/?url=${encodeURIComponent(url)}`);
  };

  const supportedPlatforms = [
    { name: 'YouTube', example: 'youtube.com/watch?v=...', color: 'text-red-500' },
    { name: 'TikTok', example: 'tiktok.com/@user/video/...', color: 'text-gray-800 dark:text-white' },
    { name: 'Instagram', example: 'instagram.com/reel/...', color: 'text-pink-500' },
    { name: 'Facebook', example: 'facebook.com/.../videos/...', color: 'text-blue-600' },
    { name: 'Twitter / X', example: 'x.com/.../status/...', color: 'text-sky-500' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen">
      <SEO
        title="Convertisseur Vidéo — Entrez un lien valide | MediaGrabber"
        description="Le lien que vous avez entré n'est pas supporté. Collez un lien YouTube, TikTok, Instagram, Facebook ou Twitter valide pour télécharger votre vidéo gratuitement."
        keywords="convertisseur video, telecharger video, youtube downloader, tiktok downloader, instagram video, convertisseur mp3"
      />

      <section className="w-full relative py-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/10 blur-[100px] pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-2xl">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
            Unsupported or Invalid URL
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
            We couldn't recognize that link. Please paste a valid video URL from one of our supported platforms below.
          </p>

          {/* Ad */}
          <div className="mb-10">
            <AdsterraNativeBanner />
          </div>

          {/* Retry Input */}
          <form onSubmit={handleSubmit} className="relative group mb-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-brand-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 p-2">
              <div className="flex items-center justify-center pl-4 pr-2">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a valid video URL here..."
                className="flex-1 w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 text-lg py-3 px-2 focus:outline-none"
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !url}
                className="bg-brand-500 hover:bg-brand-600 text-white p-3 sm:px-6 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading
                  ? <Loader2 className="w-6 h-6 animate-spin" />
                  : <><span className="hidden sm:inline">Try Again</span><ArrowRight className="w-6 h-6 sm:w-5 sm:h-5" /></>
                }
              </button>
            </div>
          </form>

          {/* Supported platforms */}
          <div className="text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              Supported Platforms &amp; URL Formats
            </h2>
            <ul className="space-y-3">
              {supportedPlatforms.map((p) => (
                <li key={p.name} className="flex items-start gap-3">
                  <span className={`font-semibold text-sm w-28 flex-shrink-0 ${p.color}`}>{p.name}</span>
                  <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-0.5 rounded">
                    {p.example}
                  </code>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO content */}
          <div className="mt-10 text-left space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <p>MediaGrabber supports downloading videos from YouTube, TikTok, Instagram Reels, Facebook Watch, and Twitter/X. Simply copy the video URL from your browser or app and paste it above.</p>
            <p>Make sure the URL contains the full video link — short links like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">youtu.be/...</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">vm.tiktok.com/...</code> are also supported.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
