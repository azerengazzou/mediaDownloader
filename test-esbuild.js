import * as esbuild from 'esbuild';
import path from 'path';

async function build() {
  await esbuild.build({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    outfile: 'dist/test.mjs',
    format: 'esm',
    external: ['react', 'react-dom/client', 'react-router-dom', 'react-helmet-async', 'lucide-react']
  });
  console.log('Build done, running...');
  await import(path.resolve('dist/test.mjs'));
}

build().catch(console.error);
