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

const onAddOperate = () => {
  showDialog({
    template: () => import('./components/AddOrModifyOperateTemplate.vue'),
    title: '新增运营商',
    width: '40rem'
  })
}

const onModifyOperate = () => {
  showDialog({
    template: () => import('./components/AddOrModifyOperateTemplate.vue'),
    title: '编辑运营商',
    width: '40rem'
  })
}
</script>

<template>
  <Scaffold title="运营商管理">
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="运营商名称" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="运营商负责人" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="手机号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="地址" />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddOperate">新增运营商</el-button>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column prop="no" label="运营商名称" />
        <el-table-column label="运营商负责人" />
        <el-table-column label="手机号码" />
        <el-table-column label="地址" />
        <el-table-column label="所有门店" />
        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onModifyOperate(row)">
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
