import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import { getPosts } from '../../shared/components/services/Api';
import Modal from '../../shared/components/Modal';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Component } from 'react';
import Button from './Button';
import Loader from './Loader';

class FindImages extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    value: '',
    modalOpen: false,
    modalContent: {
      src: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, value } = this.state;

    if (page > prevState.page || value !== prevState.value) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    this.setState({
      loading: true,
    });
    const { page, value } = this.state;

    try {
      const data = await getPosts(value, page);
      this.setState(({ items }) => {
        return {
          items: [...items, ...data.hits],
        };
      });
    } catch (error) {
      this.setState({
        error: error,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  handleFormSubmit = value => {
    this.setState({ value, items: [] });
  };

  showModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent: {
        src: modalContent,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    })
  }

  render() {
    const { items, loading, error, modalOpen, modalContent } = this.state;
    const { handleLoadMore, handleFormSubmit, showModal, closeModal } = this;

    return (
      <div className="FindImage">
        <Searchbar onSubmit={handleFormSubmit} />
        {items.length > 0 &&<ImageGallery onClick={showModal} items={items} />}
        {error && <p>Не удалось загрузить посты</p>}
        {loading && <Loader/>}
        {modalOpen && (
          <Modal onClose={closeModal}>
            <img src={modalContent.src} alt="img"></img>
          </Modal>
        )}
        {!loading && items.length >= 12 && <Button onClick={handleLoadMore} />}
      </div>
    );
  }
}

export default FindImages;
