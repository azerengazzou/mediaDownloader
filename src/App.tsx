import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Platforms } from './pages/Platforms';
import { FAQ } from './pages/FAQ';
import { StaticPage } from './pages/Static';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
