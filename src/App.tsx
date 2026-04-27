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
    // Extract language from URL path
    const pathParts = location.pathname.split('/').filter(Boolean);
    const langFromUrl = pathParts[0];
    const supportedLangs = ['en', 'fr', 'ar'];

    if (supportedLangs.includes(langFromUrl)) {
      if (i18n.language !== langFromUrl) {
        changeLanguage(langFromUrl);
      }
    } else {
      // Use default language if not in URL
      const detectedLang = getCurrentLanguage();
      if (i18n.language !== detectedLang) {
        changeLanguage(detectedLang);
      }
    }

    // Update HTML attributes
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = getLanguageDirection();
  }, [location, i18n]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageViewTracker />
        <LanguageRoute />
        <Routes>
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="platforms" element={<Platforms />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="terms" element={<StaticPage type="terms" />} />
            <Route path="privacy" element={<StaticPage type="privacy" />} />
            <Route path="contact" element={<StaticPage type="contact" />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogPost />} />
          </Route>

          {/* Default routes without language prefix (fallback) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="platforms" element={<Platforms />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="terms" element={<StaticPage type="terms" />} />
            <Route path="privacy" element={<StaticPage type="privacy" />} />
            <Route path="contact" element={<StaticPage type="contact" />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
