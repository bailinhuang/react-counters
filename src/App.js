import React, { Component } from 'react';
import SingleForm from './components/single-form/SingleForm';
import Hero from './components/hero/Hero';
import { connect } from 'react-redux';
import Actions from './redux/actions/actions';
import PropTypes from 'prop-types';
import CounterApp from './components/counter-app/CounterApp';

class App extends Component {
  render() {
    const { currentUser, onLogin } = this.props;

    const login = (
      <div>
        <Hero></Hero>
        <div className='login'>
          <SingleForm title='Login' label='Username' type='text' icon='check' onSubmit={onLogin}></SingleForm>
        </div>
      </div>
    );

    return (
      <div>
        { currentUser === '' ? login : <CounterApp currentUser={currentUser}></CounterApp> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: username => {
      dispatch({type: Actions.LOGIN, username});
    }
  };
};

App.propTypes = {
  currentUser: PropTypes.string,
  onLogin: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
