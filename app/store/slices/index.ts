import { combineReducers } from '@reduxjs/toolkit';
import { photosReducer } from './photos.slice';
import { albumsReducer } from './albums.slice';
import { searchReducer } from './search.slice';

export const reducers = combineReducers({
  albums: albumsReducer,
  photos: photosReducer,
  search: searchReducer
});
