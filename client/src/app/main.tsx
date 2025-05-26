import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CONFIG } from './config';
import { SnackbarProvider } from '../presentation/providers/SnackbarProvider';
import { AppContext, createAppDependencies } from '../ioc/AppContext';
import { GlobalLoader } from '../presentation/components/GlobalLoader';

console.log(`config: ${JSON.stringify(CONFIG)}`);
const deps = createAppDependencies(import.meta.env.VITE_API_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContext.Provider value={deps}>
      <SnackbarProvider>
        <GlobalLoader />
        <App />
      </SnackbarProvider>
    </AppContext.Provider>
  </React.StrictMode>,
);
