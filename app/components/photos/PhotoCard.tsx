import { Photo } from '../../store/slices/photos.slice';
import * as styles from './PhotoCard.module.scss';

type PhotoCardProps = {
  photo: Photo;
  onClick?: () => void;
}

export function PhotoCard({
  photo,
  onClick
}: PhotoCardProps) {
  return (
    <div
      className={styles.card}
      data-testid='photo-card'
      onClick={onClick}
    >
      <div className={styles.id}>{photo.id}</div>
      <img className={styles.thumbnail} src={photo.thumbnailUrl} />
      {photo.title}
    </div>
  )
}
