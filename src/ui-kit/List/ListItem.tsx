import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IListItemProps extends HTMLAttributes<HTMLLIElement> {
  items?: React.ReactNode;
}

const ListItem: React.FC<IListItemProps> = ({ children, ...rest }) => {
  return (
    <li {...rest} className={clsx(styles.listItem, rest.className)}>
      {children}
    </li>
  );
};

export default ListItem;
