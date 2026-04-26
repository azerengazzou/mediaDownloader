import { SEO } from '../components/SEO';

interface StaticPageProps {
  type: 'terms' | 'privacy' | 'contact';
}

export function StaticPage({ type }: StaticPageProps) {
  const content = {
    terms: {
      title: "Terms of Service",
      description: "Read the terms and conditions for using MediaGrabber.",
      body: (
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using MediaGrabber, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.</p>
          
          <h2>2. Description of Service</h2>
          <p>MediaGrabber provides a tool to download videos and audio from publicly accessible social media platforms. We do not host any of the media files on our servers.</p>
          
          <h2>3. User Responsibilities</h2>
          <p>You agree to use MediaGrabber only for lawful purposes. You are solely responsible for ensuring you have the right to download and use any content you access through our service. Do not download copyrighted material without permission.</p>
          
          <h2>4. Disclaimer of Warranties</h2>
          <p>The service is provided "as is" without warranty of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
        </div>
      )
    },
    privacy: {
      title: "Privacy Policy",
      description: "Learn how we handle your data at MediaGrabber.",
      body: (
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We do not collect personal information unless you explicitly provide it (e.g., through a contact form). We may use cookies and similar tracking technologies (like Google Analytics) to track website usage and improve our service.</p>
          
          <h2>2. How We Use Information</h2>
          <p>Any non-personal information collected is used to understand how visitors use our website and to display relevant advertisements (via Google AdSense).</p>
          
          <h2>3. Third-Party Services</h2>
          <p>We use third-party services like Google Analytics and Google AdSense, which may use cookies to collect data about your activities on our site and other sites to provide personalized advertising.</p>
          
          <h2>4. Your Consent</h2>
          <p>By using our site, you consent to our privacy policy.</p>
        </div>
      )
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch with the MediaGrabber team.",
      body: (
        <div className="prose dark:prose-invert max-w-none">
          <p>Have questions, suggestions, or issues? We'd love to hear from you.</p>
          
          <form className="max-w-md mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea rows={4} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2"></textarea>
            </div>
            <button className="bg-brand-500 hover:bg-brand-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>
      )
    }
  };

  const current = content[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO title={current.title} description={current.description} />
      
      <h1 className="text-4xl font-bold font-heading mb-8 text-gray-900 dark:text-white">
        {current.title}
      </h1>
      
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
        {current.body}
      </div>
    </div>
  );
}
