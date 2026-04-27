import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';
import arTranslations from '../locales/ar.json';

// Language detection order
const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'];
const DEFAULT_LANGUAGE = 'en';

i18n
    // Use the language detector plugin
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
        resources: {
            en: { translation: enTranslations },
            fr: { translation: frTranslations },
            ar: { translation: arTranslations },
        },

        // Fallback language
        fallbackLng: DEFAULT_LANGUAGE,

        // Supported languages
        supportedLngs: SUPPORTED_LANGUAGES,

        // Namespace configuration
        ns: ['translation'],
        defaultNS: 'translation',

        // Enable for development to see missing keys
        saveMissing: false,
        missingKeyHandler: (lngs, _ns, key) => {
            console.warn(`Missing translation: ${key} for language(s): ${lngs}`);
        },

        // Language detector options
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nLanguage',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,
        },

        // Interpolation options for dynamic content
        interpolation: {
            escapeValue: false, // React already escapes values
            formatSeparator: ',',
        },

        // React options
        react: {
            useSuspense: false, // Avoid suspense for better compatibility
        },
    });

/**
 * Get the current language
 */
export function getCurrentLanguage(): string {
    return i18n.language || DEFAULT_LANGUAGE;
}

/**
 * Get the language direction (LTR or RTL)
 */
export function getLanguageDirection(): 'ltr' | 'rtl' {
    const lang = getCurrentLanguage();
    return lang === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Get the language name for display
 */
export function getLanguageName(lang: string): string {
    const names: Record<string, string> = {
        en: 'English',
        fr: 'Français',
        ar: 'العربية',
    };
    return names[lang] || lang;
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
}

/**
 * Change the current language
 */
export async function changeLanguage(lang: string): Promise<void> {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        console.warn(`Language ${lang} is not supported`);
        return;
    }
    await i18n.changeLanguage(lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    // Update HTML dir attribute for RTL languages
    document.documentElement.dir = getLanguageDirection();
    // Store preference in localStorage
    localStorage.setItem('i18nLanguage', lang);
}

export default i18n;
