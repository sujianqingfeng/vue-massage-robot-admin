import { render, h } from 'vue'
import Dialog from '~/components/Dialog.vue'

export const useTemplateDialog = () => {
  const visible = ref(true)
  const loading = ref(false)

  let mountNode = null

  const unmounted = () => {
    if (mountNode) {
      document.body.removeChild(mountNode)
      mountNode = null
    }
  }

  onUnmounted(unmounted)

  const showDialog = async (options) => {
    visible.value = true
    loading.value = false

    const { template, showParams, onConfirm, onCancel, ...rest } = options
    const t = await template()

    let slotVNode = null

    const hide = () => {
      visible.value = false
      unmounted()
    }

    const stopLoading = () => {
      loading.value = false
    }

    const startLoading = () => {
      loading.value = true
    }

    const getDialogContext = () => {
      const componentInstance = slotVNode.component
      const dialogContext = {
        hide,
        instance: componentInstance,
        startLoading,
        stopLoading
      }
      return dialogContext
    }

    if (mountNode) {
      unmounted()
    }
    mountNode = document.createElement('div')
    document.body.appendChild(mountNode)

    const dialog = h({
      setup() {
        onMounted(() => {
          nextTick(() => {
            const exposed = slotVNode.component.exposed
            const { show } = exposed
            show && show(showParams)
          })
        })

        return () =>
          h(
            Dialog,
            {
              modelValue: visible.value,
              loading: loading.value,
              ...rest,
              onCancel: () => {
                const dialogContext = getDialogContext()
                onCancel && onCancel(dialogContext)
              },
              onConfirm: () => {
                const dialogContext = getDialogContext()
                const { onConfirm: _onConfirm } = dialogContext.instance.exposed

                const executeOnConfirm = (result) => {
                  onConfirm && onConfirm(result)
                }

                if (_onConfirm) {
                  const r = _onConfirm()
                  if (typeof r === 'undefined') {
                    executeOnConfirm(dialogContext)
                  } else if (r && r.then) {
                    r.then((result) => {
                      executeOnConfirm({
                        ...dialogContext,
                        result
                      })
                    })
                  } else {
                    executeOnConfirm(dialogContext)
                  }
                } else {
                  executeOnConfirm(dialogContext)
                }
              }
            },
            () => [(slotVNode = h(t.default))]
          )
      }
    })

    render(dialog, mountNode)
  }

  const createDialogTemplateApiConfirm = ({
    apiFn,
    successMessage = '操作成功',
    onSuccess
  }) => {
    return async ({ hide, result, startLoading, stopLoading }) => {
      startLoading()
      const { error } = await apiFn(result)
      stopLoading()
      if (error) {
        return
      }
      successMessage && ElMessage.success(successMessage)
      hide()
      onSuccess && onSuccess()
    }
  }

  return {
    showDialog,
    createDialogTemplateApiConfirm
  }
}
