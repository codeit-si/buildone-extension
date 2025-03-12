import { MemoryRouter, Route, Routes } from 'react-router';
import Popup from './Popup';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { useStorage } from '@extension/shared';
import { authStorage } from '@extension/storage';
import TanstackQueryProvider from '@src/lib/tanstack-query-provider';
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
