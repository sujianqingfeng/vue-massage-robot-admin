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

const onAddShop = () => {
  showDialog({
    template: () => import('./components/AddOrModifyShopTemplate.vue'),
    title: '新增门店',
    width: '40rem'
  })
}

const onModifyShop = () => {
  showDialog({
    template: () => import('./components/AddOrModifyShopTemplate.vue'),
    title: '编辑门店',
    width: '40rem'
  })
}
</script>

<template>
  <Scaffold title="门店管理">
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="门店/个别名称" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="负责人" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="手机号码" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="运营商" />
        </QueryItem>

        <QueryItem>
          <el-select v-model="queryForm.test" placeholder="类型">
            <el-option label="全部" value="all" />
            <el-option label="待支付" value="unpaid" />
          </el-select>
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="地址" />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddShop">新增门店/个体</el-button>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column prop="no" label="门店/个体名称" />
        <el-table-column label="负责人" />
        <el-table-column label="手机号码" />
        <el-table-column label="类型" />
        <el-table-column label="运营商" />
        <el-table-column label="地址" />
        <el-table-column label="所有设备" />

        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onModifyShop(row)">
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
