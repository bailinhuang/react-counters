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

class App extends Component {

  render() {
    const { onLogin, isLoggedIn, onLogout, onSetMaxCounters } = this.props;

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
              <Route path='/home' component={CounterList} />
              <Route path='/settings' render={()=>(<Settings onSetMaxCounters={onSetMaxCounters}></Settings>)} />
              <Route path='/counter' component={CounterDetails} />
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
    }
  };
};

App.propTypes = {
  onLogin: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  onSetMaxCounters: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
