import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import React from 'react';

import styles from './styles.module.css';

export interface IModalProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, 'children' | 'title'> {
  children?: React.ReactNode | ((closeFn: () => void) => React.ReactNode);
  header?: React.ReactNode | ((closeFn: () => void) => React.ReactNode);
  footer?: React.ReactNode | ((closeFn: () => void) => React.ReactNode);
  title?: React.ReactNode;
  canClose?: boolean;
  onClose?: React.ReactEventHandler<HTMLDialogElement>;
}

const Modal: React.FC<IModalProps> = ({
  children,
  header,
  footer,
  title = null,
  canClose = true,
  onClose,
  ...rest
}) => {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.showModal();
  }, []);

  const handleClose = () => {
    ref.current?.close();
  };

  return (
    <dialog
      {...rest}
      ref={ref}
      className={clsx(styles.modal, rest.className)}
      onClose={onClose}
    >
      {(header || title || canClose) && (
        <div className={styles.modalHeader}>
          {title && <h5 className={styles.modalTitle}>{title}</h5>}
          <>{typeof header === 'function' ? header(handleClose) : header}</>
          {canClose && (
            <button className={styles.modalClose} onClick={handleClose}>
              ×
            </button>
          )}
        </div>
      )}
      {children && (
        <div className={styles.modalBody}>
          {typeof children === 'function' ? children(handleClose) : children}
        </div>
      )}
      {footer && (
        <div className={styles.modalFooter}>
          {typeof footer === 'function' ? footer(handleClose) : footer}
        </div>
      )}
    </dialog>
  );
};

export default Modal;
