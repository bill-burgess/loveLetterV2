const React = require('react')
const _ = require('lodash')

// components
const PlayerHand = require('./PlayerHand')
const PlayerIcons = require('./PlayerIcons')
const HistoryBox = require('./History')
const StartNewGame = require('./startNewGame')
const GuessOptions = require('./Guess')

module.exports = function App (props) {
  const { store, state } = props
  // console.log('The state: ', state)
  if (state.targetedPlayer) {
    return (
      <div>
        <PlayerIcons store={store} state={state} /><br /><br />
        <GuessOptions store={store} state={state} /><br /><br />
        <HistoryBox store={store} state={state} /><br /><br />
        <StartNewGame store={store} state={state} />
      </div>
    )
  }
  return (
    <div>
      <PlayerIcons store={store} state={state} /><br /><br />
      <PlayerHand store={store} state={state} /><br /><br />
      <HistoryBox store={store} state={state} /><br /><br />
      <StartNewGame store={store} state={state} />
    </div>
  )
}
