import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Platforms } from './pages/Platforms';
import { FAQ } from './pages/FAQ';
import { StaticPage } from './pages/Static';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { useAnalytics } from './hooks/useAnalytics';

function PageViewTracker() {
  const location = useLocation();
  const { trackPageView } = useAnalytics();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageViewTracker />
        <Routes>
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
