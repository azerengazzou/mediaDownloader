import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { getSupportedLanguages, getLanguageName, changeLanguage, getCurrentLanguage } from '../config/i18n';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const supportedLanguages = getSupportedLanguages();
    const currentLanguage = i18n.language || getCurrentLanguage();

    const handleLanguageChange = async (lang: string) => {
        if (lang === currentLanguage) {
            setIsOpen(false);
            return;
        }

        // Change language
        await changeLanguage(lang);

        // Update URL with new language prefix
        const pathname = location.pathname;
        const pathParts = pathname.split('/').filter(Boolean);

        // Remove old language prefix if exists
        const oldLangIndex = pathParts.findIndex(part => supportedLanguages.includes(part));
        if (oldLangIndex !== -1) {
            pathParts.splice(oldLangIndex, 1);
        }

        // Build new path with new language prefix
        const newPath = `/${lang}${pathParts.length > 0 ? '/' + pathParts.join('/') : ''}`;
        navigate(newPath);

        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Select language"
                aria-label="Language selector"
                aria-expanded={isOpen}
            >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{getLanguageName(currentLanguage)}</span>
                <span className="sm:hidden">{currentLanguage.toUpperCase()}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                        <div className="py-1">
                            {supportedLanguages.map((lang: string) => (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${lang === currentLanguage
                                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    aria-label={`Switch to ${getLanguageName(lang)}`}
                                >
                                    <span className="flex items-center justify-between">
                                        <span>{getLanguageName(lang)}</span>
                                        {lang === currentLanguage && <span className="text-brand-600 dark:text-brand-400">✓</span>}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
