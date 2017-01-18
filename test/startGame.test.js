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
    playerTurn: 1
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
    playerTurn: 1
  }

  const newState = reducer(state, action)

  t.deepEqual(newState.cardTypes, expectedState.cardTypes, 'should not change other aspects of the state')
  t.is(newState.deck.length, 16, 'deck should contain 16 cards')
  t.is(typeof(newState.deck[4]), 'number', 'any given element of the deck should be a number')

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
    playerTurn: 1
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
    playerTurn: 1
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should add 4 players to the players object')
  t.end()
})


test('DEAL | removes the last card from the deck array then gives one card to each player', t => {

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
    players: {
      1: {name: 'Bill', hand: [], playerPosition: 1, immune: false, eliminated: false},
      2: {name: 'Tom', hand: [], playerPosition: 2, immune: false, eliminated: false},
      3: {name: 'Dick', hand: [], playerPosition: 3, immune: false, eliminated: false},
      4: {name: 'Harry', hand: [], playerPosition: 4, immune: false, eliminated: false}
    },
    deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6, 5, 3, 1, 2, 1, 7],
    playerTurn: 1
  }
  freeze(state)

  const action = {
    type: 'DEAL'
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
      1: {name: 'Bill', hand: [1], playerPosition: 1, immune: false, eliminated: false},
      2: {name: 'Tom', hand: [2], playerPosition: 2, immune: false, eliminated: false},
      3: {name: 'Dick', hand: [1], playerPosition: 3, immune: false, eliminated: false},
      4: {name: 'Harry', hand: [3], playerPosition: 4, immune: false, eliminated: false}
    },
    deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6, 5],
    playerTurn: 1
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should remove one card, give each player one card and remove those card from the deck')

  t.end()
})
