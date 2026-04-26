import { useState } from 'react';
import { detectPlatform, PlatformConfig } from '../lib/platforms';

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

export function useDownloader() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<PlatformConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);

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
      setError('Unsupported platform or invalid URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // MOCK API CALL
      // In a real application, this would call your backend which interacts with yt-dlp, Cobalt, etc.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResult: DownloadResult = {
        id: Math.random().toString(36).substring(7),
        title: `Sample ${detected.name} Video`,
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
        duration: '04:20',
        platform: detected,
        options: [
          { type: 'video', quality: '1080p (MP4)', size: '45 MB', url: '#' },
          { type: 'video', quality: '720p (MP4)', size: '22 MB', url: '#' },
          { type: 'audio', quality: '320kbps (MP3)', size: '6 MB', url: '#' },
          { type: 'thumbnail', quality: 'HD (JPG)', size: '1.2 MB', url: '#' },
        ]
      };
      
      setResult(mockResult);
      
      // We will handle saving to history later using another hook or context
    } catch {
      setError('An error occurred while fetching the video. Please try again.');
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
    clearResult: () => setResult(null)
  };
}
