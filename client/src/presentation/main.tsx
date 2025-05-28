import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { AppContext, createAppDependencies } from '../ioc/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('❌ VITE_API_URL is not set in the environment variables');
}

const CONFIG = {
  apiUrl,
};

console.log(`config: ${JSON.stringify(CONFIG)}`);
const deps = createAppDependencies(import.meta.env.VITE_API_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContext.Provider value={deps}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AppContext.Provider>
  </React.StrictMode>,
);
