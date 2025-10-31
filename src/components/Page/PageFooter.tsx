import clsx from 'clsx';
import type React from 'react';

import styles from './styles.module.css';

const PageFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <footer {...rest} className={clsx(styles.pageFooter, rest.className)}>
      {children}
    </footer>
  );
};

export default PageFooter;
