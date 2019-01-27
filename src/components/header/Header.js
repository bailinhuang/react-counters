import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';

function Header(props) {

  const { isLoggedIn } = props;

  const handleLogout = (event) => {
    event.preventDefault();
    props.onLogout();
    props.history.push('/');
  };

  const navList = (
    <ul className='nav__list'>
      <li className='nav__item'><NavLink to='/home' exact activeClassName='nav__link--active' className='nav__link'>Home</NavLink></li>
      <li className='nav__item'><NavLink to='/settings' exact activeClassName='nav__link--active' className='nav__link'>Settings</NavLink></li>
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