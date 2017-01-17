const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../reducer')

test('GENERATE_DECK | returns a full deck of 16 cards', t => {

  const state = {
    cardTypes: {
      1: {name: 'guard', rank: 1},
      2: {name: 'priest', rank: 2},
      3: {name: 'baron', rank: 3},
      4: {name: 'handmaid', rank: 4},
      5: {name: 'prince', rank: 5},
      6: {name: 'king', rank: 6},
      7: {name: 'countess', rank: 7},
      8: {name: 'princess', rank: 8},
    },
    players: [],
    deck: [],
    playerTurn: null
  }
  freeze(state)

  const action = {
    type: 'GENERATE_DECK'
  }

  const expectedState = {
    cardTypes: {
      1: {name: 'guard', rank: 1},
      2: {name: 'priest', rank: 2},
      3: {name: 'baron', rank: 3},
      4: {name: 'handmaid', rank: 4},
      5: {name: 'prince', rank: 5},
      6: {name: 'king', rank: 6},
      7: {name: 'countess', rank: 7},
      8: {name: 'princess', rank: 8},
    },
    players: [],
    deck: [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8],
    playerTurn: null
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should give an array of card ranks')

  t.end()
})
