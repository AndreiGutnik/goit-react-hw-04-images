import React from 'react';
import {
  ImageGalleryItemStyled,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  image: { tags, webformatURL, largeImageURL },
  onModalOpen,
}) {
  return (
    <ImageGalleryItemStyled>
      <ImageGalleryItemImg
        src={webformatURL}
        alt={tags}
        onClick={() => onModalOpen(largeImageURL, tags)}
      />
    </ImageGalleryItemStyled>
  );
}
