import { ElDialog } from 'element-plus'

export const useTemplateDialog = () => {
  const visible = ref(true)
  const loading = ref(false)

  const containerEl = document.createElement('div')
  document.body.appendChild(containerEl)

  onUnmounted(() => {
    if (document.body.contains(containerEl)) {
      document.body.removeChild(containerEl)
    }
  })

  const show = async (options) => {
    visible.value = true
    loading.value = false

    const { template, showParams, onConfirm, onCancel, ...rest } = options
    const t = await template()

    const dialog = createVNode(ElDialog, {})
    // render(dialog, mountNode)

    let slotVNode = null

    const el = document.createElement('div')
    el.className = 'custom-container'
    containerEl.appendChild(el)

    const hide = () => {
      visible.value = false

      containerEl.childNodes.forEach((item) => {
        containerEl.removeChild(item)
      })
    }

    const stopLoading = () => {
      loading.value = false
    }

    const startLoading = () => {
      loading.value = true
    }

    new Dialog({
      setup: () => {
        onMounted(() => {
          nextTick(() => {
            slotVNode.componentInstance &&
              slotVNode.componentInstance.show(showParams)
          })
        })

        return () => {
          return h(
            BasicDialog,
            {
              props: {
                visible: visible.value,
                loading: loading.value
              },
              attrs: {
                ...rest,
                modalAppendToBody: false
              },
              on: {
                'update:visible': () => {
                  hide()
                },
                confirm: () => {
                  const componentInstance = slotVNode.componentInstance
                  const { onConfirm: _onConfirm } = componentInstance
                  const defaultResult = {
                    hide,
                    instance: componentInstance,
                    startLoading,
                    stopLoading
                  }

                  if (_onConfirm) {
                    const r = _onConfirm()
                    if (typeof r === 'undefined') {
                      onConfirm && onConfirm(defaultResult)
                    } else if (r && r.then) {
                      r.then((result) => {
                        onConfirm &&
                          onConfirm({
                            ...defaultResult,
                            result
                          })
                      })
                    } else {
                      onConfirm && onConfirm(defaultResult)
                    }
                  } else {
                    onConfirm && onConfirm(defaultResult)
                  }
                },
                cancel: () => {
                  const componentInstance = slotVNode.componentInstance
                  onCancel &&
                    onCancel({
                      hide,
                      instance: componentInstance,
                      startLoading,
                      stopLoading
                    })
                }
              }
            },
            [(slotVNode = h(t.default))]
          )
        }
      }
    }).$mount(el)
  }

  return {
    show
  }
}
