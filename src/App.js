import React, { Component } from 'react';
import Hero from './components/hero/Hero';
import CounterList from './components/counter-list/CounterList';
import SingleForm from './components/single-form/SingleForm';
import Header from './components/header/Header';
import { connect } from 'react-redux';
import Actions from './redux/actions/actions';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    const { currentCountersNumber, maxCounters, onSetMaxCounters, onAddCounter } = this.props;
    const settingsForm = (
      <SingleForm title='Settings' label='Max Counters' type='number' icon='check' onSubmit={onSetMaxCounters}></SingleForm>
    );
    const counters = (
      <div className='main__counters'>
        {}
        <SingleForm title={`New Counter (Limit: ${maxCounters})`} label='Name' type='text' icon='add' onSubmit={onAddCounter} disabled={currentCountersNumber >= maxCounters}></SingleForm>
        <CounterList></CounterList>
      </div>
    );

    return (
      <div>
        <Header></Header>
        <Hero></Hero>
        <main className='main'>
          { maxCounters === 0 ? settingsForm : counters }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    maxCounters: state.maxCounters,
    currentCountersNumber: state.counters.length
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMaxCounters: maxCounters => {
      dispatch({type: Actions.SET_MAX_COUNTERS, maxCounters});
    },
    onAddCounter: counterName => {
      dispatch({type: Actions.ADD_COUNTER, counterName});
    }
  };
};

App.propTypes = {
  currentCountersNumber: PropTypes.number,
  maxCounters: PropTypes.number.isRequired,
  onSetMaxCounters: PropTypes.func.isRequired,
  onAddCounter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
