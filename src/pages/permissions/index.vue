<script setup>
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

const onDelete = () => {
  ElMessageBox.confirm('你确定删除吗?', '', {
    ...zh.popconfirm,
    type: 'warning'
  }).then(() => {
    ElMessage({
      type: 'success',
      message: 'Delete completed'
    })
  })
}

const onAddPermission = () => {
  showDialog({
    template: () => import('./components/AddOrModifyPermissionTemplate.vue'),
    title: '新增权限',
    width: '40rem'
  })
}

const onModifyDevice = () => {
  showDialog({
    template: () => import('./components/AddOrModifyPermissionTemplate.vue'),
    title: '编辑设备',
    width: '40rem'
  })
}

const onDistributionPermission = () => {
  showDialog({
    template: () => import('./components/DistributionPermissionTemplate.vue'),
    title: '分配权限',
    width: '40rem'
  })
}
</script>

<template>
  <Scaffold title="权限管理">
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="角色名称" />
        </QueryItem>

        <QueryItem>
          <el-select v-model="queryForm.test" placeholder="状态">
            <el-option label="全部" value="all" />
            <el-option label="待支付" value="unpaid" />
          </el-select>
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddPermission">新增权限</el-button>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column prop="no" label="角色名称" />
        <el-table-column label="更新时间" />
        <el-table-column label="设备状态">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'normal'" type="success">正常</el-tag>
            <el-tag v-else type="danger">异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onModifyDevice(row)">
              编辑
            </el-button>
            <el-button
              link
              type="primary"
              @click="onDistributionPermission(row)"
            >
              分配权限
            </el-button>
            <el-button link type="danger" @click="onDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Scaffold>
</template>
