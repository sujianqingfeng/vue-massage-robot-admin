export const useUserStatusOptions = () => {
  const { mapLabel: mapUserStatusLabel, getOptions: getUserStatusOptions } =
    useOptions({
      1: '正常',
      0: '禁用'
    })

  return {
    mapUserStatusLabel,
    getUserStatusOptions
  }
}
