import { useCallback } from 'react';
import { Photo } from '../../store/slices/photos.slice'
import { setSelectedPhoto } from '../../store/slices/search.slice';
import { useAppDispatch } from '../../store/store';
import { Modal } from '../common/Modal'
import { ModalHeader } from '../common/ModalHeader';
import { ModalContent } from '../common/ModalContent';

type PhotoModalProps = {
  photo?: Photo;
}

export function PhotoModal({
  photo
}: PhotoModalProps) {
  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    dispatch(setSelectedPhoto(null));
  }, [dispatch]);

  return (
    <Modal
      opened={Boolean(photo)}
      onClose={onClose}
    >
      <ModalHeader onClose={onClose}>
        {photo?.title}
      </ModalHeader>
      <ModalContent>
        <img src={photo?.url} />
      </ModalContent>
    </Modal>
  )
}
