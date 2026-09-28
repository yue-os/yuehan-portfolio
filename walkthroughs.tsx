import React from 'react';
import { createRoot } from 'react-dom/client';
import WalkthroughsPage from './WalkthroughsPage';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

createRoot(rootElement).render(
  <React.StrictMode>
    <WalkthroughsPage />
  </React.StrictMode>,
);
