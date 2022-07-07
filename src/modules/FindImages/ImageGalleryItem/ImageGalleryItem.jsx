import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onClick(largeImageURL)}
    >
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
      ></img>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
