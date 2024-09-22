import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { SlidesProvider } from './context/slides-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SlidesProvider>
      <App />
    </SlidesProvider>
  </React.StrictMode>
);

