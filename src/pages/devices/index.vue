<script setup>
import DetailDrawer from './components/DetailDrawer.vue'
import { useDeviceStatusColors } from './use-devices'
import {
  fetchAddOrModifyDeviceApi,
  fetchDeleteDeviceApi,
  fetchDeviceListApi,
  fetchEnableDeviceApi,
  fetchUpgradeSoftwareApi
} from '~/api'

const detailDrawerRef = ref(null)

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { selections, onSelectionChange } = useTableSelection()
const { apiDeleteConfirm } = useApiDeleteConfirm()

const { mapLabel: mapStatusLabel, getOptions: getStatusOptions } = useOptions({
  ON: '在线',
  OFF: '离线',
  FAULT: '故障'
})
const statusColors = useDeviceStatusColors()

const { list, pagination, loading, total, onQuery, onReset, form } =
  useRequestList({
    apiFn: fetchDeviceListApi,
    params: {
      equipNo: '',
      storeName: '',
      eqState: ''
    }
  })

const router = useRouter()

const getSelectionIds = () => {
  let ids = selections.value.map((item) => item.id)
  if (!ids.length) {
    ids = list.value.map((item) => item.id)
  }
  return ids
}

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteDeviceApi(id),
    onSuccess: onQuery
  })
}

const onUpdateSoftware = async ({ id }) => {
  showDialog({
    template: () => import('./components/UpdateSoftwareTemplate.vue'),
    title: '更新软件命令',
    showParams: { ids: [id] },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchUpgradeSoftwareApi,
      successMessage: '更新成功',
      onSuccess: onQuery
    })
  })
}

const onBatchUpdateSoftware = () => {
  showDialog({
    template: () => import('./components/UpdateSoftwareTemplate.vue'),
    title: '批量更新软件命令',
    showParams: { ids: getSelectionIds() },
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

const onAddDevice = () => {
  showDialog({
    template: () => import('./components/AddOrModifyDeviceTemplate.vue'),
    title: '新增设备',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyDeviceApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}

const onModifyDevice = ({ id }) => {
  showDialog({
    template: () => import('./components/AddOrModifyDeviceTemplate.vue'),
    title: '编辑设备',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyDeviceApi,
      successMessage: '编辑成功',
      onSuccess: onQuery
    })
  })
}

const onDeviceFeature = ({ id }) => {
  showDialog({
    template: () => import('./components/DeviceFeatureTemplate.vue'),
    title: '设备使能',
    showParams: { ids: [id] },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchEnableDeviceApi,
      successMessage: '操作成功',
      onSuccess: onQuery
    })
  })
}

const onBatchDeviceFeature = () => {
  showDialog({
    template: () => import('./components/DeviceFeatureTemplate.vue'),
    title: '批量设备使能',
    showParams: { ids: getSelectionIds() },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchEnableDeviceApi,
      successMessage: '操作成功',
      onSuccess: onQuery
    })
  })
}
</script>

<template>
  <Scaffold
    title="设备管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="form.equipNo" placeholder="机器编号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="form.storeName" placeholder="所属门店" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="form.eqState"
            placeholder="设备状态"
            :options="getStatusOptions()"
          />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddDevice">新增设备</el-button>
      <el-button @click="onBatchUpdateSoftware">批量更新软件</el-button>
      <el-button @click="onBatchDeviceFeature">批量设备使能</el-button>
    </template>

    <template #table="{ height, width }">
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        :style="{ width: width + 'px' }"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="55" />
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
