import { fireEvent, render } from '@testing-library/react';
import { Modal } from '../Modal';
import Chance from 'chance';

const chance = new Chance();

describe('<Modal />', () => {
  it('should render the Modal', () => {
    const component = render(<Modal>Content</Modal>);

    expect(component.baseElement).toMatchSnapshot();
  });

  describe('prop(opened)', () => {
    it('should open the modal', () => {
      const component = render(<Modal opened>Content</Modal>);

      expect(component.getByTestId('modal')).toHaveClass('opened');
    });

    it('should close the modal', () => {
      const component = render(<Modal>Content</Modal>);

      expect(component.getByTestId('modal')).not.toHaveClass('opened');
    });
  });

  describe('prop(onClose)', () => {
    it('should close the modal when the backdrop is clicked', async () => {
      const component = render(<Modal opened>Content</Modal>);

      await fireEvent.click(component.getByTestId('backdrop'));

      expect(component.getByTestId('modal')).not.toHaveClass('opened');
    });

    it('should fire off the onClose event when the backdrop is clicked', async () => {
      const onClose = jest.fn();
      const component = render(<Modal opened onClose={onClose}>Content</Modal>);

      expect(onClose).toHaveBeenCalledTimes(0);

      await fireEvent.click(component.getByTestId('backdrop'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
