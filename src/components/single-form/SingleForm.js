import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SingleForm extends Component {
  constructor(props) {
    super();
    this.state = {
      text: '',
      number: 1,
      type: props.type
    };
  }

  handleTextChange = (event) => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
  }

  handleNumberChange = (event) => {
    event.preventDefault();
    this.setState({
      number: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state[this.state.type]);
    this.setState({
      text: ''
    });
  }

  render() {
    const { disabled, title, label, type, icon } = this.props;
    const { text, number } = this.state;

    return (
      <div className='single-form'>
        <h2 className='heading__secondary'>{title}</h2>
        <form className='form form--small' onSubmit={(event) => this.handleSubmit(event)}>
          <div className='form__control'>
            <label className='form__label'>{label}</label>
            {
              (type === 'text' ? <input className='form__input' type='text' value={text} onChange={this.handleTextChange}></input> : <input className='form__input' type='number' value={number} onChange={this.handleNumberChange}></input>)
            }
          </div>
          <button className='button' type='submit' disabled={(this.state[this.state.type] === '' || this.state[this.state.type] <= 0 || disabled)}><i className="material-icons">{icon}</i></button>
        </form>
      </div>
    );
  }
}

SingleForm.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

SingleForm.defaultProps = {
  icon: 'check'
};
