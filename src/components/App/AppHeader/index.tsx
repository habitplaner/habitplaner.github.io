import { useAppSelector } from '@store/hooks';
import { NavLink } from 'react-router';

import HeaderProfileCard from './components/HeaderProfileCard/HeaderProfileCard';
import styles from './styles.module.css';
import { APP_NAME } from '@const/app.const';

const AppHeader = () => {
  const { user, isAuthenticationLoading } = useAppSelector((s) => s.user);

  return (
    <header className={styles.appHeader}>
      <NavLink to="/" end>
        {APP_NAME}
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
