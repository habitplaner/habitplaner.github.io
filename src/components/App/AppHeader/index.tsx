import { useAppSelector } from '@store/hooks';
import { NavLink } from 'react-router';

import HeaderProfileCard from './components/HeaderProfileCard/HeaderProfileCard';
import styles from './styles.module.css';

const AppHeader = () => {
  const { user, isAuthenticationLoading } = useAppSelector((s) => s.user);

  return (
    <header className={styles.appHeader}>
      <NavLink to="/" end>
        AppName
      </NavLink>

      {!isAuthenticationLoading && user && (
        <NavLink to="/profile" end>
          <HeaderProfileCard user={user} />
        </NavLink>
      )}
      {!isAuthenticationLoading && !user && (
        <NavLink to="/login" end>
          login
        </NavLink>
      )}
    </header>
  );
};
export default AppHeader;
