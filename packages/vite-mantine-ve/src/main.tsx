import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';

ReactDOM.createRoot(
  // eslint-disable-next-line unicorn/prefer-query-selector
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
