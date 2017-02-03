const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')
const { RaisedButton } = require('material-ui')

// components

class LoginForm extends React.Component {

  render () {
    
    return (
      <div>
        this is home
      </div>
    )
  }
}

module.exports = connect((state) => state)(LoginForm)
