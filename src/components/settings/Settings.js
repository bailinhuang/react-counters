import React from 'react';
import PropTypes from 'prop-types';
import SingleForm from '../single-form/SingleForm';

function Settings(props) {

  const { onSetMaxCounters, onResetCounters } = props;

  return (
    <div className='container--fluid'>
      <SingleForm title='Settings' label='Max Counters' type='number' icon='check' onSubmit={onSetMaxCounters}></SingleForm>
      <div className='form form--small'>
        <p className='form__label'>Reset All Counters</p>
        <button className='button button__text button__text--big' type='button' onClick={onResetCounters}>Reset</button>
      </div>
    </div>
  );
}

Settings.propTypes = {
  onSetMaxCounters: PropTypes.func,
  onResetCounters: PropTypes.func
};

export default Settings;