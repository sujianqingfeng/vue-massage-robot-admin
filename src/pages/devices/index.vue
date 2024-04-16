<script setup>
import DetailDrawer from './components/DetailDrawer.vue'

const detailDrawerRef = ref(null)

const zh = useZh()
const { showDialog } = useTemplateDialog()

const data = ref([
  { orderNo: '123', no: '222' },
  { orderNo: '123', no: '222' }
])

const { queryForm, onReset } = useQuery({
  defaultForm: {
    test: ''
  }
})

const onQuery = () => {
  console.log('query', queryForm.value)
}

const router = useRouter()
const onGoToDetail = () => {
  router.push('/orders/detail')
}

const onDelete = () => {
  ElMessageBox.confirm('你确定删除吗?', '', {
    ...zh.popconfirm,
    type: 'warning'
  }).then(() => {
    ElMessage.success('Delete completed')
  })
}

const onDownload = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onBatchDownload = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onImportDevice = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onUpdateSoftware = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onBatchUpdateSoftware = () => {
  console.log(ElMessage.warning('暂无实现'))
}

const onDetail = () => {
  detailDrawerRef.value.show()
}

const onGoToRecord = () => {
  router.push('/devices/error-code-record')
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
    width: '40rem'
  })
}

const onModifyDevice = () => {
  showDialog({
    template: () => import('./components/AddOrModifyDeviceTemplate.vue'),
    title: '编辑设备',
    width: '40rem'
  })
}

const onDeviceFeature = () => {
  showDialog({
    template: () => import('./components/DeviceFeatureTemplate.vue'),
    title: '批量设备使能',
    width: '40rem'
  })
}
</script>

<template>
  <Scaffold title="设备管理">
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="机器编号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="所属门店" />
        </QueryItem>

        <QueryItem>
          <el-select v-model="queryForm.test" placeholder="设备状态">
            <el-option label="全部" value="all" />
            <el-option label="待支付" value="unpaid" />
          </el-select>
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddDevice">新增设备</el-button>
      <el-button @click="onDownloadCenter">下载中心</el-button>
      <el-button @click="onBatchDownload">下载二维码</el-button>
      <el-button @click="onBatchUpdateSoftware">批量更新软件</el-button>
      <el-button @click="onDeviceFeature">批量设备使能</el-button>
      <el-button @click="onImportDevice">EXCEL导入设备</el-button>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column prop="no" label="机器编号" />
        <el-table-column label="设备名称" />
        <el-table-column label="设备状态">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'normal'" type="success">正常</el-tag>
            <el-tag v-else type="danger">异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属门店" />
        <el-table-column label="更新时间" />
        <el-table-column label="设备使能" />
        <el-table-column label="当前软件版本" />
        <el-table-column label="更新软件">
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
