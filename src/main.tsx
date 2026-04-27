import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './config/i18n';
import { getCurrentLanguage, getLanguageDirection } from './config/i18n';

// Set initial language attributes on HTML element
document.documentElement.lang = getCurrentLanguage();
document.documentElement.dir = getLanguageDirection();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
