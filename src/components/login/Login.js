import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SingleForm from '../single-form/SingleForm';
import queryString from 'query-string';

function Header(props) {

  const handleLogin = (username) => {
    props.onLogin(username);
    let redirectTo = {
      pathname: '/home'
    };
    if (queryString.parse(props.location.search).redirect) {
      const { redirect } = queryString.parse(props.location.search);
      let search = props.location.search.split('&');
      search = search.slice(1);
      search = search.join('&');
      redirectTo.pathname = `/${redirect}`;
      redirectTo.search = `?${search}`;
    }
    props.history.replace(redirectTo);
  };

  return (
    <SingleForm title='Login' label='Username' type='text' icon='check' onSubmit={handleLogin}></SingleForm>
  );
}

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(Header);