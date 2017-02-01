const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')

class PlayerHand extends React.Component{
  render(){
    const { players, dispatch } = this.props
    const hand = players[1].hand
    const cards = {
      1: 'https://www.alderac.com/tempest/files/2012/08/Love_Letter_Card_Guard.jpg',
      2: 'https://www.alderac.com/loveletter/files/2014/04/Wedding-Priest.jpg',
      3: 'https://rivcoach.files.wordpress.com/2012/11/lovelettercard4.jpg',
      4: 'http://www.moonrabbitgames.net/games/loveletter/handmaid.png',
      5: 'https://www.alderac.com/tempest/files/2012/08/Love_Letter_Card_Prince.jpg',
      6: 'https://www.alderac.com/tempest/files/2012/09/Love_Letter_Card_King.jpg',
      7: 'http://www.moonrabbitgames.net/games/loveletter/countess.png',
      8: 'https://www.alderac.com/tempest/files/2012/08/Love_Letter_Card_Princess.jpg'
    }

    function playCard (cardId) {
      return {type: 'PLAY_CARD', payload: cardId}
    }
    return (
      <div>
      {
        hand.map((card, i) => <img src={cards[card]} key={i} onClick={() => dispatch(playCard(i))} />)
      }
      </div>
    )
  }
}


module.exports = connect((state) => state)(PlayerHand)
