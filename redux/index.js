function createStore(reducer, initial) {
  let state = initial;
  let listeners = [];


  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listener.filters(x => x !== listener);
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}

function combineReducers(reducers) {
  return function (state, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

// ============ test ================
function reducer(state, action) {
  switch (action.type) {
    case 'add': return {
      ...state,
      count: state.count + action.payload
    };
    default: return { ...state };
  }
}

const store = createStore(reducer, {
  count: 0
})

store.subscribe(() => {
  console.log('change: ', store.getState())
})

store.dispatch({
  type: 'add',
  payload: 1
})

console.log(store.getState());