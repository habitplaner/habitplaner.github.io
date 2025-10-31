import type { IUser } from '@t/user.types';
import React from 'react';

import styles from './styles.module.css';

const HeaderProfileCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className={styles.headerProfileCard}>
      <small>{user.fullName}</small>
      <div className={styles.ava} style={{backgroundImage: `url('${user.photo}')`}} />
    </div>
  );
};

export default HeaderProfileCard;
