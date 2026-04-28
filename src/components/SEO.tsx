import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getCurrentLanguage } from '../config/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  schema?: Record<string, unknown>;
  keywords?: string;
}

export function SEO({
  title = "MediaGrabber — Free Video Downloader for YouTube & TikTok",
  description = "Download videos, reels, shorts, and MP3s from YouTube, TikTok, Instagram, and more in high quality. 100% free and secure.",
  canonical,
  schema,
  keywords
}: SEOProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || getCurrentLanguage();
  const baseUrl = "https://mediagrabber.app";

  // Build the canonical URL with language prefix
  const buildCanonicalUrl = (lang: string) => {
    const pathname = location.pathname.split('/').slice(2).join('/') || '';
    return `${baseUrl}/${lang}${pathname ? '/' + pathname : ''}`;
  };

  const currentCanonical = canonical || buildCanonicalUrl(currentLang);
  const fullTitle = title.includes('MediaGrabber') ? title : `${title} | MediaGrabber`;

  // Generate hreflang links for all supported languages
  const supportedLangs = ['en', 'fr', 'ar'];
  const hreflangs = supportedLangs.map(lang => ({
    lang,
    href: buildCanonicalUrl(lang)
  }));

  // Add x-default for automatic detection
  hreflangs.push({
    lang: 'x-default',
    href: baseUrl
  });

  // Default Software Application Schema with multilingual support
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MediaGrabber",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "inLanguage": currentLang,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": description,
    "url": currentCanonical,
    "image": `${baseUrl}/MediaGrabberIcon.png`
  };

  // Organization identity schema to improve identity signals
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MediaGrabber",
    "url": baseUrl,
    "logo": `${baseUrl}/MediaGrabberIcon.png`,
    "sameAs": [
      "https://twitter.com/mediagrabber",
      "https://www.facebook.com/mediagrabber",
      "https://www.linkedin.com/company/mediagrabber"
    ]
  };

  // WebSite schema to tie the pages together and improve search identity
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MediaGrabber",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Combine schemas: organization, website, application, and optionally user-provided schema
  const combinedSchema: Array<Record<string, unknown>> = [organizationSchema, websiteSchema, applicationSchema];
  if (schema) combinedSchema.push(schema as Record<string, unknown>);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="language" content={currentLang} />
      <link rel="canonical" href={currentCanonical} />

      {/* hreflang links for SEO - tells search engines about language versions */}
      {hreflangs.map(({ lang, href }) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={href}
        />
      ))}

      {/* Open Graph with language support */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentCanonical} />
      <meta property="og:image" content={`${baseUrl}/MediaGrabberIcon.png`} />
      <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : currentLang === 'fr' ? 'fr_FR' : 'ar_SA'} />

      {/* Alternative locales for other language versions */}
      {supportedLangs.filter(lang => lang !== currentLang).map(lang => (
        <meta
          key={`og:locale:alternate:${lang}`}
          property="og:locale:alternate"
          content={lang === 'en' ? 'en_US' : lang === 'fr' ? 'fr_FR' : 'ar_SA'}
        />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/MediaGrabberIcon.png`} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(combinedSchema)}
      </script>

      {/* Mobile Web App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="MediaGrabber" />
    </Helmet>
  );
}
