const clone = require('clone')

module.exports = reducer
function reducer (state, action) {
  const newState = clone(state)
  switch (action.type) {

    case 'START_NEW_GAME':
      const newGameState = {
        players: {
          1: {name: 'you', hand: [], position: 1, immune: false, alive: true},
          2: {name: 'Tom', hand: [], position: 2, immune: false, alive: true},
          3: {name: 'Dick', hand: [], position: 3, immune: false, alive: true},
          4: {name: 'Harry', hand: [], position: 4, immune: false, alive: true}
        },
        activePlayer: 1,
        activeCard: null,
        targetedPlayer: null,
        deck: [],
        removedCard: null,
        history: []
      }
      const unshuffledDeck = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8]
      while (unshuffledDeck.length) {
        const randomCardPosition = Math.floor(Math.random() * unshuffledDeck.length)
        const card = unshuffledDeck.splice(randomCardPosition, 1)
        newGameState.deck.push(card[0])
      }
      newGameState.removedCard = newGameState.deck.pop()
      Object.keys(newGameState.players).forEach(playerId => {
        const card = newGameState.deck.pop()
        newGameState.players[playerId].hand.push(card)
      })
      return newGameState

    case 'PLAY_CARD':
      if(newState.activeCard){
        return newState
      }
      const playedCard = newState.players[state.activePlayer].hand.splice(action.payload, 1)[0]
      newState.activeCard = playedCard
      switch (playedCard) {
        case 4:
          newState.players[newState.activePlayer].immune = true
          newHistory(newState, 'PLAYED_CARD')
          newState.activeCard = null
          return newState

        case 7:
          newHistory(newState, 'PLAYED_CARD')
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
      if(!newState.activeCard){
        return newState
      }
      switch (newState.activeCard) {
        case 1:
          newState.targetedPlayer = action.payload
          return newState

        case 2:
          newHistory(newState, 'PLAYED_CARD', action.payload)
          newHistory(newState, 'REVEAL', action.payload)

          break

        case 3:
          newHistory(newState, 'PLAYED_CARD', action.payload)
          const activePlayerRank = newState.players[newState.activePlayer].hand[0]
          const targetPlayerRank = newState.players[action.payload].hand[0]
          if (activePlayerRank !== targetPlayerRank) {
            const playerToEliminate = (activePlayerRank < targetPlayerRank)
              ? newState.players[newState.activePlayer]
              : newState.players[action.payload]
            playerToEliminate.alive = false
            newHistory(newState, 'ELIMINATED', playerToEliminate.position)
          }
          break

        case 5:
          newHistory(newState, 'PLAYED_CARD', action.payload)
          const discard = newState.players[action.payload].hand.splice(0, 1)[0]
          if (discard === 8) {
            newHistory(newState, 'ELIMINATED', action.payload)
            newState.players[action.payload].alive = false
          } else {
            if (newState.deck.length === 0) {
              newState.players[action.payload].hand.push(newState.removedCard)
            } else {
              drawCard(newState, action.payload)
            }
          }
          break

        case 6:
          newHistory(newState, 'PLAYED_CARD', action.payload)
          const turnPlayerCard = newState.players[newState.activePlayer].hand.pop()
          const targetPlayerCard = newState.players[action.payload].hand.pop()
          newState.players[newState.activePlayer].hand.push(targetPlayerCard)
          newState.players[action.payload].hand.push(turnPlayerCard)
      }
      newState.activeCard = null
      return newState

    case 'GUESS_CARD':
      newHistory(newState, 'PLAYED_CARD', newState.targetedPlayer, action.payload)
      if (newState.players[newState.targetedPlayer].hand[0] === action.payload) {
        newHistory(newState, 'ELIMINATED', newState.targetedPlayer)
        newState.players[newState.targetedPlayer].alive = false
      }
      newState.activeCard = null
      newState.targetedPlayer = null
      return newState

      default:
        return newState
  }
}

function newHistory (state, type, targetPlayer = null, guess = null) {
  const historyState = clone(state)
  const targetPlayerCard = targetPlayer
    ? historyState.players[targetPlayer].hand[0]
    : null
  const history = {
    type: type,
    activePlayerAtAction: historyState.activePlayer,
    targetPlayer: targetPlayer,
    playedCard: historyState.activeCard,
    targetPlayerCard: targetPlayerCard,
    guess: guess
  }
  state.history.push(history)
}

function drawCard (state, playerKey) {
  const card = state.deck.pop()
  state.players[playerKey].hand.push(card)
}
