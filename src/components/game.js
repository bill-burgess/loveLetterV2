const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')

// components
const PlayerHand = require('./PlayerHand')
const PlayerIcons = require('./PlayerIcons')
const HistoryBox = require('./History')
const StartNewGame = require('./startNewGame')
const GuessOptions = require('./Guess')

class Game extends React.Component {
  render(){
    const { targetedPlayer } = this.props
    if (targetedPlayer) {
      return (
        <div>
          <PlayerIcons /><br /><br />
          <GuessOptions /><br /><br />
          <HistoryBox /><br /><br />
          <StartNewGame />
        </div>
      )
    }
    return (
      <div>
        <PlayerIcons /><br /><br />
        <PlayerHand /><br /><br />
        <HistoryBox /><br /><br />
        <StartNewGame />
      </div>
    )
  }
}


module.exports = connect((state) => state)(Game)
