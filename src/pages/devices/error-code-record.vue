<script setup>
const data = ref([])

const infos = [
  {
    label: '机器编号',
    value: 'fff'
  },
  {
    label: '设备名称',
    value: 'fff'
  },
  {
    label: '所属门店',
    value: 'fff'
  }
]

const router = useRouter()
const onBack = () => {
  router.back()
}
</script>

<template>
  <Scaffold>
    <template #title>
      <BackTitle title="错误码记录" @back="onBack" />
    </template>
    <template #operation>
      <div class="flex items-center gap-8 text-4">
        <div
          v-for="(info, index) in infos"
          :key="index"
          class="flex items-center gap-4"
        >
          <div>{{ info.label }}:</div>
          <div>{{ info.value }}</div>
        </div>
      </div>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column label="错误码" />
        <el-table-column label="错误说明" />
        <el-table-column label="发生时间" />
      </el-table>
    </template>
  </Scaffold>
</template>
