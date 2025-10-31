import clsx from 'clsx';
import type React from 'react';

import styles from './styles.module.css';

const PageContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <article {...rest} className={clsx(styles.pageContainer, rest.className)}>
      {children}
    </article>
  );
};

export default PageContainer;
