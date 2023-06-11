import { Chance } from 'chance';
import { RootState } from '../../store';
import { searchReducer, setSelectedAlbumId, setSearchQuery, setSelectedPhoto, selectSearch } from '../search.slice';
import { Photo } from '../photos.slice';
import { selectSearchQuery } from '../search.slice';
import { selectSelectedAlbumId } from '../search.slice';
import { selectSelectedPhoto } from '../search.slice';

const chance = new Chance();

describe('slice(search)', () => {
  it('should set the initial value', () => {
    expect(searchReducer(undefined, { type: null })).toEqual({});
  });

  describe('action(setSelectedAlbumId)', () => {
    it('should set the selected album id', () => {
      const expectedAlbumId = chance.integer();

      expect(searchReducer(undefined, setSelectedAlbumId(expectedAlbumId))).toEqual({
        selectedAlbumId: expectedAlbumId
      });
    });
  });

  describe('action(setSearchQuery)', () => {
    it('should set the search query', () => {
      const expectedQuery = chance.string();

      expect(searchReducer(undefined, setSearchQuery(expectedQuery))).toEqual({
        query: expectedQuery
      });
    });
  });

  describe('action(setSelectedPhoto)', () => {
    it('should set the selected photo', () => {
      const expectedPhoto: Photo = {
        id: chance.integer(),
        title: chance.word(),
        albumId: chance.integer(),
        thumbnailUrl: chance.url(),
        url: chance.url()
      };

      expect(searchReducer(undefined, setSelectedPhoto(expectedPhoto))).toEqual({
        selectedPhoto: expectedPhoto
      });
    });
  });

  describe('selector(selectSearch)', () => {
    it('should get the search state', async () => {
      const state = {
        search: {}
      } as RootState;

      expect(selectSearch(state)).toEqual(state.search);
    });
  });

  describe('selector(selectSearchQuery)', () => {
    it('should get the search query', async () => {
      const state = {
        search: {
          query: chance.string()
        }
      } as RootState;

      expect(selectSearchQuery(state)).toEqual(state.search.query);
    });
  });

  describe('selector(selectSelectedAlbumId)', () => {
    it('should get the selected album id', async () => {
      const state = {
        search: {
          selectedAlbumId: chance.integer()
        }
      } as RootState;

      expect(selectSelectedAlbumId(state)).toEqual(state.search.selectedAlbumId);
    });
  });

  describe('selector(selectSelectedPhoto)', () => {
    it('should get the selected photo', async () => {
      const state = {
        search: {
          selectedPhoto: {
            id: chance.integer(),
            title: chance.word(),
            albumId: chance.integer(),
            thumbnailUrl: chance.url(),
            url: chance.url()
          }
        }
      } as RootState;

      expect(selectSelectedPhoto(state)).toEqual(state.search.selectedPhoto);
    });
  });
});
