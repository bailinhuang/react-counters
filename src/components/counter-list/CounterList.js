import React, { Component } from 'react';
import Counter from '../counter/Counter';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';
import PropTypes from 'prop-types';
import SingleForm from '../single-form/SingleForm';

class CounterList extends Component {

  render() {
    const { counters, onClickCounter, onDeleteCounter, onResetCounter, currentUser, currentCountersNumber, maxCounters, onAddCounter, validateMaxCounters } = this.props;
    return (
      <div className='container--fluid'>
        <SingleForm title={`New Counter (${validateMaxCounters ? 'Limit: ' + maxCounters : 'No Limit'})`} label='Name' type='text' icon='add' onSubmit={onAddCounter} disabled={validateMaxCounters &&currentCountersNumber >= maxCounters}></SingleForm>
        <section className='counters'>
          <h2 className='heading__secondary'>Your Counters ({counters.length})</h2>
          <div className='counters__container'>
            { counters.map((counter, index) => {
              return (
                <Counter 
                  key={index} 
                  currentUser={currentUser}
                  counterIndex={index}
                  name={counter.name}
                  numberOfClicks={counter.numberOfClicks}
                  onClickCounter={onClickCounter}
                  onDeleteCounter={onDeleteCounter}
                  onResetCounter={onResetCounter}
                />
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    counters: state.users[state.currentUser].counters,
    maxCounters: state.users[state.currentUser].maxCounters,
    currentCountersNumber: state.users[state.currentUser].counters.length,
    validateMaxCounters: (state.users[state.currentUser].maxCounters !== -1)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickCounter: counterIndex => {
      dispatch({type: Actions.CLICK_COUNTER, counterIndex});
    },
    onDeleteCounter: counterIndex => {
      dispatch({type: Actions.DELETE_COUNTER, counterIndex});
    },
    onResetCounter: counterIndex => {
      dispatch({type: Actions.RESET_COUNTER, counterIndex});
    },
    onAddCounter: counterName => {
      dispatch({type: Actions.ADD_COUNTER, counterName});
    }
  };
};

CounterList.propTypes = {
  currentUser: PropTypes.string.isRequired,
  counters: PropTypes.array.isRequired,
  currentCountersNumber: PropTypes.number.isRequired,
  maxCounters: PropTypes.number.isRequired,
  validateMaxCounters: PropTypes.bool.isRequired,
  onClickCounter: PropTypes.func.isRequired,
  onDeleteCounter: PropTypes.func.isRequired,
  onResetCounter: PropTypes.func.isRequired,
  onAddCounter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterList);