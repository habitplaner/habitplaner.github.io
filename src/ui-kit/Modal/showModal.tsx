import { createRoot } from 'react-dom/client';

import type { IModalProps } from '.';
import Modal from '.';
export const showModal = (props: IModalProps) => {
  const el = document.createElement('div');
  document.body.append(el);
  const root = createRoot(el);

  const clean = () => {
    root.unmount();
    document.body.removeChild(el);
  };

  root.render(
    <Modal
      {...props}
      onClose={(e) => {
        clean();
        props?.onClose?.(e);
      }}
    />
  );
};
