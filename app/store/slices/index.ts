import { combineReducers } from '@reduxjs/toolkit';
import photosSlice from './photos.slice';
import albumsSlice from './albums.slice';
import searchSlice from './search.slice';

export const reducers = combineReducers({
  albums: albumsSlice,
  photos: photosSlice,
  search: searchSlice
});
