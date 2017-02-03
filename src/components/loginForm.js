const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')
const { RaisedButton } = require('material-ui')
const request = require('superagent')

// components

class LoginForm extends React.Component {

  handleSubmit () {
    const email = this.refs.email.value
    const password = this.refs.passwordEntry.value

    request.post('api/v1/login/auth/local')
      .send({ email, password })
      .then(res => {
        console.log(res);
      })
  }

  render () {
    return (
      <div>
        <form>
          <div>
            Email:
            <input className='homePageButton' type='text' ref='email' placeholder='Email' />
          </div>
          <div>
            Password:
            <input className='homePageButton' type='password' ref='passwordEntry' placeholder='Password' />
          </div>
          <RaisedButton onClick={this.handleSubmit.bind(this)} >Login </RaisedButton>
        </form>
      </div>
    )
  }
}

// <AuthErr  {...this.props} />

module.exports = connect((state) => state)(LoginForm)
