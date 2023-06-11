import { fireEvent, render } from '@testing-library/react';
import { PhotoCard } from '../PhotoCard';
import Chance from 'chance';
import { Photo } from '../../../store/slices/photos.slice';

const chance = new Chance();

describe('<Select />', () => {
  it('should render the Select', () => {
    const photo: Photo = {
      albumId: chance.integer(),
      id: chance.integer(),
      thumbnailUrl: chance.url(),
      title: chance.word(),
      url: chance.url()
    };

    const component = render(<PhotoCard photo={photo} />);

    expect(component.baseElement).toMatchSnapshot();
  });

  describe('prop(onClick)', () => {
    it('should support being clicked', async () => {
      const onClick = jest.fn();
      const photo: Photo = {
        albumId: chance.integer(),
        id: chance.integer(),
        thumbnailUrl: chance.url(),
        title: chance.word(),
        url: chance.url()
      };

      const component = render(<PhotoCard photo={photo} onClick={onClick} />);

      expect(onClick).toHaveBeenCalledTimes(0);

      await fireEvent.click(component.getByTestId('photo-card'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
