import React from 'react';
import PropTypes from 'prop-types';
import SingleForm from '../single-form/SingleForm';

function Settings(props) {

  const { onSetMaxCounters, onResetCounters } = props;

  return (
    <div className='container--fluid'>
      <button className='button button__text' type='button' onClick={onResetCounters}>Reset Counters</button>
      <SingleForm title='Settings' label='Max Counters' type='number' icon='check' onSubmit={onSetMaxCounters}></SingleForm>
    </div>
  );
}

Settings.propTypes = {
  onSetMaxCounters: PropTypes.func,
  onResetCounters: PropTypes.func
};

export default Settings;