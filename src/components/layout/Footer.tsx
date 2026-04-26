import { Link } from 'react-router-dom';
import { Download, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import { AdBlock } from './AdBlock';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-brand-500 rounded-xl group-hover:bg-brand-600 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                MediaGrabber
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              The fastest, most reliable tool to download videos, shorts, reels, and audio from your favorite social media platforms. 100% free forever.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/platforms" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Supported Sites</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Supported Sites */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Supported Platforms</h3>
            <ul className="space-y-3">
              <li><Link to="/platforms#youtube" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">YouTube Downloader</Link></li>
              <li><Link to="/platforms#tiktok" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">TikTok Video Saver</Link></li>
              <li><Link to="/platforms#instagram" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Instagram Reels Download</Link></li>
              <li><Link to="/platforms#facebook" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Facebook Video Download</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Ad Banner */}
        <div className="my-8 hidden md:block">
          <AdBlock format="leaderboard" />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {currentYear} MediaGrabber. All rights reserved. Not affiliated with YouTube, TikTok, or Instagram.
          </p>
        </div>
      </div>

      {/* Sticky Mobile Footer Ad */}
      <div className="md:hidden fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
         <AdBlock format="fluid" className="h-[60px]" />
      </div>
    </footer>
  );
}
