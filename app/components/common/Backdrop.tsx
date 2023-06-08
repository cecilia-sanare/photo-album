import classNames from 'classnames';
import * as styles from './Backdrop.module.scss';
import { useCachedState } from '../../hooks/use-cached-state';

type BackdropProps = {
  opened?: boolean;
  onClose?: () => void;
}

export function Backdrop({
  opened = false,
  onClose
}: BackdropProps) {
  const [internallyOpened, setInternallyOpened] = useCachedState<boolean>(() => opened, [opened]);

  return (
    <div
      data-testid='backdrop'
      className={classNames(
        styles.backdrop,
        internallyOpened && styles.opened
      )}
      onClick={() => {
        setInternallyOpened(false);
        onClose?.();
      }}
    />
  )
}
