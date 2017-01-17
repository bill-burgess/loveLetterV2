const clone = require('clone')

module.exports = reducer
function reducer(state, action){
  const newState = clone(state)
  switch (action.type) {
    case 'GENERATE_DECK':
      newState.deck = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8]
      return newState

    case 'SET_PLAYERS':
      action.payload.forEach(function(playerName, i){
        newState.players[i + 1] = {name: playerName, hand: [], playerPosition: i + 1, immune: false, eliminated: false}
      })
      return newState
  }
}
