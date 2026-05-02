import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AdBlockModal } from '../AdBlockModal';
import { useAdBlockDetector } from '../../hooks/useAdBlockDetector';

export function Layout() {
  const adBlockDetected = useAdBlockDetector();

  return (
    <div className="flex flex-col min-h-screen">
      {adBlockDetected && <AdBlockModal />}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
