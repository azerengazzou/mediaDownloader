# Internationalization (i18n) Setup Guide

This project uses **i18next** with **react-i18next** for comprehensive internationalization support with automatic browser language detection, RTL support for Arabic, and full SEO optimization for multilingual content.

## 🌍 Supported Languages

- **English (EN)** - Default language
- **French (FR)** - French
- **Arabic (AR)** - Arabic with RTL support

## 📁 File Structure

```
src/
├── config/
│   └── i18n.ts                 # i18n configuration and helper functions
├── locales/
│   ├── en.json                 # English translations
│   ├── fr.json                 # French translations
│   └── ar.json                 # Arabic translations
├── components/
│   ├── LanguageSwitcher.tsx    # Language selector component
│   ├── SEO.tsx                 # Updated with multilingual SEO
│   └── layout/
│       └── Navbar.tsx          # Updated with language routing
├── App.tsx                      # Updated with language routes and detection
└── main.tsx                     # Updated with i18n initialization
```

## 🚀 Features

### Automatic Language Detection
The system detects user's preferred language in this order:
1. **localStorage** - Previously selected language
2. **Browser Navigator** - Browser's language setting
3. **HTML `lang` attribute** - Fallback detection

### Language-Based URL Routing
URLs include language prefix for SEO:
- `/en` - English pages
- `/fr` - French pages
- `/ar` - Arabic pages

Examples:
- `https://mediagrabber.app/en` → English home
- `https://mediagrabber.app/fr/platforms` → French platforms page
- `https://mediagrabber.app/ar/faq` → Arabic FAQ page

### RTL Support for Arabic
Automatically handles:
- `dir="rtl"` attribute on `<html>` element
- CSS flexbox direction reversal
- Language switcher component positioning

### SEO Optimization

#### hreflang Links
Search engines are informed about language alternatives via `hreflang` meta tags:
```html
<link rel="alternate" hrefLang="en" href="https://mediagrabber.app/en" />
<link rel="alternate" hrefLang="fr" href="https://mediagrabber.app/fr" />
<link rel="alternate" hrefLang="ar" href="https://mediagrabber.app/ar" />
<link rel="alternate" hrefLang="x-default" href="https://mediagrabber.app" />
```

#### Open Graph Locale Support
Proper `og:locale` and `og:locale:alternate` meta tags for social media sharing:
```html
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="fr_FR" />
<meta property="og:locale:alternate" content="ar_SA" />
```

#### JSON-LD Schema
Schema.org microdata includes `inLanguage` property for search engines.

#### Canonical URLs
Each language version has its own canonical URL for proper indexing:
```html
<link rel="canonical" href="https://mediagrabber.app/en/platforms" />
```

## 💻 Usage Examples

### Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
}
```

### Programmatic Language Switching

```tsx
import { changeLanguage, getCurrentLanguage } from '../config/i18n';

// Change language
await changeLanguage('fr');

// Get current language
const lang = getCurrentLanguage();

// Get language direction (LTR or RTL)
const dir = getLanguageDirection();

// Get language name for display
const name = getLanguageName('ar'); // Returns "العربية"
```

### Adding New Translations

1. **Add to English (`en.json`)**:
```json
{
  "mySection": {
    "myKey": "Hello, World!"
  }
}
```

2. **Add to French (`fr.json`)**:
```json
{
  "mySection": {
    "myKey": "Bonjour, le monde!"
  }
}
```

3. **Add to Arabic (`ar.json`)**:
```json
{
  "mySection": {
    "myKey": "مرحبا بالعالم!"
  }
}
```

4. **Use in component**:
```tsx
const { t } = useTranslation();
<h1>{t('mySection.myKey')}</h1>
```

## 🔧 Configuration Details

### Language Detection Order
Located in `src/config/i18n.ts`:
```typescript
detection: {
  order: ['localStorage', 'navigator', 'htmlTag'],
  caches: ['localStorage'],
  lookupLocalStorage: 'i18nLanguage',
}
```

### Supported Languages
```typescript
const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'];
const DEFAULT_LANGUAGE = 'en';
```

### Interpolation
Supports dynamic content:
```json
{
  "welcome": "Welcome, {{name}}!"
}
```

Usage:
```tsx
t('welcome', { name: 'John' })
// Output: "Welcome, John!"
```

## 📊 SEO Best Practices Implemented

✅ **Canonical URLs** - Prevent duplicate content penalties
✅ **hreflang Tags** - Tell Google about language versions
✅ **Language Meta Tags** - `lang` attribute on HTML element
✅ **Open Graph Locales** - Proper social media sharing
✅ **JSON-LD Schema** - Structured data with language info
✅ **URL Structure** - Language in path `/en/`, `/fr/`, `/ar/`
✅ **Auto Detection** - Users see preferred language automatically
✅ **Mobile Optimization** - Mobile-friendly meta tags

## 🔍 Testing Language Features

### Test Auto Detection
1. Change browser language settings
2. Clear localStorage
3. Visit `https://mediagrabber.app/`
4. Should auto-detect your language

### Test Language Switcher
1. Use the globe icon in navbar
2. Select different language
3. URL updates with language prefix
4. HTML `lang` and `dir` attributes update
5. All content translates

### Test SEO
1. Check page source for `hreflang` tags
2. Verify `og:locale` meta tags
3. Check canonical URL is correct
4. Validate with Google Search Console

## 🐛 Debugging

Enable missing translation warnings (development only):
```typescript
// In src/config/i18n.ts
saveMissing: true, // Set to false in production
```

Check current language:
```typescript
import i18n from 'i18next';
console.log(i18n.language); // Current language code
```

## 📱 Browser Language Detection

Automatic detection checks:
- System language setting
- Browser language preference
- Previously selected language (localStorage)

Users can override with the Language Switcher component.

## 🚀 Performance Considerations

- **Lazy Loading**: Translations loaded on demand
- **Caching**: User's language preference cached in localStorage
- **No Suspense**: React Suspense disabled for better compatibility
- **Small Bundle**: Only active language translations sent to browser

## 🔐 Security

- All text properly escaped to prevent XSS
- No user input in translation keys
- Translation files are static JSON (no code execution)
- RTL implementation uses CSS, not dynamic HTML manipulation

## 📝 Translation File Structure

Each translation file follows this structure:

```json
{
  "site": {},           // Site-wide strings
  "nav": {},            // Navigation
  "hero": {},           // Hero section
  "download": {},       // Download component
  "history": {},        // History section
  "platforms": {},      // Platforms
  "faq": {},            // FAQ
  "footer": {},         // Footer
  "errors": {},         // Error messages
  "success": {},        // Success messages
  "blog": {},           // Blog related
  "static": {},         // Static pages
  "seo": {}             // SEO-only content
}
```

## 🔗 Useful Links

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Language Codes (ISO 639-1)](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [hreflang Implementation](https://support.google.com/webmasters/answer/189077)
- [RTL Best Practices](https://www.w3.org/International/questions/qa-html-dir)

## ✅ Checklist for Adding New Pages

When adding a new page:

- [ ] Create translation keys in all three language files
- [ ] Import `useTranslation` hook
- [ ] Replace hardcoded strings with `t()` calls
- [ ] Update SEO component with translated title/description
- [ ] Test language switching
- [ ] Verify URL has language prefix
- [ ] Check console for missing translation warnings
- [ ] Validate hreflang tags in page source

## 🤝 Contributing Translations

When updating translations:

1. Keep key names consistent across all languages
2. Maintain formatting (newlines, spacing)
3. Test in actual application, not just JSON files
4. Use Translation Memory (TM) tools for consistency
5. Have native speakers review translations
6. Document any context-specific translations

---

**Last Updated**: April 2024
**Maintained by**: Development Team
