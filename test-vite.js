import { createServer } from 'vite';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  try {
    const { renderToString } = await vite.ssrLoadModule('react-dom/server');
    const React = await vite.ssrLoadModule('react');
    const { default: App } = await vite.ssrLoadModule('./src/App.tsx');

    console.log('Rendering...');
    renderToString(React.createElement(App));
    console.log('Success!');
  } catch (e) {
    console.error('Vite SSR Error:', e);
  } finally {
    vite.close();
  }
}

run();
