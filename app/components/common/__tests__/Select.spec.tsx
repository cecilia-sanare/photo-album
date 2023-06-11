import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectItem } from '../Select';
import Chance from 'chance';

const chance = new Chance();

describe('<Select />', () => {
  it('should render the Select', () => {
    const component = render(<Select items={[]}/>);

    expect(component.baseElement).toMatchSnapshot();
  });

  describe('prop(value)', () => {
    it('should select the matching item', () => {
      const expectedItem: SelectItem<string> = {
        label: chance.string(),
        value: chance.string()
      };
      const component = render(<Select items={[expectedItem]} value={expectedItem.value} />);

      expect(component.getByDisplayValue(expectedItem.label)).toBeTruthy();
    });
  });

  describe('prop(onChange)', () => {
    it('should support providing a callback', async () => {
      const onChange = jest.fn();
      const expectedItem: SelectItem<string> = {
        label: chance.word(),
        value: chance.word()
      };

      const component = render(<Select items={[expectedItem]} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);

      await userEvent.selectOptions(component.getByTestId('select'), expectedItem.value);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should support not providing a callback', async () => {
      const expectedItem: SelectItem<string> = {
        label: chance.word(),
        value: chance.word()
      };

      const component = render(<Select items={[expectedItem]} />);

      expect(component.queryByDisplayValue(expectedItem.label)).toBeFalsy();

      await userEvent.selectOptions(component.getByTestId('select'), expectedItem.value);

      expect(component.getByDisplayValue(expectedItem.label)).toBeTruthy();
    });
  });
});
