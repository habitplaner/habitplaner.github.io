import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import { ButtonVariant } from '.';
import styles from './styles.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<IButtonProps> = ({ children, variant, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        styles.button,
        {
          [styles.primary]: variant === ButtonVariant.primary,
          [styles.secondary]: variant === ButtonVariant.secondary,
          [styles.transparent]: variant === ButtonVariant.transparent,
        },
        rest.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
