import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { getPosts } from '../../shared/components/services/Api';
import Modal from '../../shared/components/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';
import Loader from './Loader';

const FindImages = () => {
  const [posts, setPosts] = useState({
    items: [],
    loading: false,
    error: null,
  });

  const [page, setPage] = useState(1);

  const [value, setValue] = useState('');

  const [modal, setModal] = useState({
    modalOpen: false,
    modalContent: ''
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(prevState => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      try {
        const data = await getPosts(value, page);
        setPosts(prevState => ({
          ...prevState,
          items: [...prevState.items, ...data.hits],
          loading: false,
        }));
      } catch (error) {
        setPosts(prevState => ({
          ...prevState,
          loading: false,
          error,
        }));
      }
    };

    if (value) {
      fetchPosts();
    }
  }, [page, value]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = value => {
    setValue(value);
    setPosts(prevState => ({
      ...prevState,
      items: [],
    }));
  };

  const showModal = modalContent => {
    setModal({
      modalOpen: true,
      modalContent
    });
  };

  const closeModal = () => {
    setModal(prevState => ({
      ...prevState,
      modalOpen: false,
    }));
  };

  return (
    <div className="FindImage">
      <Searchbar onSubmit={handleFormSubmit} />
      {posts.items.length > 0 && (
        <ImageGallery onClick={showModal} items={posts.items} />
      )}
      {posts.error && <p>Не удалось загрузить посты</p>}
      {posts.loading && <Loader />}
      {modal.modalOpen && (
        <Modal onClose={closeModal}>
          <img src={posts.modalContent} alt="img"></img>
        </Modal>
      )}
      {!posts.loading && posts.items.length >= 12 && (
        <Button onClick={handleLoadMore} />
      )}
    </div>
  );
};

// class FindImages extends Component {
//   state = {
//     items: [],
//     loading: false,
//     error: null,
//     page: 1,
//     value: '',
//     modalOpen: false,
//     modalContent: {
//       src: '',
//     },
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page, value } = this.state;

//     if (page > prevState.page || value !== prevState.value) {
//       this.fetchPosts();
//     }
//   }

// async fetchPosts() {
//   this.setState({
//     loading: true,
//   });
//   const { page, value } = this.state;

//   try {
//     const data = await getPosts(value, page);
//     this.setState(({ items }) => {
//       return {
//         items: [...items, ...data.hits],
//       };
//     });
//   } catch (error) {
//     this.setState({
//       error: error,
//     });
//   } finally {
//     this.setState({
//       loading: false,
//     });
//   }
// }

//   handleLoadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   handleFormSubmit = value => {
//     this.setState({ value, items: [] });
//   };

//   showModal = modalContent => {
//     this.setState({
//       modalOpen: true,
//       modalContent: {
//         src: modalContent,
//       },
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modalOpen: false,
//     })
//   }

//   render() {
//     const { items, loading, error, modalOpen, modalContent } = this.state;
//     const { handleLoadMore, handleFormSubmit, showModal, closeModal } = this;

//     return (
//       <div className="FindImage">
//         <Searchbar onSubmit={handleFormSubmit} />
//         {items.length > 0 &&<ImageGallery onClick={showModal} items={items} />}
//         {error && <p>Не удалось загрузить посты</p>}
//         {loading && <Loader/>}
//         {modalOpen && (
//           <Modal onClose={closeModal}>
//             <img src={modalContent.src} alt="img"></img>
//           </Modal>
//         )}
//         {!loading && items.length >= 12 && <Button onClick={handleLoadMore} />}
//       </div>
//     );
//   }
// }

export default FindImages;
