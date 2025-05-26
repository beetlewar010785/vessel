import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../presentation/pages/LoginPage';
import WelcomePage from '../presentation/pages/WelcomePage';
import { useAppContext } from '../ioc/AppContext';
import { AuthState } from '../presentation/store/AuthStore';
import SplashPage from '../presentation/pages/SplashPage';

export default function App() {
  const { authStore } = useAppContext();

  return (
    <BrowserRouter>
      {authStore.authState.value === AuthState.UNKNOWN && <SplashPage />}

      {authStore.authState.value === AuthState.AUTHORIZED && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<WelcomePage />} />
        </Routes>
      )}

      {authStore.authState.value === AuthState.UNAUTHORIZED && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
