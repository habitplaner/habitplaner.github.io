import { NavLink } from 'react-router';

import styles from './styles.module.css';

const AppFooter = () => {
  return (
    <footer className={styles.appFooter}>
      <NavLink to="/about" end>
        ℹ️
      </NavLink>
      <NavLink to="/" end>
        🏡
      </NavLink>

      <NavLink to="/habits" end>
        📋
      </NavLink>
      <NavLink to="/calendar" end>
        🗓️
      </NavLink>
    </footer>
  );
};
export default AppFooter;
