import {
  createAxios,
  createErrorMessageInterceptor,
  createExtractDataInterceptor,
  createFilterEmptyInterceptor,
  createInnerRequestInterceptor,
  createSerializeInterceptor,
  createInnerResponseInterceptor
} from '@sujian/request'
import { TOKEN_KEY } from '~/constants'

const request = createAxios({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/linghuRobot`,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

const headerInterceptor = createInnerRequestInterceptor([
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (config.headers && token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }
])

const errorMessageInterceptor = createErrorMessageInterceptor({
  isInvalid(res) {
    const { code, msg } = res.data || {}
    const isValid = ['4201', '4202'].includes(code)
    if (!isValid) {
      return msg
    }
  },
  showMessage(msg) {
    console.log('msg', msg)
    if (typeof msg === 'string') {
      ElMessage.error(msg)
      return
    }
    if (typeof msg === 'object' && msg.response) {
      ElMessage.error(msg.response.data?.msg)
      return
    }
  }
})

const extractDataInterceptor = createExtractDataInterceptor({
  extract(res) {
    const { data } = res.data || {}
    return data
  }
})

const redirectInterceptor = createInnerResponseInterceptor([
  (res) => Promise.resolve(res),
  (error) => {
    if (error.response?.data?.code === '4311') {
      localStorage.removeItem(TOKEN_KEY)

      const url = `${location.protocol}//${location.host}${import.meta.env.BASE_URL}/#/login`
      window.location.href = url
    }
    return Promise.reject(error)
  }
])

request
  .useReqInterceptor(
    headerInterceptor,
    createFilterEmptyInterceptor(),
    createSerializeInterceptor()
  )
  .useRespInterceptor(
    redirectInterceptor,
    errorMessageInterceptor,
    extractDataInterceptor
  )

const createTryWrapper = (fn) => {
  return async (...rest) => {
    const wrapper = {
      data: null,
      error: null
    }

    try {
      const data = await fn(...rest)
      wrapper.data = data
    } catch (error) {
      wrapper.error = error
    }

    return wrapper
  }
}

export const requestGet = createTryWrapper(request.get)
export const requestPost = createTryWrapper(request.post)
export const requestDelete = createTryWrapper(request.delete)
export const requestPut = createTryWrapper(request.put)
