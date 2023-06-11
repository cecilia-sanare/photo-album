import { fireEvent, render } from '@testing-library/react';
import { Input } from '../Input';
import Chance from 'chance';

const chance = new Chance();

describe('<Input />', () => {
  it('should render the input', () => {
    const component = render(<Input />);

    expect(component.baseElement).toMatchSnapshot();
  });

  describe('prop(value)', () => {
    it('should support providing a value', () => {
      const expectedValue = chance.string();

      const component = render(<Input value={expectedValue} />);

      expect(component.getByDisplayValue(expectedValue)).toBeTruthy();
    });
  });

  describe('prop(onChange)', () => {
    it('should support providing an onChange callback', async () => {
      const onChange = jest.fn();
      const expectedValue = chance.string();

      const component = render(<Input onChange={onChange} />);
      const input = component.getByTestId('input');

      expect(onChange).toHaveBeenCalledTimes(0);

      await fireEvent.change(input, {target: {value: expectedValue}})

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expectedValue);
    });

    it('should support not providing an onChange callback', async () => {
      const expectedValue = chance.string();

      const component = render(<Input />);
      const input = component.getByTestId('input');

      expect(component.queryByDisplayValue(expectedValue)).toBeFalsy();

      await fireEvent.change(input, {target: {value: expectedValue}})

      expect(component.getByDisplayValue(expectedValue)).toBeTruthy();
    });
  });
});
