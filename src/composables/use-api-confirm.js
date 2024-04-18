export const useApiConfirm = () => {
  const zh = useZh()

  const apiConfirm = ({
    apiFn,
    confirmText = '',
    type = 'warning',
    successText = '操作成功',
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

    ElMessageBox.confirm(confirmText, '', {
      ...zh.popconfirm,
      type
    }).then(onPositive)
  }

  return {
    apiConfirm
  }
}

export const useApiDeleteConfirm = () => {
  const { apiConfirm } = useApiConfirm()

  const apiDeleteConfirm = ({
    apiFn,
    type = 'error',
    successText = '删除成功',
    confirmText = '你确定删除吗?',
    onSuccess
  }) => {
    apiConfirm({
      apiFn,
      successText,
      confirmText,
      type,
      onSuccess
    })
  }

  return {
    apiDeleteConfirm
  }
}
