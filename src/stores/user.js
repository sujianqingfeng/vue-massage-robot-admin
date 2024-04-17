import { fetchCurrentUserApi } from '~/api'

export const useUserStore = defineStore('user', () => {
  const { result: user, fetchApi: fetchUser } = useRequest({
    apiFn: fetchCurrentUserApi
  })

  return {
    user,
    fetchUser
  }
})
