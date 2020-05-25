/**
 * Examples for rematch commmon
 */
import React from 'react'
import { connect } from 'react-redux'
const mapState = state => {
  return {
    common: state.common,
  }
}
const mapDispatch = ({ common }) => {
  return {
    increment: () => common.increment(1),
    incrementAsync: () => common.incrementAsync(1),
  }
}
const Count = props =>
  React.createElement(
    'div',
    null,
    'The count is ',
    props.common,
    React.createElement('button', { onClick: props.increment }, 'increment'),
    React.createElement('button', { onClick: props.incrementAsync }, 'incrementAsync'),
  )
export default connect(mapState, mapDispatch)(Count)
