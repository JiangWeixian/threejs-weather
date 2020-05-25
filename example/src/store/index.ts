import { init } from '@rematch/core'
import models from './models'

const store = init({
  models,
})

export default store
