import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import { getCurrentLanguage } from '../../config/i18n';
import { AdsterraNativeBanner } from './AdBlock';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || getCurrentLanguage();
  const langPrefix = `/${currentLang}`;

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to={langPrefix} className="flex items-center gap-2 group">
              <div className="p-2 bg-brand-500 rounded-xl group-hover:bg-brand-600 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                MediaGrabber
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {t('site.description')}
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
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('footer.followUs')}</h3>
            <ul className="space-y-3">
              <li><Link to={langPrefix} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.home')}</Link></li>
              <li><Link to={`${langPrefix}/platforms`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.platforms')}</Link></li>
              <li><Link to={`${langPrefix}/faq`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to={`${langPrefix}/blog`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          {/* Supported Sites */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('platforms.title')}</h3>
            <ul className="space-y-3">
              <li><Link to={`${langPrefix}/platforms#youtube`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('seo.youtubeDownloader')}</Link></li>
              <li><Link to={`${langPrefix}/platforms#tiktok`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('seo.tiktokDownloader')}</Link></li>
              <li><Link to={`${langPrefix}/platforms#instagram`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('seo.instagramDownloader')}</Link></li>
              <li><Link to={`${langPrefix}/platforms#facebook`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">Facebook {t('seo.videoDownloader')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('static.contact')}</h3>
            <ul className="space-y-3">
              <li><Link to={`${langPrefix}/terms`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.terms')}</Link></li>
              <li><Link to={`${langPrefix}/privacy`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.privacy')}</Link></li>
              <li><Link to={`${langPrefix}/contact`} className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 text-sm transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Ad Banner */}
        <div className="my-8 hidden md:block">
          <AdsterraNativeBanner />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {currentYear} MediaGrabber. {t('footer.privacy')} | {t('footer.terms')}
          </p>
        </div>
      </div>

      {/* Sticky Mobile Footer Ad */}
      <div className="md:hidden fixed bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <AdsterraNativeBanner />
      </div>
    </footer>
  );
}
