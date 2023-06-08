import React from 'react';
import * as styles from './Input.module.scss';
import classNames from 'classnames';
import { useCachedState } from '../../hooks/use-cached-state';

type InputProps = {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input({
  className,
  value,
  onChange,
  ...extraProps
}: InputProps) {
  const [internalValue, setInternalValue] = useCachedState<string | null>(() => value, [value]);

  return (
    <input
      className={classNames(
        styles.input,
        className
      )}
      value={internalValue}
      onChange={(event) => {
        setInternalValue(event.target.value);
        onChange?.(event.target.value);
      }}
      {...extraProps}
    />
  );
}
