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
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/proxy'
export const get = (path, params) =>
  __awaiter(void 0, void 0, void 0, function*() {
    return axios
      .get(path, {
        params,
      })
      .then(res => res.data)
  })
export const post = (path, params) =>
  __awaiter(void 0, void 0, void 0, function*() {
    return axios.post(path, params).then(res => res.data)
  })
