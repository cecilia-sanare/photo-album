import { fireEvent, render } from '@testing-library/react';
import { PhotoModal } from '../PhotoModal';
import Chance from 'chance';
import { Photo } from '../../../store/slices/photos.slice';
import { useAppDispatch } from '../../../store/store';

jest.mock('../../../store/store');

const useAppDispatchMocked = jest.mocked(useAppDispatch);

const chance = new Chance();

describe('<PhotoModal />', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();

    useAppDispatchMocked.mockReturnValue(dispatch);
  });

  it('should render the PhotoModal', () => {
    const photo: Photo = {
      albumId: chance.integer(),
      id: chance.integer(),
      thumbnailUrl: chance.url(),
      title: chance.word(),
      url: chance.url()
    };

    const component = render(<PhotoModal photo={photo} />);

    expect(component.baseElement).toMatchSnapshot();
  });

  it('should reset the selected photo when the modal is closed', async () => {
    const photo: Photo = {
      albumId: chance.integer(),
      id: chance.integer(),
      thumbnailUrl: chance.url(),
      title: chance.word(),
      url: chance.url()
    };

    const component = render(<PhotoModal photo={photo} />);

    expect(dispatch).toHaveBeenCalledTimes(0);

    await fireEvent.click(component.getByTestId('modal-close'));

    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  describe('prop(photo)', () => {
    it('should support being undefined', () => {
      const component = render(<PhotoModal />);

      expect(component.baseElement).toMatchSnapshot();
    });
  });
});
