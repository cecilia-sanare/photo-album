import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { Photo, clearPhotos, fetchPhotosByAlbumId, selectPhotos } from '../store/slices/photos.slice';
import { useSelector } from 'react-redux';
import * as styles from './App.module.scss';
import { Header } from './Header';
import { selectSearchQuery, selectSelectedAlbumId, selectSelectedPhoto } from '../store/slices/search.slice';
import { PhotoCard } from './photos/PhotoCard';
import { PhotoModal } from './photos/PhotoModal';

export function App() {
  const dispatch = useAppDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const selectedAlbumId = useSelector(selectSelectedAlbumId);
  const selectedPhoto = useSelector(selectSelectedPhoto);
  const photos = useSelector(selectPhotos);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>();

  useEffect(() => {
    if (selectedAlbumId) {
      dispatch(fetchPhotosByAlbumId(selectedAlbumId));
    } else {
      dispatch(clearPhotos());
    }
  }, [selectedAlbumId]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPhotos(photos.filter((photo) => photo.title.includes(searchQuery)));
    } else {
      setFilteredPhotos(photos);
    }
  }, [photos, searchQuery]);

  return (
    <div className={styles.app}>
      <Header />
      <PhotoModal photo={selectedPhoto} />
      <div className={styles.photos}>
        {filteredPhotos?.map((photo) => (
          <PhotoCard photo={photo} />
        ))}
      </div>
    </div>
  );
}