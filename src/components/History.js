const React = require('react')
const _ = require('lodash')

module.exports = function(props){
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

function generateHistory(state, history){
  const activePlayer = state.players[history.activePlayerAtAction].name
  const playedCard = cards[history.playedCard]
  switch (history.type) {
    case 'PLAYED_CARD':
      let historyLog = ''
      historyLog += `${activePlayer} played a ${playedCard}`
      if(history.targetPlayer){
        const targetPlayer = state.players[history.targetPlayer].name
        historyLog += `, targeting ${targetPlayer}`
      }
      if(history.guess){
        const cardGuessed = cards[history.guess]
        historyLog += ` and guessing ${cardGuessed}`
      }
      return historyLog

    case 'ELIMINATED':
      const eliminatedPlayer = state.players[history.targetPlayer].name
      return `${eliminatedPlayer} was eliminated by the ${playedCard} effect`

    case 'DISCARD':
      const discardingPlayer = state.players[history.targetPlayer]
      const discard = cards[discardingPlayer.hand[0]]
      return `${discardingPlayer.name} discards a ${cards[discardingPlayer.hand[0]]}`

    case 'REVEAL':
      const targetPlayer = state.players[history.targetPlayer].name
      const targetPlayerCard = cards[state.players[history.targetPlayer].hand[0]]
      return `${targetPlayer} has a ${targetPlayerCard}`

    case 'WINNER':
      const winner = state.players[history.targetPlayer].name
      return `Game over a winner is ${winner}`

      default:
        return 'invalid input'
  }
}
