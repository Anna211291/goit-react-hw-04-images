import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryStyle>
      {images.map(image => (
        <li key={image.id}>
          <ImageGalleryItem image={image} />
        </li>
      ))}
    </ImageGalleryStyle>
  );
};
