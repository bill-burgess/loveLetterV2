const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../src/reducer')

test('Countess (7) | Countess does not effect the game', t => {
  const state = {
    players: {
      1: {name: 'Bill', hand: [4], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [7, 1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4, // Harry (who has a prince)
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 1, 4, 6, 3, 5],
    removedCard: 3,
    history: []

  }
  freeze(state)

  const action = {
    type: 'PLAY_CARD',
    payload: 0 // (the prince)
  }

  const newState = reducer(state, action)
  const expectedState = {
    players: {
      1: {name: 'Bill', hand: [4], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 1, 4, 6, 3, 5],
    removedCard: 3,
    history: [
      {
        type: 'PLAYED_CARD',
        targetPlayer: null,
        activePlayerAtAction: 4,
        playedCard: 7,
        targetPlayerCard: null,
        guess: null
      }
    ]
  }

  t.deepEqual(newState, expectedState, 'The countess is removed from harrys hand and there are no other changes')

  t.end()
})
