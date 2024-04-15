<script setup>
const allFeature = ref(false)

const features = ref([
  {
    name: 'feature1',
    enable: false
  },
  {
    name: 'feature2',
    enable: false
  },
  {
    name: 'feature3',
    enable: false
  }
])

const onChange = (val) => {
  features.value.forEach((item) => {
    item.enable = val
  })
}

const show = () => {
  console.log('show')
}

const onConfirm = async () => {}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <div class="device-feature">
    <div class="flex items-center gap-5">
      <span class="color-#333333 text-3.5 leading-5.5">整体使能</span>
      <el-switch v-model="allFeature" @change="onChange" />
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
        <span class="color-#333333 text-3.5 leading-5.5">{{ item.name }}</span>
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
