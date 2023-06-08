import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface Photo {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

type PhotosState = Photo[];

const initialState = [] as PhotosState;

export const fetchPhotosByAlbumId = createAsyncThunk(
  'photos/fetchByAlbumId',
  async (albumId: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);

    return await response.json();
  }
)

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos(state, action: PayloadAction<Photo[]>) {
      return action.payload;
    },
    clearPhotos(state) {
      return [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotosByAlbumId.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectPhotos = (state: RootState) => state.photos;

export const { setPhotos, clearPhotos } = photosSlice.actions
export default photosSlice.reducer
