const React = require('react')
const _ = require('lodash')
const { connect } = require('react-redux')

// components

class AuthErr extends React.Component {

  render () {
    const { authErr, dispatch } = this.props

    const isErr = (
      <div className='authErr' >
        {authErr}
      </div>
      )

    return authErr
      ? isErr
      : (<div />)
  }
}

module.exports = connect((state) => state)(AuthErr)
