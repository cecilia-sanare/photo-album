import { Chance } from 'chance';
import { Album, fetchAlbums, selectAlbums } from '../albums.slice';
import { albumsReducer } from '../albums.slice';
import { AppDispatch, RootState } from '../../store';
import axios from 'axios';

jest.mock('axios');
const axiosMocked = jest.mocked(axios);

const chance = new Chance();

describe('slice(albums)', () => {
  it('should set the initial value', () => {
    expect(albumsReducer(undefined, { type: null })).toEqual([]);
  });

  it('should store results from fetchAlbums', () => {
    const expectedAlbums: Album[] = [{
      id: chance.integer(),
      title: chance.word(),
      userId: chance.integer()
    }];

    expect(albumsReducer(undefined, { type: fetchAlbums.fulfilled, payload: expectedAlbums })).toEqual(expectedAlbums);
  });

  describe('selector(selectAlbums)', () => {
    it('should get the albums from the state', async () => {
      const state = {
        albums: [{
          id: chance.integer(),
          title: chance.word(),
          userId: chance.integer()
        }]
      } as RootState;

      expect(selectAlbums(state)).toEqual(state.albums);
    });
  });

  describe('thunk(fetchAlbums)', () => {
    it('should fetch the albums', async () => {
      const dispatch = jest.fn() as AppDispatch;

      const expectedAlbums: Album[] = [{
        id: chance.integer(),
        title: chance.word(),
        userId: chance.integer()
      }];

      axiosMocked.get.mockResolvedValue({
        data: expectedAlbums
      });

      const response = await fetchAlbums()(dispatch, jest.fn(), null);

      expect(response).toBeTruthy();
      expect(response.payload).toEqual(expectedAlbums);
    });
  });
});
