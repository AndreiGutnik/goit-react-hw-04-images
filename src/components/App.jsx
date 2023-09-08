import { useState, useEffect } from 'react';
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

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentImageURL, setCurrentImageURL] = useState('');
  const [currentImageTags, setCurrentImageTags] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoader(true);
        setIsError(false);
        const data = await getImages(searchQuery, page);
        if (data.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setImages(previmages => [...previmages, ...data.hits]);
        setTotalImages(data.totalHits);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    }
    fetchImages();
  }, [searchQuery, page]);

  const onSubmitForm = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };

  const onClickLoadMore = () => {
    setPage(page + 1);
    setIsScrollUp(true);
    scroll.scrollMore(850);
  };

  const onModalOpen = (currentImageURL, tags) => {
    if (!currentImageURL) {
      toast.error(
        'Sorry, but the large image is empty. Please try other picture.'
      );
      return;
    }
    setCurrentImageURL(currentImageURL);
    setCurrentImageTags(tags);
    setIsModal(true);
  };

  const onModalClose = () => {
    setCurrentImageURL('');
    setIsModal(false);
  };

  const onScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 300) {
      setIsScrollUp(true);
    } else {
      setIsScrollUp(false);
    }
  };

  const onScrollUp = () => {
    scroll.scrollToTop();
    setIsScrollUp(false);
  };

  return (
    <div onWheel={onScroll}>
      <Searchbar onSubmit={onSubmitForm} />
      <Layout>
        {searchQuery && (
          <ImageGallery images={images} onModalOpen={onModalOpen} />
        )}
        {!isLoader && images.length !== totalImages && (
          <ButtonLoadMore onClick={onClickLoadMore} />
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
          tags={currentImageTags}
          onModalClose={onModalClose}
        />
      )}
      {isScrollUp && <ScrollUp onClick={onScrollUp} />}
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </div>
  );
};
