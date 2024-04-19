<script setup>
import { useDeviceDetail } from './use-devices'
import { fetchDeviceFaultListApi } from '~/api'

const route = useRoute()
const id = route.params.id

const { detail, fetchDeviceDetail } = useDeviceDetail()

const { list, pagination, fetchListApi, loading, total } = useRequestList({
  apiFn: fetchDeviceFaultListApi,
  params: {
    equipNo: id
  }
})

const onQuery = () => {
  fetchListApi()
}

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

fetchDeviceDetail(id)
</script>

<template>
  <Scaffold
    :pagination="pagination"
    :total="total"
    title="错误码记录"
    back
    @pagination-change="onQuery"
  >
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
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        size="small"
      >
        <el-table-column label="错误码" prop="faultCode" />
        <el-table-column label="错误说明" prop="faultDesc" />
        <el-table-column label="发生时间" prop="createTime" />
      </el-table>
    </template>
  </Scaffold>
</template>
