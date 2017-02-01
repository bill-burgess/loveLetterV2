const React = require('react')
const _ = require('lodash')

module.exports = function (props) {
  const { state, store } = props
  const opponentIds = [2, 3, 4]
  const aliveOpponentIds = opponentIds.filter(id => state.players[id].alive)
  function getImgUrl (state, id) {
    const imgUrl = state.players[id].immune
      ? 'http://images.clipartpanda.com/lego-clip-art-pitr_LEGO_smiley_--_cool.svg'
      : 'https://s-media-cache-ak0.pinimg.com/236x/cd/cb/c4/cdcbc46822380677630846ea09182760.jpg'
    return imgUrl
  }

  return (
    <div>
      {
      aliveOpponentIds.map((opponentId) => <span key={opponentId}><img src={getImgUrl(state, opponentId)} width='100px' onClick={() => store.dispatch({type: 'TARGET_PLAYER', payload: opponentId})} />{state.players[opponentId].name}</span>)
    }
    </div>
  )
}


// https://maxcdn.icons8.com/iOS7/PNG/512/Gaming/lego_head-512.png

function showOpponentById(state, id){
  if(state.players[id].immune){
    console.log('working')
    return '¯\_(ツ)_/¯'
  }
  return (
    <span key={opponentId}><img src={imgUrl} width='100px' onClick={() => store.dispatch({type: 'TARGET_PLAYER', payload: opponentId})}></img>{state.players[opponentId].name}</span>
  )
}
