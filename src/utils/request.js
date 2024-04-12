import {
  createAxios,
  createErrorMessageInterceptor,
  createExtractDataInterceptor,
  createFilterEmptyInterceptor,
  createInnerRequestInterceptor,
  createSerializeInterceptor,
  createRedirectInterceptor
} from '@sujian/request'

const request = createAxios({
  baseURL: ''
})

const headerInterceptor = createInnerRequestInterceptor([
  (config) => {
    if (config.headers) {
      config.headers['token'] = JSON.stringify({})
    }
    return config
  }
])

const errorMessageInterceptor = createErrorMessageInterceptor({
  isInvalid(res) {
    const { code, msg } = res.data || {}
    const isValid = code !== '0'
    if (!isValid) {
      return msg
    }
  },
  showMessage(msg) {
    console.log('msg', msg)
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

const createTryWrapper = async (fn, ...rest) => {
  const wrapper = {
    data: null,
    error: null
  }

  try {
    const { data = {} } = await fn(...rest)
    wrapper.data = data
  } catch (error) {
    wrapper.error = error
  }

  return wrapper
}

export const requestGet = createTryWrapper(request.get)
export const requestPost = createTryWrapper(request.post)
