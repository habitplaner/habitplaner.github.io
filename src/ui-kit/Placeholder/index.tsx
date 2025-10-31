import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  
}

const Placeholder: React.FC<IPlaceholderProps> = ({ children, ...rest }) => {
  return (
    <div
      {...rest}
      className={clsx(
        styles.placeholder,
        rest.className
      )}
    >
      {children}
    </div>
  );
};

export default Placeholder;
