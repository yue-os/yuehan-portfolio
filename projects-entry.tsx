import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectsPage from './ProjectsPage';
import './index.css';
import { initializePageTransitions } from './pageTransitions';

initializePageTransitions();
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

createRoot(rootElement).render(
  <React.StrictMode>
    <ProjectsPage />
  </React.StrictMode>,
);
