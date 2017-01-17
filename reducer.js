const clone = require('clone')

module.exports = reducer

function reducer(state, action){
  switch (action.type) {
    case 'GENERATE_DECK':
      const newState = clone(state)
      newState.deck = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8]
      return newState

  }
}
