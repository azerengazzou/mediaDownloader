import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getPostBySlug } from '../data/blog';
import { Calendar, ArrowLeft, Download } from 'lucide-react';
import { AdBlock } from '../components/layout/AdBlock';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.image,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "MediaGrabber"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        schema={articleSchema}
      />
      
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors mb-8 font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article>
        <header className="mb-10 text-center">
          <span className="inline-block bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-4 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <span>By MediaGrabber Team</span>
          </div>
        </header>

        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-lg"
        />

        <div className="flex flex-col lg:flex-row gap-12">
          <div 
            className="flex-1 prose dark:prose-invert prose-lg max-w-none prose-headings:font-heading prose-a:text-brand-600 dark:prose-a:text-brand-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <AdBlock format="rectangle" />
            
            <div className="bg-brand-50 dark:bg-gray-900 border border-brand-100 dark:border-gray-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Ready to download?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Try MediaGrabber now and download your favorite videos for free.
              </p>
              <Link 
                to="/" 
                className="block w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
              >
                Go to Downloader
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
