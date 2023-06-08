import { fireEvent, render } from '@testing-library/react';
import { Backdrop } from '../Backdrop';

describe('<Backdrop />', () => {
  it('should render the backdrop', () => {
    const component = render(<Backdrop />);

    expect(component.baseElement).toMatchSnapshot();
  });

  it('should close when the backdrop is clicked', async () => {
    const onClose = jest.fn();
    const component = render(<Backdrop opened onClose={onClose} />);

    expect(onClose).toHaveBeenCalledTimes(0);

    await fireEvent.click(component.getByTestId('backdrop'));

    expect(component.getByTestId('backdrop')).not.toHaveClass('opened');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('prop(opened)', () => {
    it('should open the backdrop', () => {
      const component = render(<Backdrop opened />);

      expect(component.getByTestId('backdrop')).toHaveClass('opened');
    });

    it('should close the backdrop', () => {
      const component = render(<Backdrop />);

      expect(component.getByTestId('backdrop')).not.toHaveClass('opened');
    });
  });
});
