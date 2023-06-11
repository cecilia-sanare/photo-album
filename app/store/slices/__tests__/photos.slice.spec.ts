import { Chance } from 'chance';
import { Photo, clearPhotos, fetchPhotosByAlbumId, photosReducer, selectPhotos } from '../photos.slice';
import { AppDispatch, RootState } from '../../store';
import axios from 'axios';

jest.mock('axios');
const axiosMocked = jest.mocked(axios);

const chance = new Chance();

describe('slice(photos)', () => {
  it('should set the initial value', () => {
    expect(photosReducer(undefined, { type: null })).toEqual([]);
  });

  it('should store results from fetchAlbums', () => {
    const expectedPhotos: Photo[] = [{
      id: chance.integer(),
      title: chance.word(),
      albumId: chance.integer(),
      thumbnailUrl: chance.url(),
      url: chance.url()
    }];

    expect(photosReducer(undefined, { type: fetchPhotosByAlbumId.fulfilled, payload: expectedPhotos })).toEqual(expectedPhotos);
  });

  describe('action(clearPhotos)', () => {
    it('should clear the photos', () => {
      expect(photosReducer([{
        id: chance.integer(),
        title: chance.word(),
        albumId: chance.integer(),
        thumbnailUrl: chance.url(),
        url: chance.url()
      }], clearPhotos())).toEqual([]);
    });
  });

  describe('selector(selectPhotos)', () => {
    it('should get the albums from the state', async () => {
      const state = {
        photos: [{
          id: chance.integer(),
          title: chance.word(),
          albumId: chance.integer(),
          thumbnailUrl: chance.url(),
          url: chance.url()
        }]
      } as RootState;

      expect(selectPhotos(state)).toEqual(state.photos);
    });
  });

  describe('thunk(fetchPhotosByAlbumId)', () => {
    it('should fetch the photos by the album id', async () => {
      const dispatch = jest.fn() as AppDispatch;

      const expectedPhotos: Photo[] = [{
        id: chance.integer(),
        title: chance.word(),
        albumId: chance.integer(),
        thumbnailUrl: chance.url(),
        url: chance.url()
      }];

      axiosMocked.get.mockResolvedValue({
        data: expectedPhotos
      });

      const response = await fetchPhotosByAlbumId(1)(dispatch, jest.fn(), null);

      expect(response).toBeTruthy();
      expect(response.payload).toEqual(expectedPhotos);
    });
  });
});
