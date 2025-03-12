import { MemoryRouter, Route, Routes } from 'react-router';
import Popup from './Popup';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { useStorage } from '@extension/shared';
import { authStorage } from '@extension/storage';
import TanstackQueryProvider from '@src/lib/tanstack-query-provider';
import { reissueAccessToken } from './services/auth/token';
interface AuthContextProps {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
  authenticated: false,
  setAuthenticated: () => {},
});

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState(true);
  const auth = useStorage(authStorage);

  useEffect(() => {
    const getNewToken = async () => {
      const refreshToken = await chrome.cookies.get({ name: 'REFRESH_TOKEN', url: 'https://dev.api.buildone.me' });
      if (!refreshToken) {
        return await authStorage.removeAccessToken();
      }
      const newAccessToken = await reissueAccessToken();

      if (newAccessToken) {
        return await authStorage.setAccessToken(newAccessToken);
      }
      return await authStorage.removeAccessToken();
    };
    if (!auth) {
      getNewToken();
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [auth]);

  return <AuthContext.Provider value={{ authenticated, setAuthenticated }}>{children}</AuthContext.Provider>;
};

export default function Router() {
  return (
    <MemoryRouter>
      <TanstackQueryProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Popup />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </TanstackQueryProvider>
    </MemoryRouter>
  );
}
