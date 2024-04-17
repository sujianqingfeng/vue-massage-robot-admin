import { fetchDeviceDetailApi } from '~/api'

export const useDeviceStatusColors = () => {
  return {
    ON: 'success',
    OFF: 'info',
    FAULT: 'danger'
  }
}

export const useDeviceDetail = () => {
  const { result: detail, fetchApi: fetchDeviceDetail } = useRequest({
    apiFn: fetchDeviceDetailApi,
    autoFetch: false
  })

  return {
    detail,
    fetchDeviceDetail
  }
}
