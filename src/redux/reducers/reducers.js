import Actions from '../actions/actions';

const INITIAL_STATE = {
  maxCounters: 0,
  counters: []
};

const CounterReducer = (state = INITIAL_STATE, action) => {
  let counter, updatedCounter, newCounters;
  switch (action.type) {
  case Actions.CLICK_COUNTER:
    counter = state.counters[action.counterIndex];
    updatedCounter = {
      ...counter,
      numberOfClicks: counter.numberOfClicks + 1
    };
    newCounters = [
      ...state.counters
    ];
    newCounters[action.counterIndex] = updatedCounter;
    return {
      ...state,
      counters: newCounters
    };
  case Actions.RESET_COUNTER:
    counter = state.counters[action.counterIndex];
    updatedCounter = {
      ...counter,
      numberOfClicks: 0
    };
    newCounters = [
      ...state.counters
    ];
    newCounters[action.counterIndex] = updatedCounter;
    return {
      ...state,
      counters: newCounters
    };
  case Actions.ADD_COUNTER:
    return Object.assign(
      {},
      state,
      {
        counters: [
          ...state.counters,
          {
            name: action.counterName,
            numberOfClicks: 0
          }
        ]
      }
    );
  case Actions.DELETE_COUNTER:
    newCounters = [
      ...state.counters
    ];
    newCounters.splice(action.counterIndex, 1);
    return {
      ...state,
      counters: newCounters
    };
  case Actions.SET_MAX_COUNTERS:
    return Object.assign(
      {},
      state,
      {
        maxCounters: action.maxCounters
      }
    );
  default:
    return state;
  }
};

export default CounterReducer;