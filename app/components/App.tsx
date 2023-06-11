import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { Photo, clearPhotos, fetchPhotosByAlbumId, selectPhotos } from '../store/slices/photos.slice';
import { useSelector } from 'react-redux';
import * as styles from './App.module.scss';
import { Header } from './Header';
import { selectSearchQuery, selectSelectedAlbumId, selectSelectedPhoto, setSelectedPhoto } from '../store/slices/search.slice';
import { PhotoCard } from './photos/PhotoCard';
import { PhotoModal } from './photos/PhotoModal';
import { useReadOnlyCachedState } from '../hooks/use-cached-state';

export function App() {
  const dispatch = useAppDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const selectedAlbumId = useSelector(selectSelectedAlbumId);
  const selectedPhoto = useSelector(selectSelectedPhoto);
  const photos = useSelector(selectPhotos);
  const filteredPhotos = useReadOnlyCachedState(() => {
    if (searchQuery) {
      return photos.filter((photo) => photo.title.includes(searchQuery));
    }

    return photos;
  }, [photos, searchQuery])

  useEffect(() => {
    if (selectedAlbumId) {
      dispatch(fetchPhotosByAlbumId(selectedAlbumId));
    } else {
      dispatch(clearPhotos());
    }
  }, [selectedAlbumId]);

  return (
    <div className={styles.app}>
      <Header />
      <PhotoModal photo={selectedPhoto} />
      <div className={styles.photos}>
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => dispatch(setSelectedPhoto(photo))}
          />
        ))}
      </div>
    </div>
  );
}
