import { useEffect } from 'react';
import { IconClose, ModalStyled, Overlay } from './Modal.styled';

export const Modal = ({
  modalData: { currentImageURL, tags },
  onModalClose,
}) => {
  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    document.addEventListener('keydown', onEscClick);
    return () => {
      document.removeEventListener('keydown', onEscClick);
    };
  }, [onModalClose]);

  const onModalCloseIn = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <Overlay onClick={onModalCloseIn}>
      <ModalStyled>
        <img src={currentImageURL} alt={tags} />
      </ModalStyled>
      <IconClose onClick={onModalCloseIn} />
    </Overlay>
  );
};
