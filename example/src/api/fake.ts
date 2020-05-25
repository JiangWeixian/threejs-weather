import { get } from './utils'

export namespace Fake {
  export type Response = number
}

export const fake = {
  async list(skip?: number, limit?: number): Promise<Fake.Response[]> {
    return get('/fake', { skip, limit })
  },
}
