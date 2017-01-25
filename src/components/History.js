const React = require('react')
const _ = require('lodash')

module.exports = function (props) {
  const { state, store} = props
  const { history } = state
  history.map(entry => {
  })
  return (
    <div>
      {
      history.map(entry => <div>{generateHistory(state, entry)}</div>)
    }
    </div>

  )
}

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

function generateHistory (state, history) {
  const activePlayer = state.players[history.activePlayerAtAction].name
  const playedCard = cards[history.playedCard]
  const targetPlayerCard = history.targetPlayerCard
  switch (history.type) {
    case 'PLAYED_CARD':
      let historyLog = ''
      historyLog += `${activePlayer} played a ${playedCard}`
      if (history.targetPlayer) {
        const targetPlayer = state.players[history.targetPlayer].name
        historyLog += `, targeting ${targetPlayer}`
      }
      return historyLog

    case 'ELIMINATED':
      const eliminatedPlayer = state.players[history.targetPlayer].name
      return `${eliminatedPlayer} was eliminated by the ${playedCard} effect`

    case 'DISCARD':
      const discardingPlayer = state.players[history.targetPlayer]
      const discard = cards[history.targetPlayerCard]
      return `${discardingPlayer.name} discards a ${discard}`

    case 'REVEAL':
      const targetPlayer = state.players[history.targetPlayer].name
      if (history.playedCard === 2 && history.activePlayerAtAction !== 1) {
        return
      }
      return `${targetPlayer} has a ${cards[targetPlayerCard]}`

    case 'WINNER':
      const winner = state.players[history.targetPlayer].name
      return `Game over a winner is ${winner}`

    case 'IMMUNE':
      const immunePlayer = state.players[history.targetPlayer].name
      return `${immunePlayer} is immune and is unaffected`

    case 'GUESS':
      const targetedPlayer = state.players[history.targetPlayer].name
      return `${activePlayer} guessed ${targetedPlayer} has a ${cards[history.guess]}`

    default:
      return 'invalid input'
  }
}
