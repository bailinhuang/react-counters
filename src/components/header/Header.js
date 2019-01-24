import React, { Component } from 'react';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  handleTextChange = (event) => {
    event.preventDefault();
    this.setState({
      username: event.target.value
    });
  }

  render() {
    const { username } = this.state;

    return (
      <header className='header'>
        <form className='form'>
          <div className='form__control form__control--small'>
            <label className='form__label form__label--small'>Username</label>
            <input className='form__input form__input--small form__input--white' type='text' value={username} onChange={this.handleTextChange}></input>
          </div>
          <button className='button button__text' type='submit'>Login</button>
        </form>
      </header>
    );
  }
}
