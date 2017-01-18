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
      newState.deck.pop()
      Object.keys(newState.players).forEach(playerId => {
        const card = newState.deck.pop()
        newState.players[playerId].hand.push(card)
      })
      return newState

    case 'PLAY_CARD':
      const playedCard = newState.players[state.activePlayer].hand.splice(action.payload, 1)[0]
      newState.activeCard = playedCard
      return newState

    case 'TARGET_PLAYER':
      switch (newState.activeCard) {
        case 3:
          const activePlayerRank = newState.players[newState.activePlayer].hand[0]
          const targetPlayerRank = newState.players[action.payload].hand[0]
          if(activePlayerRank !== targetPlayerRank){
            const playerToEliminate = (activePlayerRank < targetPlayerRank)
              ?newState.players[newState.activePlayer]
              :newState.players[action.payload]
            playerToEliminate.alive = false
          }
      }
      newState.activeCard = null
      return newState

  }
}
