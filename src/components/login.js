const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')

// components
const LoginForm = require('./loginForm')
const RegisterForm = require('./registerForm')
const AuthErr = require('./authErr')
const LoginSocial = require('./loginSocial')

class Login extends React.Component {

  render () {
    return (
      <div>
        <LoginForm router={this.props.router} />
        <LoginSocial router={this.props.router} />
        <AuthErr {...this.props} />
        <RegisterForm router={this.props.router} />
      </div>
    )
  }
}

module.exports = connect((state) => state)(Login)
