import * as styles from './ModalContent.module.scss';
import { ReactNode } from 'react';

type ModalContentProps = {
  children: ReactNode;
}

export function ModalContent({
  children
}: ModalContentProps) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  )
}
