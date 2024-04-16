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

const onAddUser = () => {
  showDialog({
    template: () => import('./components/AddOrModifyUserTemplate.vue'),
    title: '新增用户',
    width: '30rem'
  })
}

const onModifyUser = () => {
  showDialog({
    template: () => import('./components/AddOrModifyUserTemplate.vue'),
    title: '编辑用户',
    width: '40rem'
  })
}
</script>

<template>
  <Scaffold title="用户管理">
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="登录账号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="用户姓名" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="角色" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="所属单位" />
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
      <el-button @click="onAddUser">新增用户</el-button>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column prop="no" label="登录账号" />
        <el-table-column label="用户姓名" />
        <el-table-column label="角色" />
        <el-table-column label="所属单位" />
        <el-table-column label="设备状态">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'normal'" type="success">正常</el-tag>
            <el-tag v-else type="danger">异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onModifyUser(row)">
              编辑
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
