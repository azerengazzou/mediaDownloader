import React from 'react';
import { Youtube, Instagram, Facebook, Twitter, Music2 } from 'lucide-react';

export type Platform =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'unknown';

export interface PlatformConfig {
  id: Platform;
  name: string;
  iconKey: Platform;
  color: string;
  regex: RegExp[];
}

// Icon mapping
const iconMap: Record<Platform, React.FC<{ className?: string }>> = {
  youtube: Youtube,
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  unknown: Music2,
};

export function getPlatformIcon(platform: PlatformConfig | null): React.FC<{ className?: string }> {
  if (!platform) return Music2;
  return iconMap[platform.iconKey] || Music2;
}

export const platforms: PlatformConfig[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    iconKey: 'youtube',
    color: 'text-red-500',
    regex: [
      /youtube\.com\/watch\?v=/,
      /youtube\.com\/shorts\//,
      /youtu\.be\//
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    iconKey: 'tiktok',
    color: 'text-black dark:text-white',
    regex: [
      /tiktok\.com\/@.*\/video\//,
      /vm\.tiktok\.com\//,
      /vt\.tiktok\.com\//
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    iconKey: 'instagram',
    color: 'text-pink-500',
    regex: [
      /instagram\.com\/p\//,
      /instagram\.com\/reel\//,
      /instagram\.com\/tv\//
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    iconKey: 'facebook',
    color: 'text-blue-600',
    regex: [
      /facebook\.com\/.*\/videos\//,
      /fb\.watch\//
    ]
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    iconKey: 'twitter',
    color: 'text-blue-400 dark:text-gray-200',
    regex: [
      /twitter\.com\/.*\/status\//,
      /x\.com\/.*\/status\//
    ]
  }
];

export function detectPlatform(url: string): PlatformConfig | null {
  if (!url) return null;

  for (const platform of platforms) {
    if (platform.regex.some((r) => r.test(url))) {
      return platform;
    }
  }

  return null;
}