const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')

class App extends React.Component{
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

module.exports = connect((state) => state)(App)
