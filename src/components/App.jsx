import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import { getImages } from 'api';
import { Searhbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { ErrorMessage } from './ErrorMessage';
import { Layout } from './Layout';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    galleryItems: [],
    loadMore: 0,
    totalHits: 0,
    perPage: 12,
    loading: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, error: false });

        const images = await getImages(query, page);

        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...images.hits],
          totalHits: images.totalHits,
          loadMore: page < images.totalHits / this.state.perPage,
        }));

        if (page === 1 && images.totalHits !== 0) {
          toast.success(`'Hooray! We found ${images.totalHits} images.'`);
        }

        if (images.totalHits === 0) {
          toast.success(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSubmit = query => {
    this.setState({
      query: query,
      page: 1,
      galleryItems: [],
    });
  };

  render() {
    const { loading, loadMore, error } = this.state;
    return (
      <Layout>
        <Searhbar onSubmit={this.onSubmit} />
        <Toaster position="top-right" />
        {loading && <Loader />}
        {error && (
          <ErrorMessage>Whoops! Error! Please reload this page!</ErrorMessage>
        )}
        {this.state.galleryItems.length > 0 && (
          <ImageGallery images={this.state.galleryItems} />
        )}

        {loadMore > 0 && <LoadMoreBtn handleLoadMore={this.handleLoadMore} />}
      </Layout>
    );
  }
}
