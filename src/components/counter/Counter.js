import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      paused: false
    };
  }

  handleAdd(event) {
    event.preventDefault();
    this.props.onClickCounter(this.props.counterIndex);
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.onDeleteCounter(this.props.counterIndex);
  }

  handleReset(event) {
    event.preventDefault();
    this.props.onResetCounter(this.props.counterIndex);
  }

  handlePause(event) {
    event.preventDefault();
    this.setState({
      paused: !this.state.paused
    });
  }

  render() {
    const { paused } = this.state;
    const { name, numberOfClicks } = this.props;
    return (
      <div className='counter'>
        <div className='counter__title'>
          <p className='counter__name'>{name}</p>
          <button className='book__button button button--small button--red' type='button' onClick={(event) => {this.handleDelete(event);}}><i className="material-icons">clear</i></button>
        </div>
        <div className='counter__details'>
          <p className='counter__clicks'>{numberOfClicks}</p>
          <div className='counter__buttons'>
            <button className='button button--orange' disabled={paused} onClick={(event) => {this.handleAdd(event);}}><i className="button__icon material-icons">add</i></button>
            <button className='button button--light' onClick={(event) => {this.handlePause(event);}}><i className="button__icon material-icons">{paused ? 'play_arrow' : 'pause'}</i></button>
            <button className='button'><i className="button__icon material-icons" onClick={(event) => {this.handleReset(event);}}>restore</i></button>
          </div>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  counterIndex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  numberOfClicks: PropTypes.number,
  onClickCounter: PropTypes.func.isRequired,
  onDeleteCounter: PropTypes.func.isRequired,
  onResetCounter: PropTypes.func.isRequired
};

Counter.defaultProps = {
  numberOfClicks: 0
};
