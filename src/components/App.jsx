import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import { animateScroll as scroll } from 'react-scroll';

import { getImages } from '../API';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ScrollUp } from './ScrollUp/ScrollUp';
import { Error } from './Error/Error.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentImageURL: '',
    currentImageTags: '',
    page: 1,
    totalImages: 0,
    isModal: false,
    isScrollUp: false,
    isLoader: false,
    isError: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isError: false, isLoader: true });
        const data = await getImages(searchQuery, page);
        if (data.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalImages: data.totalHits,
        }));
      } catch (error) {
        this.setState({ isError: true });
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  onSubmitForm = query => {
    this.setState({ searchQuery: query, images: [], page: 1, totalImages: 0 });
  };

  onClickLoadMore = () => {
    this.setState({ page: this.state.page + 1, isScrollUp: true });
    scroll.scrollMore(850);
  };

  onModalOpen = (currentImageURL, tags) => {
    if (!currentImageURL) {
      toast.error(
        'Sorry, but the large image is empty. Please try other picture.'
      );
      return;
    }
    this.setState({
      currentImageURL: currentImageURL,
      currentImageTags: tags,
      isModal: true,
    });
  };

  onModalClose = () => {
    this.setState({ currentImage: '', isModal: false });
  };

  onScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 300) {
      this.setState({ isScrollUp: true });
    } else {
      this.setState({ isScrollUp: false });
    }
  };

  onScrollUp = () => {
    scroll.scrollToTop();
    this.setState({ isScrollUp: false });
  };

  render() {
    const {
      searchQuery,
      images,
      currentImageURL,
      totalImages,
      isLoader,
      isModal,
      isScrollUp,
      isError,
    } = this.state;
    return (
      <div onWheel={this.onScroll}>
        <Searchbar onSubmit={this.onSubmitForm} />
        <Layout>
          {searchQuery && (
            <ImageGallery images={images} onModalOpen={this.onModalOpen} />
          )}
          {!isLoader && images.length !== totalImages && (
            <ButtonLoadMore onClick={this.onClickLoadMore} />
          )}
          {isLoader && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3F51B5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ justifyContent: 'center' }}
              wrapperClassName=""
              visible={true}
            />
          )}
          {isError && !isLoader && (
            <Error>
              <p>OOPS! There was an ERROR!</p>
            </Error>
          )}
        </Layout>
        {isModal && (
          <Modal
            currentImageURL={currentImageURL}
            onModalClose={this.onModalClose}
          />
        )}
        {isScrollUp && <ScrollUp onClick={this.onScrollUp} />}
        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </div>
    );
  }
}
