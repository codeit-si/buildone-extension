import { useStorage } from '@extension/shared';
import { authStorage } from '@extension/storage';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const auth = useStorage(authStorage);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
