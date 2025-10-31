import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IInputWrapperProps extends HTMLAttributes<HTMLSpanElement> {
  label?: React.ReactNode;
}

const InputWrapper: React.FC<IInputWrapperProps> = ({
  children,
  label,
  ...rest
}) => {
  return (
    <label {...rest} className={clsx(styles.inputWrapper, rest.className)}>
      {label && <small>{label}</small>}
      {children}
    </label>
  );
};

export default InputWrapper;
