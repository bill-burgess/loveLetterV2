const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')


// components
const LoginForm = require('./loginForm')
const RegisterForm = require('./registerForm')
class Login extends React.Component {


  render(){
    return (
      <div>
        <LoginForm router={this.props.router} />
        <RegisterForm router={this.props.router} />
      </div>
    )
  }
}

// <AuthErr  {...this.props} />

module.exports = connect((state) => state)(Login)
