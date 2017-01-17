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
    players: {},
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
    players: {},
    deck: [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8],
    playerTurn: null
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should give an array of card ranks')

  t.end()
})

test('SET_PLAYERS | adds an object to the object players in the state for each player name submitted', t => {

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
    players: {},
    deck: [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8],
    playerTurn: null
  }
  freeze(state)

  const action = {
    type: 'SET_PLAYERS',
    payload: ['Bill', 'Tom', 'Dick', 'Harry']
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
    players: {
      1: {name: 'Bill', hand: [], playerPosition: 1, immune: false, eliminated: false},
      2: {name: 'Tom', hand: [], playerPosition: 2, immune: false, eliminated: false},
      3: {name: 'Dick', hand: [], playerPosition: 3, immune: false, eliminated: false},
      4: {name: 'Harry', hand: [], playerPosition: 4, immune: false, eliminated: false}
    },
    deck: [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8],
    playerTurn: null
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should add 4 players to the players object')
  t.end()
})
