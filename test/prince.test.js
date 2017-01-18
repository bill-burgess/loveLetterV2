const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../reducer')

test('Prince (5) | Tom discards priest and draws king', t => {

  const state = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [5, 1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4, // Harry (who has a prince)
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 6]
  }
  freeze(state)

  const action = {
    type: 'PLAY_CARD',
    payload: 0 // (the prince)
  }

  const intermediateState = reducer(state, action)
  const expectedIntState = {
      players: {
        1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
        2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
        3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
        4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
      },
      activePlayer: 4,
      activeCard: 5,
      targetedPlayer: null,
      deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6]
    }

    t.deepEqual(intermediateState, expectedIntState, 'removes played card from hand and updates activeCard')
  // harry targets another play with the prince

  const targetingAction1 = {
    type: 'TARGET_PLAYER',
    payload: 2 // (Tom)
  }

  const endState1 = reducer(intermediateState, targetingAction1)
  const expectedEndState1 = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [6], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 8, 1, 4, 4, 3]
  }

  t.deepEqual(expectedEndState1, endState1, 'Tom discards his priest and draws the next card, a king')

  const targetingAction2 = {
    type: 'TARGET_PLAYER',
    payload: 1 // (Bill)
  }

  const endState2 = reducer(intermediateState, targetingAction2)
  const expectedEndState2 = {
    players: {
      1: {name: 'Bill', hand: [], position: 1, immune: false, alive: false},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6]
  }

  t.deepEqual(expectedEndState2, endState2, 'Bill discards his princess and is eliminated')


  t.end()
})
