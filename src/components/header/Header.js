import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
  };

  return (
    <header className='header'>
      <button className='button button__text' type='button' onClick={handleLogout}>Logout</button>
    </header>
  );
}

Header.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Header;