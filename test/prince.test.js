const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../src/reducer')

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
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 6],
    removedCard: 3,
    history: []

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
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 6],
    removedCard: 3,
    history: []
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
    deck: [5, 2, 1, 1, 1, 4, 4, 3],
    removedCard: 3,
    history: [
      {
        type: 'PLAYED_CARD',
        targetPlayer: 2,
        activePlayerAtAction: 4,
        playedCard: 5,
        targetPlayerCard: 2,
        guess: null
      }
    ]
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
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 6],
    removedCard: 3,
    history: [
      {
        type: 'PLAYED_CARD',
        targetPlayer: 1,
        activePlayerAtAction: 4,
        playedCard: 5,
        targetPlayerCard: 8,
        guess: null
      },
      {
        type: 'ELIMINATED',
        targetPlayer: 1,
        activePlayerAtAction: 4,
        playedCard: 5,
        targetPlayerCard: undefined,
        guess: null
      }
    ]
  }

  t.deepEqual(expectedEndState2, endState2, 'Bill discards his princess and is eliminated')

  const intermediateState2 = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: 5,
    targetedPlayer: null,
    deck: [],
    removedCard: 3,
    history: []
  }

  const endState3 = reducer(intermediateState2, targetingAction1)

  const expectedEndState3 = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [3], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: null,
    targetedPlayer: null,
    deck: [],
    removedCard: 3,
    history: [
      {
        type: 'PLAYED_CARD',
        targetPlayer: 2,
        activePlayerAtAction: 4,
        playedCard: 5,
        targetPlayerCard: 2,
        guess: null
      }
    ]
  }

  t.deepEqual(expectedEndState3, endState3, 'Tom discards his priest and as there are no cards in the deck adds the removedCard to his hand, a baron')

  t.end()
})
