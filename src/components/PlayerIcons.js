const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')

class PlayerIcons extends React.Component{
  render(){
    const { dispatch, players } = this.props
    const opponentIds = [2, 3, 4]
    const aliveOpponentIds = opponentIds.filter(id => players[id].alive)
    function getImgUrl (players, id) {
      const imgUrl = players[id].immune
      ? 'http://images.clipartpanda.com/lego-clip-art-pitr_LEGO_smiley_--_cool.svg'
      : 'https://s-media-cache-ak0.pinimg.com/236x/cd/cb/c4/cdcbc46822380677630846ea09182760.jpg'
      return imgUrl
    }

    return (
      <div>
      {
        aliveOpponentIds.map((opponentId) => <span key={opponentId}><img src={getImgUrl(players, opponentId)} width='100px' onClick={() => dispatch({type: 'TARGET_PLAYER', payload: opponentId})} />{players[opponentId].name}</span>)
      }
      </div>
    )
  }
}

module.exports = connect((state) => state)(PlayerIcons)

// https://maxcdn.icons8.com/iOS7/PNG/512/Gaming/lego_head-512.png

function showOpponentById(players, id){
  if(players[id].immune){
    console.log('working')
    return '¯\_(ツ)_/¯'
  }
  return (
    <span key={opponentId}><img src={imgUrl} width='100px' onClick={() => store.dispatch({type: 'TARGET_PLAYER', payload: opponentId})}></img>{players[opponentId].name}</span>
  )
}
