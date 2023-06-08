import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Photo } from './photos.slice';

interface Album {
  userId: number;
  id: number;
  title: string;
}

type searchState = {
  selectedAlbumId?: number;
  query?: string;
  selectedPhoto?: Photo;
};

const initialState = {} as searchState;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedAlbumId(state, action: PayloadAction<number>) {
      return {
        ...state,
        selectedAlbumId: action.payload
      };
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        query: action.payload
      };
    },
    setSelectedPhoto(state, action: PayloadAction<Photo>) {
      return {
        ...state,
        selectedPhoto: action.payload
      };
    }
  }
});

export const { setSearchQuery, setSelectedAlbumId, setSelectedPhoto } = searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;
export const selectSearchQuery = (state: RootState) => selectSearch(state).query;
export const selectSelectedAlbumId = (state: RootState) => selectSearch(state).selectedAlbumId;
export const selectSelectedPhoto = (state: RootState) => selectSearch(state).selectedPhoto;

export default searchSlice.reducer
