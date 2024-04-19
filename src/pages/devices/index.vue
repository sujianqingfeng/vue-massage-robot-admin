<script setup>
import DetailDrawer from './components/DetailDrawer.vue'
import { useDeviceStatusColors } from './use-devices'
import {
  fetchAddOrModifyDeviceApi,
  fetchDeleteDeviceApi,
  fetchDeviceListApi,
  fetchUpgradeSoftwareApi
} from '~/api'

const detailDrawerRef = ref(null)

const zh = useZh()
const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { selections, onSelectionChange } = useTableSelection()
const { apiDeleteConfirm } = useApiDeleteConfirm()
const { apiConfirm } = useApiConfirm()

const { mapLabel: mapStatusLabel, getOptions: getStatusOptions } = useOptions({
  ON: '在线',
  OFF: '离线',
  FAULT: '故障'
})
const statusColors = useDeviceStatusColors()

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchDeviceListApi
  })

const { queryForm, onReset, onQuery } = useQuery({
  defaultForm: {
    equipNo: '',
    storeName: '',
    eqState: ''
  },
  fetchListApi,
  resetPagination
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

const onDownload = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onImportDevice = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onBatchDownload = () => {
  const length = selections.value.length
  ElMessageBox.confirm('确定下载二维码?', '', {
    ...zh.popconfirm,
    type: 'warning'
  }).then(() => {
    ElMessage.warning(`已选择${length}个`)
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

const onDownloadCenter = () => {
  showDialog({
    template: () => import('./components/DownloadCenterTemplate.vue'),
    title: '下载中心',
    width: '50rem',
    showFooter: false
  })
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

const onDeviceFeature = () => {
  showDialog({
    template: () => import('./components/DeviceFeatureTemplate.vue'),
    title: '设备使能',
    width: '30rem'
  })
}

const onBatchDeviceFeature = () => {
  showDialog({
    template: () => import('./components/DeviceFeatureTemplate.vue'),
    title: '批量设备使能',
    width: '30rem'
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
          <el-input v-model="queryForm.equipNo" placeholder="机器编号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.storeName" placeholder="所属门店" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="queryForm.eqState"
            placeholder="设备状态"
            :options="getStatusOptions()"
          />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddDevice">新增设备</el-button>
      <el-button @click="onDownloadCenter">下载中心</el-button>
      <el-button @click="onBatchDownload">下载二维码</el-button>
      <el-button @click="onBatchUpdateSoftware">批量更新软件</el-button>
      <el-button @click="onBatchDeviceFeature">批量设备使能</el-button>
      <el-button @click="onImportDevice">EXCEL导入设备</el-button>
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
        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onDetail(row)">
              查看
            </el-button>
            <el-button link type="primary" @click="onModifyDevice(row)">
              编辑
            </el-button>
            <el-button link type="primary" @click="onDownload(row)">
              下载二维码
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
