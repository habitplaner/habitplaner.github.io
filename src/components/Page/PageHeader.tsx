import clsx from 'clsx';
import type React from 'react';

import styles from './styles.module.css';

const PageHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { header?: React.ReactNode }
> = ({ header, children, ...rest }) => {
  return (
    <header {...rest} className={clsx(styles.pageHeader, rest.className)}>
      {header && <h1>{header}</h1>}
      {children}
    </header>
  );
};

export default PageHeader;
