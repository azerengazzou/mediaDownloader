import { createServer } from 'vite';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  try {
    const AppMod = await vite.ssrLoadModule('./src/App.tsx');
    console.log('App Module:', Object.keys(AppMod));
    console.log('App default type:', typeof AppMod.default);

    const BlogListMod = await vite.ssrLoadModule('./src/pages/BlogList.tsx');
    console.log('BlogList Module:', Object.keys(BlogListMod));
    console.log('BlogList export type:', typeof BlogListMod.BlogList);

    const BlogPostMod = await vite.ssrLoadModule('./src/pages/BlogPost.tsx');
    console.log('BlogPost Module:', Object.keys(BlogPostMod));
    console.log('BlogPost export type:', typeof BlogPostMod.BlogPost);

    const BlogDataMod = await vite.ssrLoadModule('./src/data/blog.ts');
    console.log('Blog Data Module:', Object.keys(BlogDataMod));

    console.log('react-helmet-async exports:', Object.keys(await vite.ssrLoadModule('react-helmet-async')));

  } catch (e) {
    console.error('Vite SSR Error:', e);
  } finally {
    vite.close();
  }
}

run();
