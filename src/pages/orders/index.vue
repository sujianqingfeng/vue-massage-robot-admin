<script setup>
const queryForm = ref({
  test: ''
})
const data = ref([
  { orderNo: '123', no: '222' },
  { orderNo: '123', no: '222' }
])

const onQuery = () => {
  console.log('query', queryForm.value)
}

const onReset = () => {
  console.log('reset')
}

const router = useRouter()
const onGoToDetail = () => {
  router.push('/orders/detail')
}
</script>

<template>
  <Scaffold title="订单管理">
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="订单号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="机器编号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="所属门店" />
        </QueryItem>

        <QueryItem>
          <el-select v-model="queryForm.test" placeholder="支付状态">
            <el-option label="全部" value="all" />
            <el-option label="待支付" value="unpaid" />
          </el-select>
        </QueryItem>

        <QueryItem>
          <DateRange />
        </QueryItem>
      </Query>
    </template>

    <template #table="{ height }">
      <el-table :height="height + 'px'" :data="data">
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="no" label="机器编号" />
        <el-table-column prop="orderNo" label="所属门店" />
        <el-table-column label="项目内容" />
        <el-table-column label="创建时间" />
        <el-table-column label="订单金额（元）" />
        <el-table-column label="支付状态" />
        <el-table-column label="工作开始时间" />
        <el-table-column label="工作结束时间" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <ElButton link type="primary" @click="onGoToDetail(row)">
              查看
            </ElButton>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Scaffold>
</template>
