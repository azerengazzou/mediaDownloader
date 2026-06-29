import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Platforms } from './pages/Platforms';
import { FAQ } from './pages/FAQ';
import { StaticPage } from './pages/Static';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { BlogCategory } from './pages/BlogCategory';
import { UnsupportedUrl } from './pages/UnsupportedUrl';
import { DownloadAiVideoMp3 } from './pages/DownloadAiVideoMp3';
import { LiveChat } from './pages/LiveChat';
import { LiveStream } from './pages/LiveStream';
import { PlatformDownloader } from './pages/PlatformDownloader';
import { useAnalytics } from './hooks/useAnalytics';
import { changeLanguage, getCurrentLanguage, getLanguageDirection } from './config/i18n';

function PageViewTracker() {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function LanguageRoute() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const langFromUrl = pathParts[0];
    const supportedLangs = ['en', 'fr', 'ar'];

    if (supportedLangs.includes(langFromUrl)) {
      if (i18n.language !== langFromUrl) changeLanguage(langFromUrl);
    } else {
      const detectedLang = getCurrentLanguage();
      if (i18n.language !== detectedLang) changeLanguage(detectedLang);
    }

    document.documentElement.lang = i18n.language;
    document.documentElement.dir = getLanguageDirection();
  }, [location, i18n]);

  return null;
}

const sharedRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="platforms" element={<Platforms />} />
    <Route path="faq" element={<FAQ />} />
    <Route path="terms" element={<StaticPage type="terms" />} />
    <Route path="privacy" element={<StaticPage type="privacy" />} />
    <Route path="contact" element={<StaticPage type="contact" />} />
    <Route path="blog" element={<BlogList />} />
    <Route path="blog/category/:category" element={<BlogCategory />} />
    <Route path="blog/:slug" element={<BlogPost />} />
    <Route path="unsupported-url" element={<UnsupportedUrl />} />
    <Route path="convertisseur-video" element={<UnsupportedUrl />} />
    <Route path="download-ai-video-mp3" element={<DownloadAiVideoMp3 />} />
    <Route path="chat-direct-with-girl" element={<LiveChat />} />
    <Route path="youtube-downloader" element={<PlatformDownloader platformKey="youtube" />} />
    <Route path="youtube-to-mp3" element={<PlatformDownloader platformKey="youtube-to-mp3" />} />
    <Route path="tiktok-downloader" element={<PlatformDownloader platformKey="tiktok" />} />
    <Route path="instagram-downloader" element={<PlatformDownloader platformKey="instagram" />} />
    <Route path="facebook-downloader" element={<PlatformDownloader platformKey="facebook" />} />
    <Route path="twitter-downloader" element={<PlatformDownloader platformKey="twitter" />} />
    <Route path="x-downloader" element={<PlatformDownloader platformKey="twitter" />} />
    <Route path="live-stream" element={<LiveStream />} />
    <Route path="live-stream/:sportId" element={<LiveStream />} />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageViewTracker />
        <LanguageRoute />
        <Routes>
          <Route path="/:lang" element={<Layout />}>
            {sharedRoutes}
          </Route>
          <Route path="/" element={<Layout />}>
            {sharedRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
