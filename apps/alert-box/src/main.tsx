import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DonationSettingProvider } from './contexts/donation-settings-context.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DonationSettingProvider>
      <App />
    </DonationSettingProvider>
  </React.StrictMode>
);
