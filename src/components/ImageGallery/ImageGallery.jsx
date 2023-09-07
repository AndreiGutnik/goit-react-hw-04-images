import React from 'react';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, onModalOpen }) {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onModalOpen={onModalOpen}
        />
      ))}
    </ImageGalleryStyled>
  );
}
