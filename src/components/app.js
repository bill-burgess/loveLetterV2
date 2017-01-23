const React = require('react')
const _ = require('lodash')

// components
const PlayerHand = require('./PlayerHand')
const PlayerIcons = require('./PlayerIcons')
const HistoryBox = require('./History')

module.exports = function App (props) {
  const { store, state } = props
  console.log('The state: ', state);
  const { players } = state
  console.log('players:', players);

  return (
    <div>
      <PlayerIcons />
      <PlayerHand store={store}/>
      <HistoryBox />
    </div>
  )
}
