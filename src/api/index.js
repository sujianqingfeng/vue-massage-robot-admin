import { requestGet, requestPost } from '~/utils/request'

export const fetchCaptchaApi = () => requestGet('/captcha')
export const fetchLoginApi = (data) => requestPost('/login', data)
