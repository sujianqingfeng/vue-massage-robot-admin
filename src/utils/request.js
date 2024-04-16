import {
  createAxios,
  createErrorMessageInterceptor,
  createExtractDataInterceptor,
  createFilterEmptyInterceptor,
  createInnerRequestInterceptor,
  createRedirectInterceptor,
  createSerializeInterceptor
} from '@sujian/request'

const request = createAxios({
  baseURL: '/linghuRobot',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

const headerInterceptor = createInnerRequestInterceptor([
  (config) => {
    if (config.headers) {
      const token = localStorage.getItem('token')
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

const redirectInterceptor = createRedirectInterceptor({
  isRedirect: (res) => {
    const data = res.data
    const { code } = data

    const host = `${location.protocol}//${location.host}#`
    if (code === 'R40005') {
      return `${host}/login`
    }
  }
})

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
