const React = require('react')
const { storiesOf, action } = require('@kadira/storybook')
const Comment = require('../components/comment')

storiesOf(Comment, module)
  .add('author and message', () => (
    <Comment author='Simon' text="Let's make a component" />
  ))

