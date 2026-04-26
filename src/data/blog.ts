export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string; // Storing as HTML/Markdown string for simplicity
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'how-to-download-youtube-videos-on-iphone-2026',
    title: 'How to download YouTube videos on iPhone (2026 guide)',
    excerpt: 'Step-by-step guide to saving YouTube videos directly to your iPhone camera roll in 2026.',
    date: 'April 26, 2026',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    content: `
      <h2>Saving YouTube Videos to Your iPhone</h2>
      <p>Whether you're traveling, commuting, or just want to save data, downloading YouTube videos to your iPhone is incredibly useful. In 2026, the process is simpler than ever with MediaGrabber.</p>
      
      <h3>Step 1: Get the Video Link</h3>
      <p>Open the YouTube app on your iPhone. Find the video you want, tap the "Share" icon, and select "Copy Link".</p>
      
      <h3>Step 2: Use MediaGrabber in Safari</h3>
      <p>Open Safari and go to MediaGrabber. Paste the link you just copied into the search bar. Our tool will instantly process the video and provide download options.</p>
      
      <h3>Step 3: Download and Save to Files</h3>
      <p>Tap "Download Video". Safari will ask if you want to download the file. Tap "Download". Once finished, tap the Downloads icon next to the address bar, open the video, tap the share sheet, and choose "Save Video" to move it to your Photos app!</p>
    `
  },
  {
    slug: 'best-way-to-download-tiktok-without-watermark',
    title: 'Best way to download TikTok without watermark',
    excerpt: 'Learn the easiest and most reliable method to save TikTok videos cleanly without any watermarks or logos.',
    date: 'April 20, 2026',
    category: 'Tips',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80',
    content: `
      <h2>Why You Need a Watermark-Free Downloader</h2>
      <p>Sharing a TikTok video on Instagram Reels or YouTube Shorts? You'll want it to look pristine. The default TikTok download feature adds a bouncing watermark that can distract viewers and even reduce your reach on other platforms.</p>
      
      <h3>The Ultimate Solution</h3>
      <p>The best way to download TikTok without watermark is using a dedicated online tool like MediaGrabber. We use advanced extraction techniques to pull the original, clean video file directly from TikTok's servers.</p>
      
      <h3>How It Works</h3>
      <ul>
        <li>Tap "Share" on any TikTok video and hit "Copy Link".</li>
        <li>Paste that link into MediaGrabber.</li>
        <li>Hit "Download" and enjoy your high-quality, watermark-free MP4.</li>
      </ul>
      <p>It works perfectly on iOS, Android, and Desktop browsers!</p>
    `
  },
  {
    slug: 'instagram-reels-download-guide',
    title: 'The Ultimate Guide to Saving Instagram Reels',
    excerpt: 'Learn how to download Instagram Reels and IGTV videos directly to your device.',
    date: 'April 15, 2026',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&q=80',
    content: `
      <h2>Instagram Reels are Everywhere</h2>
      <p>Instagram Reels have taken over the platform. If you want to save a tutorial, a funny clip, or a recipe, MediaGrabber is your best friend.</p>
      
      <h3>How to do it</h3>
      <p>Tap the three dots on any Instagram Reel, copy the link, and bring it over to our downloader. You'll get the MP4 file in seconds.</p>
    `
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};
