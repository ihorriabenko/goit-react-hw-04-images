import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    const {onClose} = this.props;

    if(e.target === e.currentTarget) {
      onClose();
      return;
    }
    if (e.code === 'Escape') {
      onClose();
    }
  };

  render() {
    const { children } = this.props;

    const {handleClose} = this;

    return createPortal(
      <div className="Overlay" onClick={handleClose}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default Modal;
