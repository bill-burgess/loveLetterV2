module.exports = {
  players: {

    1: {name: 'Bill', hand: [], position: 1, immune: false, alive: true},
    2: {name: 'Tom', hand: [], position: 2, immune: true, alive: true},
    3: {name: 'Dick', hand: [], position: 3, immune: true, alive: true},
    4: {name: 'Harry', hand: [], position: 4, immune: true, alive: true}

  },
  activePlayer: 1,
  activeCard: null,
  targetedPlayer: null,
  deck: [],
  removedCard: null,
  history: [],
  authErr: null
}
