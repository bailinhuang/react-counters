import React, { Component } from 'react';
import CounterList from '../counter-list/CounterList';
import SingleForm from '../single-form/SingleForm';
import Header from '../header/Header';
import Actions from '../../redux/actions/actions';
import Hero from '../hero/Hero';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CounterApp extends Component {
  render() {
    const { currentUser, currentCountersNumber, maxCounters, onSetMaxCounters, onAddCounter, onLogout } = this.props;

    const settingsForm = (
      <SingleForm title='Settings' label='Max Counters' type='number' icon='check' onSubmit={onSetMaxCounters}></SingleForm>
    );

    const counters = (
      <div className='main__counters'>
        <SingleForm title={`New Counter (Limit: ${maxCounters})`} label='Name' type='text' icon='add' onSubmit={onAddCounter} disabled={currentCountersNumber >= maxCounters}></SingleForm>
        <CounterList currentUser={currentUser}></CounterList>
      </div>
    );

    return (
      <div>
        <Header onLogout={onLogout}></Header>
        <Hero></Hero>
        <main className='main'>
          { maxCounters === 0 ? settingsForm : counters }
        </main>
      </div>
    );
  }
};

const mapStateToProps = (state, otherProps) => {
  return {
    maxCounters: state.users[otherProps.currentUser].maxCounters,
    currentCountersNumber: state.users[otherProps.currentUser].counters.length
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMaxCounters: maxCounters => {
      dispatch({type: Actions.SET_MAX_COUNTERS, maxCounters});
    },
    onAddCounter: counterName => {
      dispatch({type: Actions.ADD_COUNTER, counterName});
    },
    onLogout: () => {
      dispatch({type: Actions.LOGOUT});
    }
  };
};

CounterApp.propTypes = {
  currentUser: PropTypes.string,
  currentCountersNumber: PropTypes.number,
  maxCounters: PropTypes.number.isRequired,
  onSetMaxCounters: PropTypes.func.isRequired,
  onAddCounter: PropTypes.func.isRequired,
  onLogout: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp);
