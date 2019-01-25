import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleForm from '../single-form/SingleForm';

function Header(props) {

  const handleLogin = (username) => {
    props.onLogin(username);
    props.history.push('/home');
  };

  return (
    <SingleForm title='Login' label='Username' type='text' icon='check' onSubmit={handleLogin}></SingleForm>
  );
}

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default withRouter(Header);