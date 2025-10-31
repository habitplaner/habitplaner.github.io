import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IListProps extends HTMLAttributes<HTMLUListElement> {
  border?: boolean;
}

const List: React.FC<IListProps> = ({ border, children, ...rest }) => {
  return (
    <ul
      {...rest}
      className={clsx(styles.list, border && styles.bordered, rest.className)}
    >
      {children}
    </ul>
  );
};

export default List;
