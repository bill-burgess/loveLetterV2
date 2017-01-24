const React = require('react')
const _ = require('lodash')

module.exports = function(props){
  const { state, store } = props
  const opponentIds = [2,3,4]
  const aliveOpponentIds = opponentIds.filter(id => state.players[id].alive)
  const imgUrl = 'https://maxcdn.icons8.com/iOS7/PNG/512/Gaming/lego_head-512.png'
  return (
    <div>
    {
      aliveOpponentIds.map((opponentId) => <span key={opponentId}><img src={imgUrl} width='100px' onClick={() => store.dispatch({type: 'TARGET_PLAYER', payload: opponentId})}></img>{state.players[opponentId].name}</span>)
    }
    </div>
  )
}
