import PropTypes, { arrayOf } from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = (props) => {
  const { items, onClick } = props;
  const elements = items.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <ImageGalleryItem
        onClick={onClick}
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        tags={tags}
      />
    );
  });
  return <ul className="ImageGallery">{elements}</ul>;
};

ImageGallery.propTypes = {
  items: arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
