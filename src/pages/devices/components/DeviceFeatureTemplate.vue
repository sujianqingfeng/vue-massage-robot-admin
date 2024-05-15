<script setup>
import { fetchDeviceFunctionsApi } from '~/api'

const enableAll = ref(false)

const fns = Array.from({ length: 8 }, (_, i) => {
  return {
    no: `1.${i + 1}`,
    enable: false
  }
})

const features = ref(fns)
const ids = ref([])

const fetchDeviceFunctions = async (id) => {
  const { error, data } = await fetchDeviceFunctionsApi(id)
  if (error) {
    return
  }
  const { enableAll: _enableAll = false, functions = [] } = data || {}
  enableAll.value = _enableAll
  if (functions.length > 0) {
    features.value = functions
  }
}

const onChange = (val) => {
  features.value.forEach((item) => {
    item.enable = val
  })
}

const show = ({ ids: _ids }) => {
  ids.value = _ids
  if (_ids.length === 1) {
    fetchDeviceFunctions(_ids[0])
  }
}

watch(
  features,
  (val) => {
    const enable = val.every((item) => item.enable)
    enableAll.value = enable
  },
  { deep: true }
)

const onConfirm = async () => {
  return {
    ids: ids.value,
    enableAll: enableAll.value,
    functions: features.value
  }
}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <div class="device-feature">
    <div class="flex items-center gap-5">
      <span class="color-#333333 text-3.5 leading-5.5">整体使能</span>
      <el-switch v-model="enableAll" @change="onChange" />
      <span class="color-#666666 leading-4.1">
        （整体使能：点击后将开启关闭所有功能）
      </span>
    </div>

    <div class="mt-10 flex flex-wrap items-center gap-10">
      <div
        v-for="(item, index) in features"
        :key="index"
        class="flex items-center gap-5"
      >
        <span class="color-#333333 text-3.5 leading-5.5">{{ item.no }}</span>
        <el-switch v-model="item.enable" />
        <span :class="{ 'color-#13ce66': item.enable }">
          {{ item.enable ? '开' : '关' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.device-feature {
  .el-switch {
    --el-switch-on-color: #13ce66;
  }
}
</style>
