const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')
const { RaisedButton } = require('material-ui')
const request = require('superagent')

// components


class LoginSocial extends React.Component {

  handleSubmit(){

    request.get('api/v1/login/auth/twitter')

  }

  render(){
    return (
      <div>
        <a href='api/v1/login/auth/twitter'><img src={twitterButton} /></a>
      </div>
    )
  }
}

const twitterButton = 'https://g.twimg.com/dev/sites/default/files/images_documentation/sign-in-with-twitter-gray.png'

module.exports = connect((state) => state)(LoginSocial)
