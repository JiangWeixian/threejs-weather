type CommonState = number

const common = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state: CommonState, payload: number) {
      return state + payload
    },
  },
  // tslint:disable-next-line
  effects: (dispatch: any) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload: number, _rootState: { [key: string]: CommonState }) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      dispatch.common.increment(payload)
    },
  }),
}

export default common
