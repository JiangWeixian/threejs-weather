import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = '/proxy'

export const get = async <T, Q extends object>(path: string, params: Q): Promise<T> => {
  return axios
    .get(path, {
      params,
    })
    .then(res => res.data)
}

export const post = async <T, Q>(path: string, params: Q): Promise<T> => {
  return axios.post(path, params).then(res => res.data)
}
