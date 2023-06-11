import classNames from 'classnames';
import * as styles from './Modal.module.scss';
import { ReactNode, useEffect } from 'react';
import { Backdrop } from './Backdrop';
import { useCachedState } from '../../hooks/use-cached-state';

type ModalProps = {
  opened?: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export function Modal({
  opened = false,
  children,
  onClose
}: ModalProps) {
  const [internallyOpened, setInternallyOpened] = useCachedState<boolean>(() => opened, [opened]);

  useEffect(() => {
    if (internallyOpened) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [internallyOpened]);

  return (
    <>
      <Backdrop
        opened={internallyOpened}
        onClose={() => {
          setInternallyOpened(false);
          onClose?.();
        }}
      />
      <div
        className={classNames(
          styles.modal,
          internallyOpened && styles.opened
        )}
        data-testid='modal'
      >
        {children}
      </div>
    </>
  )
}
