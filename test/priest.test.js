const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../reducer')

test('', t => {

  const state = {
    players: {
      1: {name: 'Bill', hand: [1], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [3], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [2,1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4, // Harry (who has a baron)
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6, 5],
    history: []
  }
  freeze(state)

  const action = {
    type: 'PLAY_CARD',
    payload: 0 // (the baron)
  }

  const intermediateState = reducer(state, action)
  const expectedIntState = {
      players: {
        1: {name: 'Bill', hand: [1], position: 1, immune: false, alive: true},
        2: {name: 'Tom', hand: [3], position: 2, immune: false, alive: true},
        3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
        4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
      },
      activePlayer: 4, // Harry (who has a baron)
      activeCard: 2,
      targetedPlayer: null,
      deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6, 5],
      history: []
    }

    t.deepEqual(intermediateState, expectedIntState, 'removes played card from hand and updates activeCard')
  // harry targets another play with the baron

  const targetingAction = {
    type: 'TARGET_PLAYER',
    payload: 2 // (Tom)
  }

  const endState = reducer(intermediateState, targetingAction)
  const expectedEndState = {
    players: {
      1: {name: 'Bill', hand: [1], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [3], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1], position: 4, immune: false, alive: true}
    },
    activePlayer: 4, // Harry (who has a baron)
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 8, 1, 4, 4, 3, 6, 5],
    history: [
      {
        type: 'PLAYED_CARD',
        targetPlayer: 2,
        activePlayerAtAction: 4,
        playedCard: 2,
        targetPlayerCard: 3
      },
      {
        type: 'REVEAL',
        targetPlayer: 2,
        activePlayerAtAction: 4,
        playedCard: 2,
        targetPlayerCard: 3
      }
    ]
  }

  t.deepEqual(expectedEndState, endState, 'the history should be updated with the played card and the REVEAL from the priest effect')
  t.end()
})


// {
//   type: 'PLAYED_CARD',
//   activePlayerAtAction: 3,
//   card: 4
// },
// {
//   type: 'DISCARD',
//   activePlayerAtAction: 2,
//   targetPlayer: 3,
//   targetPlayerCard: 7
// }
