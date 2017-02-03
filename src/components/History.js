const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')

class History extends React.Component {
  render () {
    const { history, dispatch, players } = this.props
    const cards = {
      1: 'guard',
      2: 'priest',
      3: 'baron',
      4: 'handmaid',
      5: 'prince',
      6: 'king',
      7: 'countess',
      8: 'princess'
    }

    function generateHistory (players, history) {
      const activePlayer = players[history.activePlayerAtAction].name
      const playedCard = cards[history.playedCard]
      const targetPlayerCard = history.targetPlayerCard
      switch (history.type) {
        case 'PLAYED_CARD':
          let historyLog = ''
          historyLog += `${activePlayer} played a ${playedCard}`
          if (history.targetPlayer) {
            const targetPlayer = players[history.targetPlayer].name
            historyLog += `, targeting ${targetPlayer}`
          }
          return historyLog

        case 'ELIMINATED':
          const eliminatedPlayer = players[history.targetPlayer].name
          return `${eliminatedPlayer} was eliminated by the ${playedCard} effect`

        case 'DISCARD':
          const discardingPlayer = players[history.targetPlayer]
          const discard = cards[history.targetPlayerCard]
          return `${discardingPlayer.name} discards a ${discard}`

        case 'REVEAL':
          const targetPlayer = players[history.targetPlayer].name
          if (history.playedCard === 2 && history.activePlayerAtAction !== 1) {
            return
          }
          return `${targetPlayer} has a ${cards[targetPlayerCard]}`

        case 'WINNER':
          const winningPlayer = players[history.targetPlayer].name
          return `Game over a winner is ${winningPlayer}`

        case 'IMMUNE':
          const immunePlayer = players[history.targetPlayer].name
          return `${immunePlayer} is immune and is unaffected`

        case 'GUESS':
          const targetedPlayer = players[history.targetPlayer].name
          return `${activePlayer} guessed ${targetedPlayer} has a ${cards[history.guess]}`

        case 'WINNER':
          const winner = players[history.targetPlayer].name
          return `Game over a winner is ${winner}`

        default:
          return 'invalid input'
      }
    }
    history.map(entry => {
    })
    return (
      <div>
        {
        history.map(entry => <div>{generateHistory(players, entry)}</div>)
      }
      </div>

    )
  }
}

module.exports = connect((state) => state)(History)
