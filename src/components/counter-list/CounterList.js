import React, { Component } from 'react';
import Counter from '../counter/Counter';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';
import PropTypes from 'prop-types';

class CounterList extends Component {

  render() {
    const { counters, onClickCounter, onDeleteCounter, onResetCounter } = this.props;
    return (
      <section className='counters'>
        <h2 className='heading__secondary'>Your Counters ({counters.length})</h2>
        <div className='counters__container'>
          { counters.map((counter, index) => {
            return (
              <Counter 
                key={index} 
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
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    counters: state.users[otherProps.currentUser].counters
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
    }
  };
};

CounterList.propTypes = {
  currentUser: PropTypes.string.isRequired,
  counters: PropTypes.array.isRequired,
  onClickCounter: PropTypes.func.isRequired,
  onDeleteCounter: PropTypes.func.isRequired,
  onResetCounter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterList);