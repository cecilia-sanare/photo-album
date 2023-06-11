import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios from 'axios';

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
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);

    return response.data;
  }
)

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearPhotos() {
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

export const { clearPhotos } = photosSlice.actions;
export const photosReducer = photosSlice.reducer;
