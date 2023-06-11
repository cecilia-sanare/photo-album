import * as styles from './Select.module.scss';
import { useCachedState } from '../../hooks/use-cached-state';

export type SelectItem = {
  label: string;
  value: string;
}

type SelectProps = {
  items: SelectItem[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Select({
  items,
  value,
  placeholder,
  onChange
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useCachedState(() => value || '', [value]);

  return (
    <select
      className={styles.select}
      data-testid='select'
      value={selectedValue}
      onChange={(event) => {
        setSelectedValue(event.target.value);
        onChange?.(event.target.value);
      }}
    >
      <option value='' disabled>{placeholder}</option>
      {items.map((item) => (
        <option key={item.value} value={item.value}>{item.label}</option>
      ))}
    </select>
  )
}
