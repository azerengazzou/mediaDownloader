import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { URLInput } from '../components/downloader/URLInput';
import { DownloadCard } from '../components/downloader/DownloadCard';
import { HistoryList } from '../components/downloader/HistoryList';
import { AdsterraNativeBanner } from '../components/layout/AdBlock';
import { useDownloader } from '../hooks/useDownloader';
import { useHistory } from '../hooks/useHistory';
import { getCurrentLanguage } from '../config/i18n';
import {
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Music,
  CheckCircle,
  Shield,
  Zap,
  HelpCircle
} from 'lucide-react';

// Platform theme & SEO configurations
interface PlatformConfig {
  icon: React.FC<{ className?: string }>;
  colorClass: string;
  bgGradient: string;
  accentColor: string;
  keywords: string;
}

const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  youtube: {
    icon: Youtube,
    colorClass: 'text-red-600 dark:text-red-500',
    bgGradient: 'from-red-500/10 to-orange-500/10',
    accentColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    keywords: 'youtube video downloader hd, download youtube videos mp4, youtube mp3 converter, youtube shorts downloader, save youtube videos offline, download youtube audio, youtube to mp3 high quality, youtube playlist downloader, youtube video saver online, youtube 4k downloader, download youtube channel videos, free youtube downloader no software'
  },
  'youtube-to-mp3': {
    icon: Music,
    colorClass: 'text-rose-600 dark:text-rose-500',
    bgGradient: 'from-rose-500/10 to-purple-500/10',
    accentColor: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
    keywords: 'youtube to mp3 converter free, download youtube mp3 320kbps, youtube audio downloader, extract mp3 from youtube, youtube to mp3 high quality, free youtube music downloader, convert youtube link to mp3, yt to mp3 online, best youtube to mp3 converter'
  },
  tiktok: {
    icon: Music, // TikTok doesn't have a direct Lucide icon, Music is a great fit
    colorClass: 'text-cyan-500 dark:text-cyan-400',
    bgGradient: 'from-cyan-500/10 to-fuchsia-500/10',
    accentColor: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
    keywords: 'tiktok video downloader no watermark, download tiktok hd quality, save tiktok videos mp4, tiktok mp3 downloader, download tiktok reels, tiktok video saver online, download tiktok audio, tiktok hd downloader free, tiktok watermark remover download, tiktok audio saver'
  },
  instagram: {
    icon: Instagram,
    colorClass: 'text-pink-500 dark:text-pink-400',
    bgGradient: 'from-pink-500/10 to-yellow-500/10',
    accentColor: 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 focus:ring-pink-500',
    keywords: 'instagram reels downloader hd, download instagram videos mp4, instagram story downloader, save instagram reels audio, instagram video downloader online, instagram mp4 saver, download instagram reels without watermark, instagram photo downloader, instagram reel saver, ig story download free'
  },
  facebook: {
    icon: Facebook,
    colorClass: 'text-blue-600 dark:text-blue-500',
    bgGradient: 'from-blue-600/10 to-indigo-600/10',
    accentColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    keywords: 'facebook video downloader hd, download facebook videos mp4, facebook reels downloader, save facebook videos online, facebook video saver, facebook private video downloader, fb video download online free'
  },
  twitter: {
    icon: Twitter,
    colorClass: 'text-sky-500 dark:text-sky-400',
    bgGradient: 'from-slate-500/10 to-sky-500/10',
    accentColor: 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500',
    keywords: 'twitter video downloader hd, download x videos mp4, save twitter videos online, twitter gif downloader, twitter mp4 downloader, download x.com videos, twitter video saver hd, x video downloader free'
  }
};

export function PlatformDownloader({ platformKey }: { platformKey?: string }) {
  const params = useParams<{ platform?: string }>();
  const activeKey = platformKey || params.platform || 'youtube';
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || getCurrentLanguage();

  const { url, platform, isLoading, error, result, handleUrlChange, processUrl } = useDownloader();
  const { history, addToHistory, clearHistory, removeFromHistory } = useHistory();

  React.useEffect(() => {
    if (result) {
      addToHistory(result);
    }
  }, [result, addToHistory]);

  const config = PLATFORM_CONFIGS[activeKey] || PLATFORM_CONFIGS.youtube;
  const PlatformIcon = config.icon;

  // Localized contents
  const title = t(`platformPage.${activeKey}.title`);
  const subtitle = t(`platformPage.${activeKey}.subtitle`);
  const description = t(`platformPage.${activeKey}.description`);

  const faqQ1 = t(`platformPage.${activeKey}.q1`);
  const faqA1 = t(`platformPage.${activeKey}.a1`);
  const faqQ2 = t(`platformPage.${activeKey}.q2`);
  const faqA2 = t(`platformPage.${activeKey}.a2`);
  const faqQ3 = t(`platformPage.${activeKey}.q3`);
  const faqA3 = t(`platformPage.${activeKey}.a3`);

  // 🔥 SEO Schema 1: WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${title} - MediaGrabber`,
    "url": `https://mediagrabber.app/${currentLang}/${activeKey}-downloader`,
    "description": description,
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "inLanguage": currentLang,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // 🔥 SEO Schema 2: FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": faqQ1,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqA1
        }
      },
      {
        "@type": "Question",
        "name": faqQ2,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqA2
        }
      },
      {
        "@type": "Question",
        "name": faqQ3,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqA3
        }
      }
    ]
  };

  // 🔥 SEO Schema 3: Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('nav.home'),
        "item": `https://mediagrabber.app/${currentLang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `https://mediagrabber.app/${currentLang}/${activeKey}-downloader`
      }
    ]
  };

  const handleDownload = async () => {
    await processUrl();
  };

  return (
    <div className="flex flex-col items-center">
      <SEO
        title={`${title} | Free, Fast & HD`}
        description={description}
        keywords={config.keywords}
        schema={webAppSchema} // This will be combined with the default SEO schemas
      />

      {/* Extra Schema Markup for FAQs and Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Hero Section */}
      <section className="w-full relative py-16 md:py-24 overflow-hidden">
        {/* Glow Effects */}
        <div className={`absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-brand-400/10 blur-[120px] pointer-events-none`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-3xl shadow-md mb-6 border border-gray-100 dark:border-gray-700">
            <PlatformIcon className={`w-10 h-10 ${config.colorClass}`} />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight animate-fade-in">
            {title} <br className="hidden md:block" />
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-indigo-500">
              {subtitle}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="mb-12">
            <AdsterraNativeBanner />
          </div>

          {/* URL Input Form */}
          <div className="max-w-3xl mx-auto">
            <URLInput
              url={url}
              platform={platform}
              isLoading={isLoading}
              error={error}
              onChange={handleUrlChange}
              onSubmit={handleDownload}
            />
          </div>

          {/* Download Results */}
          {result && (
            <DownloadCard
              result={result}
              onDownload={(option) => {
                window.open(option.url, '_blank');
              }}
            />
          )}

          {/* Local Download History */}
          <HistoryList
            history={history}
            onClear={clearHistory}
            onRemove={removeFromHistory}
          />
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading mb-12 text-gray-900 dark:text-white">
            Features of our {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all hover:translate-y-[-4px] duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Extract download links from {activeKey === 'youtube-to-mp3' ? 'YouTube' : activeKey} in milliseconds. No lag, no waiting.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all hover:translate-y-[-4px] duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">High Quality</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Download in full resolution HD, 1080p, 4K, or extract original high-bitrate MP3 audio.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all hover:translate-y-[-4px] duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">100% Safe & Secure</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                No virus, no adware, no signup required. Your downloads are processed securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Download Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-950/40 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading mb-12 text-center text-gray-900 dark:text-white">
            How to use the {title}?
          </h2>

          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Copy the URL</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Open the {activeKey === 'youtube-to-mp3' ? 'YouTube' : activeKey} app or website, locate the video or media you want to save, and copy its shareable link.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Paste into the Downloader</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Paste the copied URL into the input field at the top of this page. The system will auto-detect the source.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-green-500 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-md shadow-green-500/20">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Download your File</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click the 'Download' button. Select your preferred format (MP4, MP3, etc.) and resolution, then click to save it directly to your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-12">
            <div className="p-2 bg-brand-500/10 rounded-xl">
              <HelpCircle className="w-6 h-6 text-brand-500" />
            </div>
            <h2 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
              {t(`platformPage.${activeKey}.faqTitle`, 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                <span className="text-brand-500">Q.</span> {faqQ1}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-6">
                {faqA1}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                <span className="text-brand-500">Q.</span> {faqQ2}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-6">
                {faqA2}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                <span className="text-brand-500">Q.</span> {faqQ3}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-6">
                {faqA3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 SEO Keyword Indexing Cloud */}
      <section className="w-full border-t border-gray-200 dark:border-gray-800 py-12 bg-gray-50 dark:bg-gray-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider text-center">
            Supported Searches & Tags
          </h2>
          <div className="w-full p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
            {config.keywords.split(', ').map((kw) => (
              <span key={kw} className="inline-block mr-3 mb-2 px-2 py-1 bg-gray-50 dark:bg-gray-900 rounded-lg hover:text-brand-500 transition-colors">
                #{kw.replace(/\s+/g, '-')}
              </span>
            ))}
          </div>
          <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
            MediaGrabber is a free utility to help you download video and audio for personal offline viewing. We do not host any copyrighted content on our servers.
          </div>
        </div>
      </section>
    </div>
  );
}
