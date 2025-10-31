import type { IUser } from '@t/user.types';
import React from 'react';

import styles from './styles.module.css';

const HeaderProfileCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className={styles.headerProfileCard}>
      <small>{user.fullName}</small>
      <img src={user.photo} height={36} width={36} alt="" />
    </div>
  );
};

export default HeaderProfileCard;
