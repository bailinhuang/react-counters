import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from '../../redux/actions/actions';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

class CounterDetails extends Component {

  constructor(props) {
    super();
    this.state = {
      name: props.counter.name,
      counterIndex: queryString.parse(props.location.search).counterIndex,
      user: queryString.parse(props.location.search).user
    };
  }

  handleDeleteCounter = (counterIndex) => {
    this.props.onDeleteCounter(counterIndex);
    this.props.history.push('/home');
  };

  handleTextChange = (event) => {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  }

  handleBlur = () => {
    this.props.onChangeName(this.state.counterIndex, this.state.name);
  }

  render() {
    const { counter, currentUser } = this.props;
    const { name, user, counterIndex } = this.state;

    return (
      <div className='container counter-details'>
        <div className='counter counter--light mb-none'>
          <div className='counter__title p-none'> 
            {
              (user === currentUser ?
                <React.Fragment>
                  <input className='counter__input ml-md' type='text' value={name} onChange={this.handleTextChange} onBlur={this.handleBlur}></input>
                  <button onClick={()=>{this.handleDeleteCounter(counterIndex);}} className='book__button button button--small button--red ml-xs'><i className="material-icons">clear</i></button>
                </React.Fragment> : 
                <p className='counter__name counter__name--dark ml-none'>{counter.name}</p>)
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
    },
    onChangeName: (counterIndex, counterName) => {
      dispatch({type: Actions.CHANGE_NAME, payload: {counterIndex: counterIndex, counterName: counterName}});
    }
  };
};

CounterDetails.propTypes = {
  currentUser: PropTypes.string,
  counter: PropTypes.object,
  onDeleteCounter: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  location: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CounterDetails));
