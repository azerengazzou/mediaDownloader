import fs from 'fs';
import path from 'path';

const filesToFix = [
  'src/App.tsx',
  'src/components/downloader/DownloadCard.tsx',
  'src/components/downloader/HistoryList.tsx',
  'src/components/layout/AdBlock.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/Layout.tsx',
  'src/components/SEO.tsx',
  'src/pages/BlogList.tsx',
  'src/pages/BlogPost.tsx',
  'src/pages/Platforms.tsx',
  'src/pages/Static.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace("import React from 'react';\n", "");
    fs.writeFileSync(filePath, content);
  }
});
