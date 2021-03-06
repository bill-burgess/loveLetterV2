const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../src/reducer')

test('Handmaid (4) | Harry plays a handmaid and becomes immune', t => {
  const state = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [4, 1], position: 4, immune: false, alive: true}
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

  const intermediateState = reducer(state, action)
  const expectedIntState = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: true, alive: true}
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
        playedCard: 4,
        targetPlayerCard: null,
        guess: null
      }
    ]
  }

  t.deepEqual(intermediateState, expectedIntState, 'Harry is immune and the handmaid in removed from his hand')

  t.end()
})
