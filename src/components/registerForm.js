const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')
const { RaisedButton } = require('material-ui')
const request = require('superagent')

// components

class LoginForm extends React.Component {

  handleSubmit () {
    const { dispatch, router } = this.props
    const userName = this.refs.userName.value
    const email = this.refs.email.value
    const password = this.refs.password.value
    const confirmPassword = this.refs.confirmPassword.value
    function isEmailInvalid (email) {
      const arr = email.split('@')
      if (arr.length === 2 && arr[1] !== ('')) {
        const arr2 = arr[1].split('.')
        if (arr2.length > 1) {
          return false
        }
      }
      return true
    }
    const isEntryInvalid = (userData) => {
      if (isEmailInvalid(userData.email)) {
        dispatch({type: 'AUTH_ERR', payload: 'Not a valid email address'})
        return 'email'
      }
      if (userData.userName.length < 4) {
        dispatch({type: 'AUTH_ERR', payload: 'Username must be 4 characters or more'})
        return 'userName'
      }
      if (userData.password.length < 8) {
        dispatch({type: 'AUTH_ERR', payload: 'Password must be at least 8 characters'})
        return 'password'
      }
      if (userData.password !== userData.confirmPassword) {
        dispatch({type: 'AUTH_ERR', payload: 'Passwords do not match'})
        return 'password'
      }
      return false
    }
    const invalidEntry = isEntryInvalid({ userName, email, password, confirmPassword })
    if (invalidEntry) {
      this.refs[invalidEntry].focus()
      return
    }
    request.post('api/v1/users/register')
      .send({ userName, email, password })
      .then(response => {
        if (response.body.login) {
          router.push('/home')
        } else {
          dispatch({type: 'AUTH_ERR', payload: response.body.error})
        }
      })
  }

  render () {
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

module.exports = connect((state) => state)(LoginForm)
