import PropTypes from 'prop-types';

const Button = ({onClick}) => {
  return (
      <button className="Button" type="button" onClick={onClick}><span>Load more</span></button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button;
