import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blog';
import { Calendar, ArrowRight } from 'lucide-react';

export function BlogList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO
        title="MediaGrabber Blog | Tips, Guides & News"
        description="Read the latest tips, guides, and news about downloading videos from YouTube, TikTok, Instagram, and more."
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
          The MediaGrabber Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tips, tricks, and guides on how to get the most out of social media downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
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
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
