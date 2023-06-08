import { render } from '@testing-library/react';
import { ModalContent } from '../ModalContent';
import { Chance } from 'chance';

const chance = new Chance();

describe('<ModalContent />', () => {
  it('should render the content', () => {
    const expectedContent = chance.string();

    const component = render(
      <ModalContent>
        {expectedContent}
      </ModalContent>
    );

    expect(component.getByText(expectedContent)).toBeTruthy();
  });
});
