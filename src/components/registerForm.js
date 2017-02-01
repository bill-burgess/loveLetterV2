const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')
const { RaisedButton } = require('material-ui')
const request = require('superagent')

// components


class LoginForm extends React.Component {

  handleSubmit(){
    const userName = this.refs.userName.value
    const email = this.refs.email.value
    const password = this.refs.password.value
    const confirmPassword = this.refs.confirmPassword.value
    console.log('login', { userName, email, password, confirmPassword });
  }

  render(){
    return (
      <div>
        <h2>New User Form</h2>
        <form>
          <p>User Name:</p><input type='text' ref='userName' placeholder='User Name' />
          <p>Email:</p><input type='email' ref='email' placeholder='email' />
          <p>Password:</p><input type='password' ref='password' placeholder='password' />
          <p>Confirm Password:</p><input type='password' ref='confirmPassword' placeholder='Confirm password' /><br />
          <RaisedButton onClick={this.handleSubmit.bind(this)} className='button'>Create Account</RaisedButton>
        </form>
      </div>
    )
  }
}

// <AuthErr  {...this.props} />

module.exports = connect((state) => state)(LoginForm)
