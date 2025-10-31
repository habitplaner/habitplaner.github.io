import clsx from 'clsx';
import type React from 'react';

import styles from './styles.module.css';

const PageBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <section {...rest} className={clsx(styles.pageBody, rest.className)}>
      {children}
    </section>
  );
};

export default PageBody;
