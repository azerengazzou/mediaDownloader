import { useTranslation } from 'react-i18next';
import { blogPosts, BlogPostMeta } from './blog';
import enBlogPosts from '../locales/blog-posts/en.json';
import frBlogPosts from '../locales/blog-posts/fr.json';
import arBlogPosts from '../locales/blog-posts/ar.json';

type BlogPostTranslations = Record<string, {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
}>;

const translations: Record<string, BlogPostTranslations> = {
  en: enBlogPosts,
  fr: frBlogPosts,
  ar: arBlogPosts,
};

function getLocalizedPost(post: BlogPostMeta, lang: string): BlogPostMeta {
  const t = translations[lang]?.[post.slug] ?? translations['en'][post.slug];
  if (!t) return post;
  return { ...post, title: t.title, excerpt: t.excerpt, date: t.date, category: t.category, content: t.content };
}

export function useLocalizedBlogPosts(): BlogPostMeta[] {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) ?? 'en';
  return blogPosts.map(post => getLocalizedPost(post, lang));
}

export function useBlogCategories(): string[] {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) ?? 'en';
  return [...new Set(blogPosts.map(post => {
    const t = translations[lang]?.[post.slug] ?? translations['en'][post.slug];
    return t?.category ?? post.category;
  }))];
}

export function useLocalizedBlogPost(slug: string): BlogPostMeta | undefined {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) ?? 'en';
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return undefined;
  return getLocalizedPost(post, lang);
}
