import { Photo } from '../../store/slices/photos.slice';
import * as styles from './PhotoCard.module.scss';
import { setSelectedPhoto } from '../../store/slices/search.slice';
import { useAppDispatch } from '../../store/store';

type PhotoCardProps = {
    photo: Photo;
}

export function PhotoCard({
    photo
}: PhotoCardProps) {
    const dispatch = useAppDispatch();

    return (
        <div 
            className={styles.card}
            onClick={() => dispatch(setSelectedPhoto(photo))}
        >
            <div className={styles.id}>{photo.id}</div>
            <img className={styles.thumbnail} src={photo.thumbnailUrl} />
            {photo.title}
        </div>
    )
}