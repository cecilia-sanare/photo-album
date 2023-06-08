import * as styles from './ModalHeader.module.scss';
import { ReactNode } from 'react';

type ModalHeaderProps = {
  children: ReactNode;
  onClose: () => void;
}

export function ModalHeader({
  children,
  onClose
}: ModalHeaderProps) {
  return (
    <div className={styles.header}>
      {children}
      <div
        data-testid='modal-close'
        className={styles.close}
        onClick={() => onClose()}
      >
        x
      </div>
    </div>
  )
}
