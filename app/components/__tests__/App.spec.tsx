import { Provider } from 'react-redux';
import { App } from '../App';
import { fireEvent, render } from '@testing-library/react';
import { Chance } from 'chance';
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../../store/slices';
import { mockPhoto, mockPhotos } from '../../../__tests__/mocks';

const chance = new Chance();

describe('<App />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: reducers
    });

    jest.spyOn(store, 'dispatch').mockImplementation(() => { });
  });

  it('should render the App', () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(component.baseElement).toMatchSnapshot();
  });

  describe('when photos are present', () => {
    it('should render the photos in the given album', () => {
      const albumId = chance.integer();
      const preloadedStore = configureStore({
        preloadedState: {
          photos: mockPhotos(4, {
            albumId: albumId
          }),
          search: {
            selectedAlbumId: albumId
          }
        },
        reducer: reducers
      });

      const component = render(
        <Provider store={preloadedStore}>
          <App />
        </Provider>
      );

      expect(component.getAllByTestId('photo-card')).toHaveLength(4);
    });

    it('should filter the photos by their title', () => {
      const albumId = chance.integer();
      const expectedPhoto = mockPhoto({
        albumId
      });
      const preloadedStore = configureStore({
        preloadedState: {
          photos: [
            ...mockPhotos(4, {
              albumId: albumId
            }),
            expectedPhoto
          ],
          search: {
            selectedAlbumId: albumId,
            query: expectedPhoto.title
          }
        },
        reducer: reducers
      });

      const component = render(
        <Provider store={preloadedStore}>
          <App />
        </Provider>
      );

      expect(component.getAllByTestId('photo-card')).toHaveLength(1);
    });

    describe('and a photo is clicked', () => {
      it('should set the selected photo and open the modal', async () => {
        const albumId = chance.integer();
        const preloadedStore = configureStore({
          preloadedState: {
            photos: [mockPhoto({
              albumId: albumId
            })],
            search: {
              selectedAlbumId: albumId
            }
          },
          reducer: reducers
        });

        const dispatchSpy = jest.spyOn(preloadedStore, 'dispatch');

        const component = render(
          <Provider store={preloadedStore}>
            <App />
          </Provider>
        );

        dispatchSpy.mockClear();

        await fireEvent.click(component.getByTestId('photo-card'));

        expect(preloadedStore.dispatch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
