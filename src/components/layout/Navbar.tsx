import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Download, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useAnalytics } from '../../hooks/useAnalytics';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { getCurrentLanguage } from '../../config/i18n';
import { useBlogCategories } from '../../data/blogI18n';

export function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const { trackNavClick } = useAnalytics();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isBlogOpen, setIsBlogOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const categories = useBlogCategories();
  const currentLang = lang || getCurrentLanguage();
  const langPrefix = `/${currentLang}`;

  const navLinks = [
    { name: t('nav.platforms'), path: `${langPrefix}/platforms` },
    { name: t('nav.faq'), path: `${langPrefix}/faq` },
    { name: t('nav.liveStream'), path: `${langPrefix}/live-stream` },
    { name: t('nav.chat'), path: `${langPrefix}/chat-direct-with-girl` },
  ];

  const homePath = currentLang ? `/${currentLang}` : '/';

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsBlogOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  React.useEffect(() => {
    setIsBlogOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={homePath} className="flex items-center gap-2 group">
              <div className="p-2 bg-brand-500 rounded-xl group-hover:bg-brand-600 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                MediaGrabber
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => trackNavClick(link.name)}
                  className="text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Blog dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsBlogOpen(v => !v)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400 transition-colors"
                  aria-haspopup="true"
                  aria-expanded={isBlogOpen}
                >
                  {t('nav.blog')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isBlogOpen ? 'rotate-180' : ''}`} />
                </button>

                {isBlogOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                    <Link
                      to={`${langPrefix}/blog`}
                      onClick={() => trackNavClick('Blog')}
                      className="block px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors border-b border-gray-100 dark:border-gray-800"
                    >
                      {t('blog.allPosts', 'All Posts')}
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`${langPrefix}/blog/category/${encodeURIComponent(cat)}`}
                        onClick={() => trackNavClick(`Blog:${cat}`)}
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-4">
              <LanguageSwitcher />
              <button
                onClick={toggle}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <LanguageSwitcher />
            <button
              onClick={toggle}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => { trackNavClick(link.name); setIsMenuOpen(false); }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-brand-400 dark:hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Blog section */}
            <div className="px-3 py-2">
              <Link
                to={`${langPrefix}/blog`}
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 mb-2"
              >
                {t('nav.blog')}
              </Link>
              <div className="pl-3 space-y-1 border-l-2 border-brand-200 dark:border-brand-800">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`${langPrefix}/blog/category/${encodeURIComponent(cat)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
