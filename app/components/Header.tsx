import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { Input } from './common/Input';
import { Select } from './common/Select';
import * as styles from './Header.module.scss';
import { fetchAlbums, selectAlbums } from '../store/slices/albums.slice';
import { useSelector } from 'react-redux';
import { selectSearchQuery, selectSelectedAlbumId, setSearchQuery, setSelectedAlbumId } from '../store/slices/search.slice';
import { useReadOnlyCachedState } from '../hooks/use-cached-state';

export function Header() {
  const dispatch = useAppDispatch();
  const albums = useSelector(selectAlbums);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedAlbumId = useSelector(selectSelectedAlbumId);
  const items = useReadOnlyCachedState(() => {
    return albums.map((album) => ({
      label: album.title,
      value: album.id
    }));
  }, [albums]);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <Input
          className={styles.search}
          placeholder='Query the photo names~'
          value={searchQuery}
          onChange={(query) => dispatch(setSearchQuery(query))}
        />
        <Select
          items={items}
          placeholder='Select an Album'
          value={selectedAlbumId}
          onChange={(albumId) => dispatch(setSelectedAlbumId(albumId))}
        />
      </div>
    </div>
  );
}
