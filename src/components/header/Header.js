import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

function Header(props) {

  const { isLoggedIn } = props;

  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
    props.history.push('/');
  };

  const navList = (
    <ul className='nav__list'>
      <li className='nav__item'><Link to='/home' className='nav__link'>Home</Link></li>
      <li className='nav__item'><Link to='/settings' className='nav__link'>Settings</Link></li>
      <li className='nav__item'><button className='button button__text' type='button' onClick={handleLogout}>Logout</button></li>
    </ul>
  );

  return (
    <header className='header'>
      <nav className='nav container'>
        { isLoggedIn ? <p className='nav__name'>CountersApp</p> : <Link to='/' className='nav__name'>CountersApp</Link>}
        { isLoggedIn ? navList : null }
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default withRouter(Header);