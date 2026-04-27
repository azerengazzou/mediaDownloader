import React from 'react';
import { SEO } from '../components/SEO';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAnalytics } from '../hooks/useAnalytics';

const faqs = [
  {
    question: "Is MediaGrabber really free?",
    answer: "Yes! MediaGrabber is 100% free to use. We do not charge any fees for downloading videos or audio from our supported platforms."
  },
  {
    question: "What platforms do you support?",
    answer: "We currently support downloading from YouTube, TikTok, Instagram, Facebook, and X (Twitter). We are constantly working on adding more platforms."
  },
  {
    question: "Can I download videos in HD or 4K?",
    answer: "Absolutely. When you paste a URL, we fetch all available quality options. If the original video is in 4K, you will have the option to download it in 4K."
  },
  {
    question: "Is it legal to download videos?",
    answer: "Downloading videos for personal, offline use is generally acceptable. However, you should not distribute or use copyrighted material for commercial purposes without the owner's permission."
  },
  {
    question: "Where are my downloads saved?",
    answer: "Files are saved to your browser's default download folder, typically the 'Downloads' folder on your computer or device."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const { trackFaqOpen } = useAnalytics();

  const handleToggle = (index: number) => {
    if (openIndex !== index) trackFaqOpen(faqs[index].question);
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about using MediaGrabber to download videos from YouTube, TikTok, and Instagram."
        schema={faqSchema}
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Everything you need to know about using MediaGrabber.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-brand-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            <div 
              className={cn(
                "px-6 text-gray-600 dark:text-gray-400 transition-all duration-300 ease-in-out",
                openIndex === index ? "pb-6 max-h-[500px] opacity-100" : "max-h-0 opacity-0 pb-0 overflow-hidden"
              )}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
