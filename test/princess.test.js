const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../reducer')

test('Princess (8) | Harry plays the princess which eliminates himself', t => {

  const state = {
    players: {
      1: {name: 'Bill', hand: [4], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [8, 1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4, // Harry (who has a prince)
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 1, 4, 6, 3, 5],
    removedCard: 3

  }
  freeze(state)

  const action = {
    type: 'PLAY_CARD',
    payload: 0 // (the prince)
  }

  const intermediateState = reducer(state, action)
  const expectedIntState = {
      players: {
        1: {name: 'Bill', hand: [4], position: 1, immune: false, alive: true},
        2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
        3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
        4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: false}
      },
      activePlayer: 4,
      activeCard: null,
      targetedPlayer: null,
      deck: [5, 2, 1, 1, 1, 4, 6, 3, 5],
      removedCard: 3
    }

    t.deepEqual(intermediateState, expectedIntState, 'Harry is eliminated because he played the princess')

  t.end()
})
