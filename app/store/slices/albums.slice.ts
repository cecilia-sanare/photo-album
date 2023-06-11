import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios from 'axios';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

type AlbumsState = Album[];

const initialState = [] as AlbumsState;

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');

    return response.data;
  }
)

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectAlbums = (state: RootState) => state.albums;

export const albumsReducer = albumsSlice.reducer;
