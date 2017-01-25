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
    1: {name: 'Bill', hand: [], position: 1, immune: false, alive: true},
    2: {name: 'Tom', hand: [], position: 2, immune: true, alive: true},
    3: {name: 'Dick', hand: [], position: 3, immune: true, alive: true},
    4: {name: 'Harry', hand: [], position: 4, immune: true, alive: true}
  },
  activePlayer: 1,
  activeCard: null,
  targetedPlayer: null,
  deck: [],
  removedCard: null,
  history: []
}

const store = createStore(reducer, initialState)
// store .dispatch(action)
// reducer -> state
// store.subscribe

// store .getState -> state
console.log('store', store)
console.log('state', store.getState())

document.addEventListener('DOMContentLoaded', () => {
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
