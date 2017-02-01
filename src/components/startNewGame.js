const React = require('react')
const { connect } = require('react-redux')

class StartNewGame extends React.Component{
  render(){
    const { dispatch } = this.props
    return (
      <div>
      <button onClick={() => dispatch({type: 'START_NEW_GAME'})}>Start New Game</button>
      </div>
    )
  }
}

module.exports = connect((state) => state)(StartNewGame)
