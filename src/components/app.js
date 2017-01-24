const React = require('react')
const _ = require('lodash')

// components
const PlayerHand = require('./PlayerHand')
const PlayerIcons = require('./PlayerIcons')
const HistoryBox = require('./History')

module.exports = function App (props) {
  const { store, state } = props
  // console.log('The state: ', state)

  return (
    <div>
      <PlayerIcons />
      <PlayerHand store={store} state={state}/>
      <HistoryBox />
    </div>
  )
}
