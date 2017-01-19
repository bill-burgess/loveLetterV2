const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('../reducer')

test('Guard (1) | Harry plays a guard, targets Tom, guesses he has a priest and eliminates him', t => {

  const state = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [1, 6], position: 4, immune: false, alive: true}
    },
    activePlayer: 4, // Harry (who has a prince)
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 5],
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
        4: {name: 'Harry', hand: [6], position: 4, immune: false, alive: true}
      },
      activePlayer: 4,
      activeCard: 1,
      targetedPlayer: null,
      deck: [5, 2, 1, 1, 1, 4, 4, 3, 5],
      removedCard: 3,
      history: []
    }

    t.deepEqual(intermediateState, expectedIntState, 'removes played card from hand and updates activeCard')
  // harry targets another play with the prince

  const targetingAction = {
    type: 'TARGET_PLAYER',
    payload: 2 // (Tom)
  }

  const targetingState = reducer(intermediateState, targetingAction)
  const expectedTargetingState = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: true},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [6], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: 1,
    targetedPlayer: 2,
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 5],
    removedCard: 3,
    history: []
  }

  t.deepEqual(expectedTargetingState, targetingState, 'updates the player that was targeted in the state')

  const guessAction = {
    type: 'GUESS_CARD',
    payload: 2
  }

  const endState = reducer(targetingState, guessAction)
  const expectedEndState = {
    players: {
      1: {name: 'Bill', hand: [8], position: 1, immune: false, alive: true},
      2: {name: 'Tom', hand: [2], position: 2, immune: false, alive: false},
      3: {name: 'Dick', hand: [1], position: 3, immune: false, alive: true},
      4: {name: 'Harry', hand: [6], position: 4, immune: false, alive: true}
    },
    activePlayer: 4,
    activeCard: null,
    targetedPlayer: null,
    deck: [5, 2, 1, 1, 1, 4, 4, 3, 5],
    removedCard: 3,
    history: [
      {
        type: 'PLAYED_CARD',
        targetPlayer: 2,
        activePlayerAtAction: 4,
        playedCard: 1,
        targetPlayerCard: 2,
        guess: 2
      }
    ]
  }

  t.deepEqual(endState, expectedEndState, 'elimates Tom on a correct guess')

  t.end()
})
