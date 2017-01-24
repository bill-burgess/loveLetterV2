const React = require('react')


module.exports = function(props){
  const { state, store } = props
  return (
    <div>
      <button onClick={() => store.dispatch({type:'START_NEW_GAME'})}>Start New Game</button>
    </div>
  )
}
