import React, { Component } from 'react';
import Login from './components/login/Login';
import Hero from './components/hero/Hero';
import { connect } from 'react-redux';
import Actions from './redux/actions/actions';
import PropTypes from 'prop-types';
import CounterList from './components/counter-list/CounterList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import CounterDetails from './components/counterDetails/CounterDetails';
import Settings from './components/settings/Settings';
import PrivateRoute from './components/routes/PrivateRoute';

class App extends Component {
  render() {
    const { onLogin, isLoggedIn, onLogout, onSetMaxCounters, onResetCounters } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <Header isLoggedIn={isLoggedIn} onLogout={onLogout}></Header>
          <Hero></Hero>
          <main className='main'>
            <Switch>
              <Route exact path="/" render={() => (
                <Login onLogin={onLogin}></Login>
              )} />
              <PrivateRoute path='/home' component={CounterList} />
              <PrivateRoute path='/settings' render={<Settings onSetMaxCounters={onSetMaxCounters} onResetCounters={onResetCounters}></Settings>} />
              <PrivateRoute path='/counter' component={CounterDetails} keepSearch={true} />
              <Route render={() => <h2>404 NOT FOUND</h2>}></Route>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: (state.currentUser !== '')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: username => {
      dispatch({type: Actions.LOGIN, username});
    },
    onLogout: () => {
      dispatch({type: Actions.LOGOUT});
    },
    onSetMaxCounters: maxCounters => {
      dispatch({type: Actions.SET_MAX_COUNTERS, maxCounters});
    },
    onResetCounters: () => {
      dispatch({type: Actions.RESET_COUNTERS});
    }
  };
};

App.propTypes = {
  onLogin: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  onSetMaxCounters: PropTypes.func,
  onResetCounters: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
