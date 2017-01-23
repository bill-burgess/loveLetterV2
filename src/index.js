const debug = require('debug')('index')
const React = require('react')
const ReactDOM = require('react-dom')
const { createStore } = require('redux')
const reducer = require('./reducer')

// components
const App = require('./components/app')

// actions
// plain object {type: string, payload: Object | string | number}

// model -> state

// reducer (state, action) :: -> state
// const initialState = 0
const initialState = {
  players: {
    1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
    2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
    3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
    4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
  },
  activePlayer: 1,
  activeCard: 6,
  targetedPlayer: null,
  deck: [5, 2, 1, 1, 1, 4, 4, 3, 5],
  removedCard: 3,
  history: []
}

const store = createStore(reducer, initialState)
// store .dispatch(action)
// reducer -> state
// store.subscribe

// store .getState -> state
console.log('store', store)
console.log('state', store.getState())

document.addEventListener('DOMContentLoaded', (e) => {
  store.subscribe(() => {
    const state = store.getState()
    console.log('state', state)
    render(state)
  })

  function render (state) {
    const root = document.querySelector('#app')
    ReactDOM.render(
      <App state={state} store={store} />,
      root
    )
  }

  render(store.getState())

})
