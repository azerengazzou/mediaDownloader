// Typed wrapper around window.gtag — never throws, safe if GA fails to load
declare function gtag(...args: unknown[]): void;

function track(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, params);
    }
  } catch {
    // Silently fail — never break the app
  }
}

export function useAnalytics() {
  const trackPageView = (path: string) => {
    track('page_view', { page_path: path });
  };

  const trackUrlSubmit = (platform: string) => {
    track('url_submit', { platform });
  };

  const trackDownloadClick = (platform: string, type: string, quality: string) => {
    track('download_click', { platform, type, quality });
  };

  const trackError = (message: string) => {
    track('download_error', { error_message: message });
  };

  const trackPasteClick = () => {
    track('paste_click');
  };

  const trackNavClick = (label: string) => {
    track('nav_click', { label });
  };

  const trackBlogRead = (slug: string, title: string) => {
    track('blog_read', { slug, title });
  };

  const trackFaqOpen = (question: string) => {
    track('faq_open', { question });
  };

  return {
    trackPageView,
    trackUrlSubmit,
    trackDownloadClick,
    trackError,
    trackPasteClick,
    trackNavClick,
    trackBlogRead,
    trackFaqOpen,
  };
}
