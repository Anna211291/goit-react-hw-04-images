import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import { getImages } from 'api';
import { Searhbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { ErrorMessage } from './ErrorMessage';
import { Layout } from './Layout';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadMore, setLoadMore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getImagesGallery() {
      const perPage = 12;
      if (query === '') {
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const images = await getImages(query, page);

        setGalleryItems(prevGalleryItems => [
          ...prevGalleryItems,
          ...images.hits,
        ]);

        const totalHits = images.totalHits;
        
        setLoadMore(page < totalHits / perPage);

        if (page === 1 && totalHits !== 0) {
          toast.success(`'Hooray! We found ${totalHits} images.'`);
        }

        if (page >= totalHits / perPage ) {
          toast.success(
            `'We're sorry, but you've reached the end of search results.'`
          );
        }

        if (totalHits === 0) {
          toast.success(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    getImagesGallery();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setGalleryItems([]);
  };

  return (
    <Layout>
      <Searhbar onSubmit={onSubmit} />
      <Toaster position="top-right" />
      {loading && <Loader />}
      {error && (
        <ErrorMessage>Whoops! Error! Please reload this page!</ErrorMessage>
      )}
      {galleryItems.length > 0 && <ImageGallery images={galleryItems} />}

      {loadMore > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
    </Layout>
  );
};
