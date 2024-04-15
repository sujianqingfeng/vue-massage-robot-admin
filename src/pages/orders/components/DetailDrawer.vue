<script setup>
const [visible, toggle] = useToggle(false)

const infos = [
  {
    label: '订单号',
    value: '123'
  },
  {
    label: '创建时间',
    value: 'ff'
  },

  {
    label: '订单金额',
    value: 'ff'
  },

  {
    label: '支付状态',
    value: 'ff'
  },
  {
    label: '支付时间',
    value: 'ff'
  },
  {
    label: '机器编号',
    value: 'ff'
  },
  {
    label: '所属门店',
    value: 'ff'
  },
  {
    label: '项目内容',
    value: 'ff'
  },

  {
    label: '工作开始时间',
    value: 'ff'
  },
  {
    label: '工作结束时间',
    value: 'ff'
  }
]

const show = () => {
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
          <div class="color-#333333 ml-5">fff</div>
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
