const React = require('react')
const _ = require('lodash')

module.exports = function (props) {
  const { state, store } = props
  const opponentIds = [2, 3, 4]
  const aliveOpponentIds = opponentIds.filter(id => state.players[id].alive)
  function getImgUrl (state, id) {
    const imgUrl = state.players[id].immune
      ? 'http://images.clipartpanda.com/lego-clip-art-pitr_LEGO_smiley_--_cool.svg'
      : 'https://img.clipartfest.com/5659cfeb66ce9a65f47fdf4b79fe9cc4_lego-clip-art-lego-clip-art-3-lego-clipart_276-298.png'
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
