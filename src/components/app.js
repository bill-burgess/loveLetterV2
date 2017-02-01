const React = require('react')
const { connect } = require('react-redux')
const { Link } = require('react-router')

class App extends React.Component{
  render(){
    console.log('we got here', this.props)
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

module.exports = connect((state) => state)(App)
