const clone = require('clone')

module.exports = reducer
function reducer(state, action){
  const newState = clone(state)
  switch (action.type) {
    case 'GENERATE_DECK':
      const unshuffledDeck = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8]
      while(unshuffledDeck.length) {
        const randomCardPosition = Math.floor(Math.random() * unshuffledDeck.length)
        const card = unshuffledDeck.splice(randomCardPosition, 1)
        newState.deck.push(card[0])
      }
      return newState

    case 'SET_PLAYERS':
      action.payload.forEach(function(playerName, i){
        newState.players[i + 1] = {
          name: playerName,
          hand: [],
          playerPosition: i + 1,
          immune: false,
          eliminated: false
        }
      })
      return newState

    case 'DEAL':
      newState.removedCard = newState.deck.pop()
      Object.keys(newState.players).forEach(playerId => {
        const card = newState.deck.pop()
        newState.players[playerId].hand.push(card)
      })
      return newState

    case 'PLAY_CARD':
    const playedCard = newState.players[state.activePlayer].hand.splice(action.payload, 1)[0]
    newState.activeCard = playedCard
      switch (playedCard) {
        case 4:
          newState.players[newState.activePlayer].immune = true
          newState.activeCard = null
          return newState

        case 7:
          newState.activeCard = null
          return newState

        case 8:
          newState.players[newState.activePlayer].alive = false
          newState.activeCard = null
        return newState

        default:
          return newState
      }

    case 'TARGET_PLAYER':
      switch (newState.activeCard) {
        case 1:
          newState.targetedPlayer = action.payload
          return newState

        case 2:
          newHistory(newState, 'PLAYED_CARD', action.payload)
          newHistory(newState, 'REVEAL', action.payload)

          break;

        case 3:
          const activePlayerRank = newState.players[newState.activePlayer].hand[0]
          const targetPlayerRank = newState.players[action.payload].hand[0]
          if(activePlayerRank !== targetPlayerRank){
            const playerToEliminate = (activePlayerRank < targetPlayerRank)
              ?newState.players[newState.activePlayer]
              :newState.players[action.payload]
            playerToEliminate.alive = false
          }
          break;

        case 5:
          const discard = newState.players[action.payload].hand.splice(0, 1)[0]
          if(discard === 8){
            newState.players[action.payload].alive = false
          }else{
            if(newState.deck.length === 0){
              newState.players[action.payload].hand.push(newState.removedCard)
            }else{
              drawCard(newState, action.payload)
            }
          }
          break;

        case 6:
          const turnPlayerCard = newState.players[newState.activePlayer].hand.pop()
          const targetPlayerCard = newState.players[action.payload].hand.pop()
          newState.players[newState.activePlayer].hand.push(targetPlayerCard)
          newState.players[action.payload].hand.push(turnPlayerCard)
      }
      newState.activeCard = null
      return newState

      case 'GUESS_CARD':
        newHistory(newState, 'PLAYED_CARD', newState.targetedPlayer, action.payload)
        if(newState.players[newState.targetedPlayer].hand[0] === action.payload){
          newState.players[newState.targetedPlayer].alive = false
        }
        newState.activeCard = null
        newState.targetedPlayer = null
        return newState
  }


}

function newHistory(state, type, targetPlayer, guess = null){
  const historyState = clone(state)
  const targetPlayerCard = targetPlayer
    ?historyState.players[targetPlayer].hand[0]
    :null
  const history = {
    type: type,
    activePlayerAtAction: historyState.activePlayer,
    targetPlayer: targetPlayer,
    playedCard: historyState.activeCard,
    targetPlayerCard: targetPlayerCard,
    guess: guess,
  }
  state.history.push(history)
}

function drawCard(state, playerKey){
  const card = state.deck.pop()
  state.players[playerKey].hand.push(card)
}
