import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';
import queryString from 'query-string';

class CounterDetails extends Component {
  render() {
    const { user, counterIndex } = queryString.parse(this.props.location.search);
    const { onDeleteCounter, counter, currentUser } = this.props;

    return (
      <div className='container counter-details'>
        <div className='counter counter--light mb-none'>
          <div className='counter__title p-none'>
            <p className={`counter__name counter__name--dark ${user === currentUser ? '' : 'ml-0'}`}>{counter.name}</p>
            {
              (user === currentUser ? <button onClick={()=>{onDeleteCounter(counterIndex);}} className='book__button button button--small button--red'><i className="material-icons">clear</i></button> : null)
            }
          </div>
          <p className='counter__clicks counter__clicks--dark mt-md'>{counter.numberOfClicks}</p>
          <ul className='counter__list'>
            <li className='counter__item'><strong>Created on:</strong>{counter.creationTimestamp}.</li>
            <li className='counter__item'><strong>First Click on:</strong>{counter.firstClickTimestamp}.</li>
            <li className='counter__item'><strong>Last Click on:</strong>{counter.lastClickTimestamp}.</li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return {
    currentUser: state.currentUser,
    counter: state.users[queryString.parse(otherProps.location.search).user].counters[queryString.parse(otherProps.location.search).counterIndex]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteCounter: counterIndex => {
      dispatch({type: Actions.DELETE_COUNTER, counterIndex});
    }
  };
};

CounterDetails.propTypes = {
  currentUser: PropTypes.string,
  counter: PropTypes.object,
  onDeleteCounter: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterDetails);
