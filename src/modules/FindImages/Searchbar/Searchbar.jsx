import { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return alert('Enter correct name');
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    const { handleSubmit, handleChange } = this;

    return (
      <div className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button className="SearchForm-button">Click</button>
          <input
            className="SearchForm-input"
            type="text"
            name="value"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
            onChange={handleChange}
          ></input>
        </form>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;
