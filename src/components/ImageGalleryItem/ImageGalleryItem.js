import { useState } from 'react';
import { ModalImage } from 'components/Modal/Modal';
import {
  ImageGalleryItemImage,
  ImageGalleryItemStyle,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <ImageGalleryItemStyle>
      <ImageGalleryItemImage
        src={image.webformatURL}
        alt={image.tags}
        loading="lazy"
        onClick={openModal}
        width="300"
      />

      <ModalImage
        image={image}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </ImageGalleryItemStyle>
  );
};
