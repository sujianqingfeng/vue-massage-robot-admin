<script setup>
import DetailDrawer from './components/DetailDrawer.vue'
import { fetchOrderListApi } from '~/api'

const detailDrawerRef = ref(null)

const { disabledDateAfterToday } = useDisableDateAfterToday()

const { getOptions: getPayStatusOptions } = useOptions({
  Paying: '待支付',
  Payed: '已支付',
  Cancel: '取消'
})

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchOrderListApi
  })

const { queryForm, onReset, onQuery } = useQuery({
  defaultForm: {
    orderNo: '',
    equipNo: '',
    storeName: '',
    orderState: '',
    runStartTime: '',
    runEndTime: ''
  },
  fetchListApi,
  resetPagination
})

const onGoToDetail = ({ id }) => {
  detailDrawerRef.value.show({ id })
}
</script>

<template>
  <Scaffold
    title="订单管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.orderNo" placeholder="订单号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.equipNo" placeholder="机器编号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.storeName" placeholder="所属门店" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="queryForm.orderState"
            placeholder="支付状态"
            :options="getPayStatusOptions()"
          />
        </QueryItem>

        <QueryItem width="410px">
          <DateRange
            v-model:start="queryForm.runStartTime"
            v-model:end="queryForm.runEndTime"
            :disabled-date="disabledDateAfterToday"
          />
        </QueryItem>
      </Query>
    </template>

    <template #table="{ height, width }">
      <el-table
        v-loading="loading"
        :style="{ width: width + 'px' }"
        :height="height + 'px'"
        :data="list"
        size="small"
      >
        <el-table-column label="订单号" prop="orderNo" width="170" />
        <el-table-column label="机器编号" prop="equipNo" width="100" />
        <el-table-column label="所属门店" prop="storeName" />
        <el-table-column label="项目内容" prop="content" width="100">
          <template #default="{ row }">
            <MoreTextTooltip :text="row.content" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="订单金额（元）" prop="amount" width="130" />
        <el-table-column label="支付状态" prop="orderState.label" width="80" />
        <el-table-column label="工作开始时间" prop="runStartTime" width="110" />
        <el-table-column label="工作结束时间" prop="runEndTime" width="110" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button link type="primary" @click="onGoToDetail(row)">
              查看
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
