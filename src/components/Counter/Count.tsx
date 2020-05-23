/**
 * Examples for rematch commmon
 */
import React from 'react'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '@/typings/rematch'

const mapState = (state: RootState) => {
  return {
    common: state.common,
  }
}

const mapDispatch = ({ common }: Dispatch) => {
  return {
    increment: () => common.increment(1),
    incrementAsync: () => common.incrementAsync(1),
  }
}

type CountProps = Partial<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>>

const Count = (props: CountProps) => (
  <div>
    The count is {props.common}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
)

export default connect(mapState, mapDispatch)(Count)
