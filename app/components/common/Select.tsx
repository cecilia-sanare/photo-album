import * as styles from './Select.module.scss';
import { useCachedState } from '../../hooks/use-cached-state';

type Primitive = string | number | boolean

export type SelectItem<T extends Primitive> = {
  label: string;
  value: T;
}

type SelectProps<T extends Primitive> = {
  items: SelectItem<T>[];
  value?: T;
  placeholder?: string;
  onChange?: (value: T) => void;
}

export function Select<T extends Primitive>({
  items,
  value,
  placeholder,
  onChange
}: SelectProps<T>) {
  const [selectedValue, setSelectedValue] = useCachedState<string>(() => value?.toString() ?? '', [value]);

  return (
    <select
      className={styles.select}
      data-testid='select'
      value={selectedValue}
      onChange={(event) => {
        const match = items.find((item) => item.value.toString() === event.target.value);

        setSelectedValue(match.value.toString());
        onChange?.(match.value);
      }}
    >
      <option value='' disabled>{placeholder}</option>
      {items.map((item) => (
        <option key={item.value.toString()} value={item.value.toString()}>{item.label}</option>
      ))}
    </select>
  )
}
