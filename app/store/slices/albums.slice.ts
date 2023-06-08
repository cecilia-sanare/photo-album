import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface Album {
  userId: number;
  id: number;
  title: string;
}

type AlbumsState = Album[];

const initialState = [] as AlbumsState;

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');

    return await response.json();
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

export default albumsSlice.reducer
