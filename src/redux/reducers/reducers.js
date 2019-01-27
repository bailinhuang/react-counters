import Actions from '../actions/actions';

const INITIAL_STATE = {
  currentUser: '',
  users: {}
};

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('counterAppData'));
}

function saveLocalStorage(newState) {
  return localStorage.setItem('counterAppData', JSON.stringify(newState));
}

function getSessionStorage() {
  return sessionStorage.getItem('loggedUser') || '';
}

function saveSessionStorage(username) {
  return sessionStorage.setItem('loggedUser', username);
}

function getCurrentTimestamp() {
  const today = new Date();
  return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()} at ${today.getHours()}:${today.getMinutes()}`; 
}

const CounterReducer = (state = INITIAL_STATE, action) => {
  let oldCounter, updatedCounter, newCounters, user, newUsers, newState = {};
  switch (action.type) {

  case Actions.CLICK_COUNTER:
    user = state.users[state.currentUser];
    oldCounter = user.counters[action.counterIndex];
    updatedCounter = {
      ...oldCounter,
      numberOfClicks: oldCounter.numberOfClicks + 1
    };
    if (updatedCounter.numberOfClicks === 1) {
      updatedCounter.firstClickTimestamp = getCurrentTimestamp();
    }
    updatedCounter.lastClickTimestamp = getCurrentTimestamp();
    newCounters = [
      ...user.counters
    ];
    newCounters[action.counterIndex] = updatedCounter;
    user.counters = newCounters;
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.RESET_COUNTER:
    user = state.users[state.currentUser];
    oldCounter = user.counters[action.counterIndex];
    updatedCounter = {
      ...oldCounter,
      numberOfClicks: 0
    };
    newCounters = [
      ...user.counters
    ];
    newCounters[action.counterIndex] = updatedCounter;
    user.counters = newCounters;
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.RESET_COUNTERS:
    user = state.users[state.currentUser];
    newCounters = [
      ...user.counters
    ];
    user.counters.forEach((counter, index) => {
      updatedCounter = {
        ...counter,
        numberOfClicks: 0
      };
      newCounters[index] = updatedCounter;
    });
    user.counters = newCounters;
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.CHANGE_NAME:
    user = state.users[state.currentUser];
    oldCounter = user.counters[action.payload.counterIndex];
    updatedCounter = {
      ...oldCounter,
      name: action.payload.counterName
    };
    newCounters = [
      ...user.counters
    ];
    newCounters[action.payload.counterIndex] = updatedCounter;
    user.counters = newCounters;
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.ADD_COUNTER:
    user = state.users[state.currentUser];
    user.counters = [
      ...user.counters,
      {
        name: action.counterName,
        numberOfClicks: 0,
        creationTimestamp: getCurrentTimestamp(),
        firstClickTimestamp: 'This counter hasn\'t been clicked',
        lastClickTimestamp: 'This counter hasn\'t been clicked'
      }
    ];
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.DELETE_COUNTER:
    user = state.users[state.currentUser];
    newCounters = [
      ...user.counters
    ];
    newCounters.splice(action.counterIndex, 1);
    user.counters = newCounters;
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.SET_MAX_COUNTERS:
    user = state.users[state.currentUser];
    user.maxCounters = parseInt(action.maxCounters);
    newCounters = user.counters;
    if (newCounters.length > action.maxCounters) {
      newCounters.splice(action.maxCounters, newCounters.length - action.maxCounters);
    }
    user.counters = newCounters;
    newUsers = state.users;
    newUsers[state.currentUser] = user;
    newState = {
      ...state,
      users: newUsers
    };
    break;

  case Actions.LOGIN:
    user = state.users[action.username];
    if (!user) {
      user = {
        maxCounters: -1,
        counters: []
      };
    }
    newUsers = state.users;
    newUsers[action.username] = user;
    saveSessionStorage(action.username);
    newState = {
      ...state,
      currentUser: action.username,
      users: newUsers
    };
    break;

  case Actions.LOGOUT: 
    newState = {
      ...state,
      currentUser: '',
    };
    saveSessionStorage('');
    break;

  default:
    newState = {
      ...getLocalStorage(),
      currentUser: getSessionStorage()
    };
    break;
  }
  saveLocalStorage(newState);
  return Object.assign(
    {},
    state,
    {
      ...newState
    }
  );
};

export default CounterReducer;