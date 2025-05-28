import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import { useAppContext } from '../ioc/AppContext';
import { AuthState, AuthStatus } from './store/AuthStore';
import SplashPage from './pages/SplashPage';
import GlobalLoaderComponent from './components/GlobalLoaderComponent';
import React from 'react';
import LayoutPage from './pages/LayoutPage';

export default function App() {
  const { authStore, loadingStore } = useAppContext();

  const renderRoutes = (authState: AuthState | null) => {
    switch (authState?.status) {
      case AuthStatus.AUTHORIZED:
        return (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<LayoutPage />} />
          </Routes>
        );
      case AuthStatus.UNAUTHORIZED:
        return (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        );
      default:
        return <SplashPage />;
    }
  };

  return (
    <>
      <GlobalLoaderComponent loading={loadingStore.loading} />
      <BrowserRouter>{renderRoutes(authStore.authState.value)}</BrowserRouter>
    </>
  );
}
