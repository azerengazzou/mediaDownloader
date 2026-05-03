import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { URLInput } from '../components/downloader/URLInput';
import { DownloadCard } from '../components/downloader/DownloadCard';
import { HistoryList } from '../components/downloader/HistoryList';
import { AdsterraNativeBanner } from '../components/layout/AdBlock';
import { useDownloader } from '../hooks/useDownloader';
import { useHistory } from '../hooks/useHistory';
import { useLocalizedBlogPosts } from '../data/blogI18n';
import { ArrowRight, BookOpen } from 'lucide-react';

const STREAMS = [
  { id: 'stream1',  label: 'مانشستر يونايتد ضد ليفربول',        labelEn: 'Manchester United vs Liverpool',        labelFr: 'Manchester United vs Liverpool',        src: 'https://5.wwwkora.com/albaplayer/bein-sports-hd-1/' },
  { id: 'stream2',  label: 'مانشستر يونايتد - ليفربول بث 2',    labelEn: 'Man United vs Liverpool — Stream 2',    labelFr: 'Man United vs Liverpool — Flux 2',      src: 'https://dns22.yalla-sport.link/chtv/ch3.php' },
  { id: 'stream3',  label: 'مانشستر يونايتد - ليفربول بث 3',    labelEn: 'Man United vs Liverpool — Stream 3',    labelFr: 'Man United vs Liverpool — Flux 3',      src: 'https://5.wwwkora.com/albaplayer/bein-sports-hd-7/' },
  { id: 'stream4',  label: 'مانشستر يونايتد - ليفربول بث 4',    labelEn: 'Man United vs Liverpool — Stream 4',    labelFr: 'Man United vs Liverpool — Flux 4',      src: 'https://5.wwwkora.com/albaplayer/bein-sports-hd-6/' },
  { id: 'stream5',  label: 'مانشستر يونايتد - ليفربول بث 5',    labelEn: 'Man United vs Liverpool — Stream 5',    labelFr: 'Man United vs Liverpool — Flux 5',      src: 'https://5.wwwkora.com/albaplayer/bein-sports-hd-4/' },
  { id: 'stream6',  label: 'مانشستر يونايتد - ليفربول بث 6',    labelEn: 'Man United vs Liverpool — Stream 6',    labelFr: 'Man United vs Liverpool — Flux 6',      src: 'https://5.wwwkora.com/albaplayer/bein-sports-hd-1/' },
  { id: 'stream7',  label: 'مانشستر يونايتد - ليفربول HD',      labelEn: 'Man United vs Liverpool — HD',          labelFr: 'Man United vs Liverpool — HD',          src: 'https://11.yallashoot1.cc/albaplayer/bein-2/?serv=0' },
  { id: 'stream8',  label: 'مانشستر يونايتد - ليفربول 4K',      labelEn: 'Man United vs Liverpool — 4K',          labelFr: 'Man United vs Liverpool — 4K',          src: 'https://11.yallashoot1.cc/albaplayer/bein-2/?serv=0' },
];

function LiveStreamTabs() {
  const [active, setActive] = React.useState(STREAMS[1].id);
  const current = STREAMS.find(s => s.id === active) ?? STREAMS[1];

  return (
    <div>
      {/* Tab bar — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide" role="tablist" aria-label="Live football streams">
        {STREAMS.map((stream) => (
          <button
            key={stream.id}
            role="tab"
            aria-selected={active === stream.id}
            aria-controls={`panel-${stream.id}`}
            onClick={() => setActive(stream.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${active === stream.id
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-gray-700 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
          >
            {stream.label}
          </button>
        ))}
      </div>

      {/* Player */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-label={`${current.labelEn} live stream`}
        className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <iframe
          key={current.src}
          src={current.src}
          width="100%"
          height="500px"
          frameBorder="0"
          scrolling="yes"
          allowFullScreen
          title={`${current.labelEn} — Live Football Stream • ${current.label} • ${current.labelFr}`}
          loading="lazy"
        />
      </div>

      {/* Trilingual match label — visible + indexed by crawlers */}
      <div className="mt-4 text-center space-y-1">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{current.labelEn} — Live Stream Free</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{current.label} • بث مباشر مجاني</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{current.labelFr} — Streaming en direct gratuit</p>
      </div>

      {/* SEO block — all matches in 3 languages, crawlable */}
      <div className="mt-8 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 leading-6">
        <p className="font-semibold text-gray-600 dark:text-gray-300 mb-2">Manchester United vs Liverpool Live Stream Free • مانشستر يونايتد ضد ليفربول بث مباشر • Manchester United vs Liverpool streaming gratuit</p>
        <ul className="space-y-1">
          {STREAMS.map((s) => (
            <li key={s.id}>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{s.labelEn}</span>
              {' • '}
              <span>{s.label}</span>
              {' • '}
              <span>{s.labelFr}</span>
              {' — '}
              <span className="text-brand-500">live stream free • بث مباشر مجاني • streaming gratuit</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Home() {
  const { url, platform, isLoading, error, result, handleUrlChange, processUrl } = useDownloader();
  const { history, addToHistory, clearHistory, removeFromHistory } = useHistory();
  const { t } = useTranslation();
  const blogPosts = useLocalizedBlogPosts();

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
    description: t('site.description'),
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
        name: t('faq.q1'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a1')
        }
      },
      {
        "@type": "Question",
        name: t('faq.q2'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a2')
        }
      },
      {
        "@type": "Question",
        name: t('faq.q3'),
        acceptedAnswer: {
          "@type": "Answer",
          text: t('faq.a3')
        }
      }
    ]
  };

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MediaGrabber Blog — Latest Articles',
    url: 'https://mediagrabber.com/blog',
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: post.title,
      url: `https://mediagrabber.com/blog/${post.slug}`,
    })),
  };

  return (
    <div className="flex flex-col items-center">
      <SEO
        title={result ? `Download "${result.title}" | MediaGrabber` : undefined}
        description={result
          ? `Download "${result.title}" from ${result.platform.name} in HD quality — free, fast, and secure with MediaGrabber.`
          : undefined
        }
      />

      {/* Structured Data (SEO boost - invisible, safe) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(blogListSchema)}
      </script>

      {/* Hero Section */}
      <section className="w-full relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
            {t('hero.title')} <br className="hidden md:block" />
            <span className="text-gradient">{t('hero.subtitle')}</span>
          </h1>

          {/* SEO reinforcement text (NOT affecting UI hierarchy) */}
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-2">
            {t('hero.description')}
          </p>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="mb-12">
            <AdsterraNativeBanner />
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
              {t('faq.title')}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{t('faq.q1')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('faq.a1')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">{t('faq.q4')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('faq.a4')}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">{t('faq.q2')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('faq.a2')}
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
      {/* Live Stream Section */}
      <section className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-6 text-center">
            🔴 Manchester United vs Liverpool — مانشستر يونايتد ضد ليفربول — Manchester United vs Liverpool en direct
          </h2>
          <LiveStreamTabs />
        </div>
      </section>

      {/* Latest Blog Articles */}
      <section className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-500 rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
              {t('blog.latestArticles', 'Latest Blog Articles')}
            </h2>
          </div>

          <ul className="space-y-3" aria-label="Blog articles">
            {blogPosts.map((post) => (
              <li key={post.slug} className="flex items-start gap-3 group">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" aria-hidden="true" />
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors leading-snug"
                >
                  {post.title}
                  <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-normal">{post.category}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 mt-8 text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            {t('blog.viewAllArticles', 'View all articles')} <ArrowRight className="w-4 h-4" />
          </Link>
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