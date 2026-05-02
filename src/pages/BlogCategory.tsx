import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { useLocalizedBlogPosts } from '../data/blogI18n';
import { Calendar, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

const GUIDES_CATEGORY = 'Social Media Download Guides';

export function BlogCategory() {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();
  const allPosts = useLocalizedBlogPosts();

  const decoded = decodeURIComponent(category ?? '');

  // Match against the EN canonical category name for routing stability,
  // but display the localized category label from the first matched post
  const filtered = allPosts.filter(
    p => p.category.toLowerCase() === decoded.toLowerCase()
  );

  if (!decoded || filtered.length === 0) {
    return <Navigate to="/blog" replace />;
  }

  const displayCategory = filtered[0].category;
  const isGuidesCategory = decoded.toLowerCase() === GUIDES_CATEGORY.toLowerCase();

  const pageTitle = isGuidesCategory
    ? t('blog.guidesCategoryTitle', 'Social Media Download Guides')
    : displayCategory;

  const pageDescription = isGuidesCategory
    ? t('blog.guidesCategoryDesc', 'Step-by-step guides to download videos from YouTube, TikTok, Instagram, Snapchat and more — free, fast, and without watermarks.')
    : `${t('blog.browseCategory', 'Browse all')} ${displayCategory} ${t('blog.articlesOn', 'articles on MediaGrabber')}.`;

  const canonicalUrl = `https://mediagrabber.com/blog/category/${encodeURIComponent(decoded)}`;

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://mediagrabber.com/blog' },
      { '@type': 'ListItem', position: 2, name: pageTitle, item: canonicalUrl },
    ],
  };

  const collectionSchema = {
    '@type': 'CollectionPage',
    name: `${pageTitle} — MediaGrabber Blog`,
    description: pageDescription,
    url: canonicalUrl,
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, collectionSchema],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO
        title={`${pageTitle} | MediaGrabber Blog`}
        description={pageDescription}
        schema={schema}
      />

      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors mb-10 font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> {t('blog.backToBlog')}
      </Link>

      {/* Category header */}
      <div className="text-center mb-16">
        {isGuidesCategory && (
          <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
        )}
        <span className="inline-block bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          {displayCategory}
        </span>
        <h1 className="text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
          {pageTitle}
        </h1>
        {isGuidesCategory && (
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            {pageDescription}
          </p>
        )}
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {filtered.length} {filtered.length === 1 ? t('blog.article', 'article') : t('blog.articles', 'articles')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
          >
            <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden block">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>

              <Link to={`/blog/${post.slug}`} className="block mb-3">
                <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 transition-colors mt-auto"
              >
                {t('blog.readMore')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
