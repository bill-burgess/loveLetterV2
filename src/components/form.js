const debug = require('debug')('components:comment')
const React = require('react')

const Comment = function (props) {
  const { author, text } = props

  return (
    <div>
      <p>{author}: </p>
      <p>{text}</p>
    </div>
  )
}

export default Comment
