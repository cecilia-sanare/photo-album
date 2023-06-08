import { fireEvent, render } from '@testing-library/react';
import { ModalHeader } from '../ModalHeader';
import { Chance } from 'chance';

const chance = new Chance();

describe('<ModalHeader />', () => {
  it('should render the content', () => {
    const expectedContent = chance.string();

    const component = render(
      <ModalHeader onClose={jest.fn()}>
        {expectedContent}
      </ModalHeader>
    );

    expect(component.getByText(expectedContent)).toBeTruthy();
  });

  describe('prop(onClose)', () => {
    it('should invoke onClose when the close button is pressed', async () => {
      const onClose = jest.fn();

      const component = render(
        <ModalHeader onClose={onClose}>
          {chance.string()}
        </ModalHeader>
      );

      expect(onClose).toHaveBeenCalledTimes(0);

      await fireEvent.click(component.getByTestId('modal-close'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
