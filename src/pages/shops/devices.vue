<script setup>
import {
  fetchAddOrModifyDeviceApi,
  fetchDeleteDeviceApi,
  fetchDeviceListApi,
  fetchEnableDeviceApi,
  fetchUpgradeSoftwareApi
} from '~/api'
import DetailDrawer from '~/pages/devices/components/DetailDrawer.vue'
import { useDeviceStatusColors } from '~/pages/devices/use-devices'

const router = useRouter()
const detailDrawerRef = ref(null)
const statusColors = useDeviceStatusColors()

const { mapLabel: mapStatusLabel } = useOptions({
  ON: '在线',
  OFF: '离线',
  FAULT: '故障'
})

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()

const route = useRoute()
const { list, pagination, loading, total, onQuery } = useRequestList({
  apiFn: fetchDeviceListApi,
  params: {
    storeName: decodeURIComponent(route.query.name || '')
  }
})

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteDeviceApi(id),
    onSuccess: onQuery
  })
}

const onUpdateSoftware = async ({ id }) => {
  showDialog({
    template: () =>
      import('~/pages/devices/components/UpdateSoftwareTemplate.vue'),
    title: '更新软件命令',
    showParams: { ids: [id] },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchUpgradeSoftwareApi,
      successMessage: '更新成功',
      onSuccess: onQuery
    })
  })
}

const onDetail = ({ id }) => {
  detailDrawerRef.value.show({ id })
}

const onGoToRecord = ({ id }) => {
  router.push(`/devices/error-code-record/${id}`)
}

const onDeviceFeature = ({ id }) => {
  showDialog({
    template: () =>
      import('~/pages/devices/components/DeviceFeatureTemplate.vue'),
    title: '设备使能',
    showParams: { ids: [id] },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchEnableDeviceApi,
      successMessage: '操作成功',
      onSuccess: onQuery
    })
  })
}

const onModifyDevice = ({ id }) => {
  showDialog({
    template: () =>
      import('~/pages/devices/components/AddOrModifyDeviceTemplate.vue'),
    title: '编辑设备',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyDeviceApi,
      successMessage: '编辑成功',
      onSuccess: onQuery
    })
  })
}
</script>

<template>
  <Scaffold
    title="门店设备列表"
    back
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #table="{ height, width }">
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        :style="{ width: width + 'px' }"
      >
        <el-table-column label="机器编号" prop="equipNo" width="120" />
        <el-table-column label="设备名称" prop="name" width="120" />
        <el-table-column label="设备状态">
          <template #default="{ row }">
            <el-tag :type="statusColors[row.eqState]">
              {{ mapStatusLabel(row.eqState) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属门店" prop="storeName" width="120" />
        <el-table-column label="更新时间" prop="versionUpdateTime" />
        <el-table-column label="设备使能" width="100">
          <template #default="{ row }">
            <el-button link type="success" @click="onDeviceFeature(row)">
              设备使能开关列表
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="当前软件版本" prop="eqVersion" width="120" />
        <el-table-column label="更新软件" width="100">
          <template #default="{ row }">
            <span
              class="flex items-center gap-1 color-#24CC85 cursor-pointer"
              @click="onUpdateSoftware(row)"
            >
              <span class="i-ri-refresh-line"></span>
              <span>更新软件</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="{ row }">
            <el-button link type="primary" @click="onDetail(row)">
              查看
            </el-button>
            <el-button link type="primary" @click="onModifyDevice(row)">
              编辑
            </el-button>
            <el-button link type="primary" @click="onGoToRecord(row)">
              错误码记录
            </el-button>
            <el-button link type="danger" @click="onDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template #footer>
      <DetailDrawer ref="detailDrawerRef" />
    </template>
  </Scaffold>
</template>
