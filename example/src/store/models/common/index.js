var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
const common = {
  state: 0,
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload
    },
  },
  // tslint:disable-next-line
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    incrementAsync(payload, _rootState) {
      return __awaiter(this, void 0, void 0, function*() {
        yield new Promise(resolve => setTimeout(resolve, 1000))
        dispatch.common.increment(payload)
      })
    },
  }),
}
export default common
