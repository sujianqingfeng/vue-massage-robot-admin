export const useApiDeleteConfirm = () => {
  const zh = useZh()

  const createApiDeleteConfirm = ({
    apiFn,
    successText = '删除成功',
    onSuccess
  }) => {
    const onPositive = async () => {
      const { error } = await apiFn()
      if (error) {
        return
      }

      successText && ElMessage.success(successText)
      onSuccess && onSuccess()
    }

    ElMessageBox.confirm('你确定删除吗?', '', {
      ...zh.popconfirm,
      type: 'warning'
    }).then(onPositive)
  }

  return {
    createApiDeleteConfirm
  }
}
