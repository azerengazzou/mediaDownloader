import React from 'react';
import { SEO } from '../components/SEO';
import { URLInput } from '../components/downloader/URLInput';
import { DownloadCard } from '../components/downloader/DownloadCard';
import { HistoryList } from '../components/downloader/HistoryList';
import { AdBlock } from '../components/layout/AdBlock';
import { useDownloader } from '../hooks/useDownloader';
import { useHistory } from '../hooks/useHistory';

export function Home() {
  const { url, platform, isLoading, error, result, handleUrlChange, processUrl } = useDownloader();
  const { history, addToHistory, clearHistory, removeFromHistory } = useHistory();

  const handleDownload = async () => {
    await processUrl();
  };

  React.useEffect(() => {
    if (result) {
      addToHistory(result);
    }
  }, [result, addToHistory]);

  // 🔥 SEO Schema (WebApp + FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MediaGrabber",
    url: "https://mediagrabber.com",
    description:
      "Download videos and audio from YouTube, TikTok, Instagram, and Twitter instantly in high quality.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I download a YouTube video?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paste the YouTube link into MediaGrabber and click download. Choose your preferred format and quality."
        }
      },
      {
        "@type": "Question",
        name: "Does MediaGrabber support TikTok downloads without watermark?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, MediaGrabber supports TikTok video downloads in high quality, depending on availability of the source."
        }
      },
      {
        "@type": "Question",
        name: "Can I download Instagram reels and audio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can download Instagram reels and extract audio in MP3 format."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center">
      <SEO />

      {/* Structured Data (SEO boost - invisible, safe) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Hero Section */}
      <section className="w-full relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
            Download Any Video <br className="hidden md:block" />
            <span className="text-gradient">Fast & Free</span>
          </h1>

          {/* SEO reinforcement text (NOT affecting UI hierarchy) */}
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-2">
            Download YouTube videos, TikTok clips, Instagram reels, and Twitter media in HD instantly.
          </p>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Paste a link from YouTube, TikTok, Instagram, or Twitter to download high-quality videos and audio instantly.
          </p>

          <div className="mb-12">
            <AdBlock format="leaderboard" />
          </div>

          <URLInput
            url={url}
            platform={platform}
            isLoading={isLoading}
            error={error}
            onChange={handleUrlChange}
            onSubmit={handleDownload}
          />

          {result && (
            <DownloadCard
              result={result}
              onDownload={(option) => {
                window.open(option.url, '_blank');
              }}
            />
          )}

          <HistoryList
            history={history}
            onClear={clearHistory}
            onRemove={removeFromHistory}
          />

          {/* 🔥 SEO FAQ Section (hidden value driver, visible but compact) */}
          <div className="mt-16 text-left max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How do I use MediaGrabber?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Paste your video link and click download. The tool automatically detects the platform.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Is MediaGrabber free to use?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, it is completely free to download videos and audio.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">What platforms are supported?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  YouTube, TikTok, Instagram, and Twitter (X) are supported.
                </p>
              </div>
            </div>
          </div>

          {/* Hidden semantic SEO text (safe, no UX impact) */}
          <div className="sr-only">
            MediaGrabber is a free online video downloader that allows users to download videos and audio
            from YouTube, TikTok, Instagram, and Twitter in high quality formats such as MP4 and MP3.
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading mb-12">Why use MediaGrabber?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Auto Detection</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Just paste the link. We automatically detect the platform and find the best quality.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Download MP4, MP3, thumbnails, and HD resolutions up to 4K.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-500 dark:text-gray-400">
                No popups or malware. Safe video downloading across all devices.
              </p>
            </div>
          </div>
        </div>

      </section>
      {/* 🔥 SEO Keyword Indexing Section */}
      <section className="w-full border-t border-gray-200 dark:border-gray-800 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold font-heading mb-6 text-center">
            Start Downloading Now For Free!
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
            MediaGrabber supports thousands of search queries related to video and audio downloading.
            This keyword list helps search engines understand all supported use cases and platforms.
          </p>

          {/* 🔥 BIG SEO KEYWORD BLOCK (single text area style) */}
          <div className="w-full p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 leading-7">

            youtube video downloader hd, download youtube videos mp4, youtube mp3 converter, youtube shorts downloader, save youtube videos offline, download youtube audio, youtube to mp3 high quality, youtube reel downloader, download youtube playlist, youtube video saver online,

            tiktok video downloader no watermark, download tiktok hd quality, save tiktok videos mp4, tiktok mp3 downloader, download tiktok reels, tiktok video saver online, download tiktok audio, tiktok hd downloader free, tiktok watermark remover download,

            instagram reels downloader hd, download instagram videos mp4, instagram story downloader, save instagram reels audio, instagram video downloader online, instagram mp4 saver, download instagram reels without watermark, instagram photo downloader, instagram reel saver,

            twitter video downloader hd, download x videos mp4, save twitter videos online, twitter gif downloader, twitter mp4 downloader, download x.com videos, twitter video saver hd,

            online video downloader free, fast video downloader hd, best video downloader tool, free mp3 converter online, download videos from url, paste link video downloader, social media video downloader, hd video saver tool, no watermark video downloader,

            youtube to mp3 converter free, tiktok to mp3 download, instagram to mp3 extractor, video to audio converter online, mp4 downloader fast, hd video download tool, instant video downloader, free media downloader online
            youtube video downloader hd, download youtube videos mp4, youtube mp3 converter, youtube shorts downloader, save youtube videos offline, download youtube audio, youtube to mp3 high quality, youtube playlist downloader, youtube video saver online, youtube 4k downloader,

            tiktok video downloader no watermark, download tiktok hd quality, save tiktok videos mp4, tiktok mp3 downloader, download tiktok reels, tiktok video saver online, download tiktok audio, tiktok hd downloader free, tiktok watermark remover download,

            instagram reels downloader hd, download instagram videos mp4, instagram story downloader, save instagram reels audio, instagram video downloader online, instagram mp4 saver, download instagram reels without watermark, instagram photo downloader, instagram reel saver,

            twitter video downloader hd, download x videos mp4, save twitter videos online, twitter gif downloader, twitter mp4 downloader, download x.com videos, twitter video saver hd,

            facebook video downloader hd, download facebook videos mp4, facebook reels downloader, save facebook videos online, facebook video saver,

            {/* AUDIO / MUSIC EXPANSION */}
            youtube music downloader mp3, soundcloud downloader mp3, download audio from video, mp3 converter high quality, video to mp3 converter online, extract audio from video hd, free mp3 downloader online, music downloader tool,

            spotify downloader mp3 (convert), podcast downloader mp3, audio extractor online tool, download song from link, music to mp3 converter,

            {/* STREAMING / ADVANCED MEDIA (HIGH VALUE SEO) */}
            m3u8 downloader online, stream downloader hd, live stream downloader tool, hls video downloader, dash stream downloader, video stream saver online, download streaming video link,

            iptv m3u downloader, playlist stream downloader, online streaming downloader hd,

            {/* GENERAL UNIVERSAL MEDIA TOOL */}
            online video downloader free, fast video downloader hd, best video downloader tool, free media downloader online, download videos from url, paste link downloader tool, universal video downloader, all in one downloader tool,

            hd video download tool, instant video downloader, no watermark video downloader, high quality video saver, online media converter tool,

            video to mp3 converter free, video to audio extractor online, mp4 downloader fast, hd video saver tool, social media downloader all platforms,
          </div>

          {/* subtle reinforcement (safe) */}
          <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500">
            MediaGrabber is a free online tool for downloading videos and audio from YouTube, TikTok, Instagram, and Twitter in HD quality.
          </div>

        </div>
      </section>
    </div>


  );
}