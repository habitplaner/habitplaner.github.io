import { useAppSelector } from '@store/hooks';
import { Navigate, Outlet, useLocation } from 'react-router';

export const AuthRequiredRoutes: React.FC = () => {
  const { user, isAuthenticationLoading } = useAppSelector((s) => s.user);
  const location = useLocation();

  if (isAuthenticationLoading) return <div>Loading</div>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // remember original page
    />
  );
};
