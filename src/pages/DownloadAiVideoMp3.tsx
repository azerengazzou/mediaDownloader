import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Zap, Shield, Star, Music, Video, ArrowRight, Loader2, Search } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdsterraNativeBanner } from '../components/layout/AdBlock';
import { detectPlatform } from '../lib/platforms';

export function DownloadAiVideoMp3() {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    const detected = detectPlatform(url);
    if (detected) {
      sessionStorage.removeItem('failCount');
      setIsLoading(true);
      navigate(`/?url=${encodeURIComponent(url)}`);
    }
  };

  const features = [
    { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: 'AI-Powered Detection', desc: 'Automatically detects video format, resolution, and best audio bitrate.' },
    { icon: <Music className="w-5 h-5 text-purple-500" />, title: 'MP3 Extraction', desc: 'Extract high-quality MP3 audio from any video — up to 320kbps.' },
    { icon: <Video className="w-5 h-5 text-brand-500" />, title: 'HD Video Download', desc: 'Download videos in 720p, 1080p, or 4K depending on source quality.' },
    { icon: <Shield className="w-5 h-5 text-green-500" />, title: '100% Safe & Free', desc: 'No registration, no malware, no hidden fees. Always free.' },
    { icon: <Star className="w-5 h-5 text-orange-500" />, title: 'All Platforms', desc: 'YouTube, TikTok, Instagram, Facebook, Twitter and more.' },
    { icon: <Download className="w-5 h-5 text-blue-500" />, title: 'Instant Download', desc: 'No waiting, no queue. Your file is ready in seconds.' },
  ];

  const faqs = [
    { q: 'How do I download a video as MP3?', a: 'Paste the video URL above, click Download, then select the MP3 Audio option from the results.' },
    { q: 'Is AI video to MP3 conversion free?', a: 'Yes, MediaGrabber is 100% free. No account or payment required.' },
    { q: 'What video platforms are supported?', a: 'YouTube, TikTok, Instagram Reels, Facebook Watch, and Twitter/X videos.' },
    { q: 'What quality is the MP3?', a: 'We extract the best available audio quality from the source, up to 320kbps.' },
    { q: 'Can I download YouTube Shorts as MP3?', a: 'Yes. Paste the YouTube Shorts URL and select the audio download option.' },
  ];

  return (
    <div className="flex flex-col items-center">
      <SEO
        title="AI Video to MP3 Downloader — Free HD Video & Audio Download | MediaGrabber"
        description="Download any video as MP3 or HD MP4 using AI-powered detection. Supports YouTube, TikTok, Instagram, Facebook, and Twitter. Free, fast, and secure."
        keywords="ai video downloader, video to mp3 ai, download video mp3 free, youtube to mp3 ai, tiktok mp3 downloader, instagram video mp3, ai audio extractor, hd video downloader free"
      />

      {/* Hero */}
      <section className="w-full relative py-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> AI-Powered · Free · Instant
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5 text-gray-900 dark:text-white leading-tight">
            AI Video to MP3 &amp; HD<br className="hidden md:block" /> Video Downloader
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Paste any YouTube, TikTok, Instagram, or Facebook video URL. Our AI instantly extracts the best quality MP3 audio or HD video — free, no signup required.
          </p>

          {/* Ad */}
          <div className="mb-10">
            <AdsterraNativeBanner />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 p-2">
              <div className="flex items-center justify-center pl-4 pr-2">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube, TikTok, Instagram URL..."
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
                  : <><span className="hidden sm:inline">Download Free</span><ArrowRight className="w-6 h-6 sm:w-5 sm:h-5" /></>
                }
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Supports YouTube · TikTok · Instagram · Facebook · Twitter/X
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold font-heading text-center mb-12 text-gray-900 dark:text-white">
            Why Use Our AI Video Downloader?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  {f.icon}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <AdsterraNativeBanner />
      </div>

      {/* FAQ — schema-ready */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold font-heading text-center mb-10 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        })
      }} />

      {/* SEO keyword section */}
      <section className="w-full border-t border-gray-200 dark:border-gray-800 py-12 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
            The Fastest Free AI Video &amp; MP3 Downloader Online
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-7">
            MediaGrabber is the best free AI-powered video downloader for YouTube MP3, TikTok video download without watermark, Instagram Reels downloader, Facebook video saver, and Twitter video download. Convert any video to MP3 in seconds — no software, no registration, no limits.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['YouTube to MP3', 'TikTok Downloader', 'Instagram Reels MP3', 'Facebook Video Saver',
              'Twitter Video Download', 'AI MP3 Extractor', 'HD Video Downloader', 'Free MP4 Downloader',
              'YouTube Shorts MP3', 'No Watermark TikTok', '4K Video Download', 'Audio Extractor Online'
            ].map((kw) => (
              <span key={kw} className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
