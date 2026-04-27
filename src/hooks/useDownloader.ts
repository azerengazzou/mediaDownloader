import { useState } from 'react';
import { detectPlatform, PlatformConfig } from '../lib/platforms';
import { useAnalytics } from './useAnalytics';
import { useNavigate } from 'react-router-dom';

export interface DownloadOption {
  type: 'video' | 'audio' | 'thumbnail';
  quality: string;
  size?: string;
  url: string;
}

export interface DownloadResult {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  platform: PlatformConfig;
  options: DownloadOption[];
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

// Fetch og:title + og:image via Netlify proxy (for Instagram, Facebook)
async function fetchViaProxy(url: string): Promise<{ title: string | null; thumbnail: string | null }> {
  try {
    const res = await fetch('/api/meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) return { title: null, thumbnail: null };
    return await res.json();
  } catch {
    return { title: null, thumbnail: null };
  }
}

async function fetchMediaInfo(url: string, platform: PlatformConfig): Promise<DownloadResult> {
  let title = `${platform.name} Video`;
  let thumbnail = `https://placehold.co/800x450/1a1a2e/ffffff?text=${encodeURIComponent(platform.name)}`;

  try {
    switch (platform.id) {
      case 'youtube': {
        // Official YouTube oEmbed — public, no key, no CORS
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        );
        if (res.ok) {
          const data = await res.json();
          title = data.title || title;
          const videoId = getYouTubeId(url);
          thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : data.thumbnail_url || thumbnail;
        }
        break;
      }

      case 'tiktok': {
        // Official TikTok oEmbed — public, no key, no CORS
        const res = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
        );
        if (res.ok) {
          const data = await res.json();
          title = data.title || title;
          thumbnail = data.thumbnail_url || thumbnail;
        }
        break;
      }

      case 'twitter': {
        // Official Twitter/X oEmbed — public, no key, no CORS
        const res = await fetch(
          `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`
        );
        if (res.ok) {
          const data = await res.json();
          // Twitter oEmbed returns author_name, not a video title
          title = data.author_name ? `${data.author_name}'s post` : title;
          thumbnail = data.thumbnail_url || thumbnail;
        }
        break;
      }

      case 'instagram':
      case 'facebook': {
        // No public oEmbed without token — use server-side og: meta scraper
        const data = await fetchViaProxy(url);
        title = data.title || title;
        thumbnail = data.thumbnail || thumbnail;
        break;
      }
    }
  } catch {
    // Metadata fetch failed — keep defaults, still show download options
  }

  // Build download options per platform
  const options = buildOptions(url, platform);

  return {
    id: Math.random().toString(36).substring(7),
    title,
    thumbnail,
    platform,
    options,
  };
}

function buildOptions(url: string, platform: PlatformConfig): DownloadOption[] {
  switch (platform.id) {
    case 'youtube': {
      const videoId = getYouTubeId(url);
      const opts: DownloadOption[] = [
        { type: 'video', quality: '1080p (MP4)', url: `https://www.y2mate.com/youtube/${videoId}` },
        { type: 'video', quality: '720p (MP4)', url: `https://www.y2mate.com/youtube/${videoId}` },
        { type: 'audio', quality: 'MP3 Audio', url: `https://www.y2mate.com/youtube-mp3/${videoId}` },
      ];
      if (videoId) {
        opts.push({
          type: 'thumbnail',
          quality: 'HD Thumbnail (JPG)',
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        });
      }
      return opts;
    }

    case 'tiktok':
      return [
        { type: 'video', quality: 'HD (No Watermark)', url: `https://ssstik.io/en?url=${encodeURIComponent(url)}` },
        { type: 'audio', quality: 'MP3 Audio', url: `https://ssstik.io/en?url=${encodeURIComponent(url)}` },
      ];

    case 'instagram':
      return [
        { type: 'video', quality: 'HD Video', url: `https://snapinsta.app/?url=${encodeURIComponent(url)}` },
        { type: 'thumbnail', quality: 'Thumbnail (JPG)', url: `https://snapinsta.app/?url=${encodeURIComponent(url)}` },
      ];

    case 'facebook':
      return [
        { type: 'video', quality: 'HD Video', url: `https://fdown.net/?url=${encodeURIComponent(url)}` },
        { type: 'video', quality: 'SD Video', url: `https://fdown.net/?url=${encodeURIComponent(url)}` },
      ];

    case 'twitter':
      return [
        { type: 'video', quality: 'Best Quality', url: `https://twittervideodownloader.com/?url=${encodeURIComponent(url)}` },
        { type: 'audio', quality: 'MP3 Audio', url: `https://twittervideodownloader.com/?url=${encodeURIComponent(url)}` },
      ];

    default:
      return [{ type: 'video', quality: 'Best Available', url }];
  }
}

export function useDownloader() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<PlatformConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const { trackUrlSubmit, trackError } = useAnalytics();
  const navigate = useNavigate();

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    setPlatform(detectPlatform(newUrl));
    setError(null);
  };

  const processUrl = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    const detected = detectPlatform(url);
    if (!detected) {
      trackError('Unsupported platform or invalid URL');
      const failCount = parseInt(sessionStorage.getItem('failCount') || '0', 10) + 1;
      sessionStorage.setItem('failCount', String(failCount));
      if (failCount >= 2) {
        sessionStorage.removeItem('failCount');
        navigate('/download-ai-video-mp3');
      } else {
        navigate('/convertisseur-video');
      }
      return;
    }

    trackUrlSubmit(detected.id);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const mediaResult = await fetchMediaInfo(url, detected);
      setResult(mediaResult);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(msg);
      trackError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    url,
    platform,
    isLoading,
    error,
    result,
    handleUrlChange,
    processUrl,
    clearResult: () => setResult(null),
  };
}
