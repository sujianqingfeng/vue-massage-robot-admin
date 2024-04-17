<script setup>
import { useDeviceDetail } from '../use-devices'

const [visible, toggle] = useToggle(false)

const { detail, fetchDeviceDetail } = useDeviceDetail()

const { options: infos } = useTransformOptions({
  info: detail,
  maps: [
    {
      label: '机器编号',
      value: 'equipNo'
    },
    {
      label: '设备名称',
      value: 'name'
    },
    {
      label: '所属门店',
      value: 'storeNo'
    }
  ]
})

const show = ({ id }) => {
  fetchDeviceDetail(id)
  toggle(true)
}

defineExpose({
  show
})
</script>

<template>
  <el-drawer
    v-model="visible"
    class="detail-drawer"
    :size="480"
    title="订单详情"
    direction="rtl"
  >
    <template #default>
      <div class="flex flex-col gap-5">
        <div
          v-for="(item, index) in infos"
          :key="index"
          class="flex items-center text-3.5 leading-5.5"
        >
          <div class="w-22.5 color-#666666">{{ item.label }}</div>
          <div class="color-#333333 ml-5">{{ item.value }}</div>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<style>
.detail-drawer .el-drawer__header {
  --at-apply: border-b p-4 mb-0;
}
</style>
