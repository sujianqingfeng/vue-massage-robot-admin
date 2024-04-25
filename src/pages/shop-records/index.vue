<script setup>
import { fetchOrderListApi, fetchShopAllApi } from '~/api'
import DetailDrawer from '~/pages/orders/components/DetailDrawer.vue'

const detailDrawerRef = ref(null)
const currentShopIndex = ref(0)

const { result: shops } = useRequest({
  apiFn: fetchShopAllApi,
  autoFetch: true,
  defaultResult: []
})

const { list, pagination, loading, total, onQuery, form } = useRequestList({
  apiFn: fetchOrderListApi,
  autoFetch: false,
  params: {
    storeNo: ''
  }
})

const onShopItem = (index) => {
  currentShopIndex.value = index
  form.value.storeNo = shops.value[index].value
  onQuery()
}

const onGoToDetail = ({ id }) => {
  detailDrawerRef.value.show({ id })
}

watch(shops, () => {
  if (shops.value.length) {
    onShopItem(0)
  }
})
</script>

<template>
  <div class="bg-white rounded-1 p-6 h-full flex flex-col">
    <div class="color-#1E1E1E text-4.5 leading-5.27 font-bold mb-6">
      门店消费记录
    </div>

    <div class="flex flex-auto">
      <div class="w-30 border-r">
        <div
          v-for="(shop, index) in shops"
          :key="index"
          :class="{ 'bg-#0083FF/10': index === currentShopIndex }"
          class="text-3 font-bold p-2 cursor-pointer"
          @click="onShopItem(index)"
        >
          {{ shop.label }}
        </div>
      </div>
      <div class="flex-auto flex flex-col p-2">
        <Scaffold
          :pagination="pagination"
          :total="total"
          padding="0"
          @pagination-change="onQuery"
        >
          <template #table="{ height, width }">
            <el-table
              v-loading="loading"
              :style="{ width: width + 'px' }"
              :height="height + 'px'"
              :data="list"
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
              <el-table-column
                label="订单金额（元）"
                prop="amount"
                width="130"
              />
              <el-table-column
                label="支付状态"
                prop="orderState.label"
                width="80"
              />
              <el-table-column
                label="工作开始时间"
                prop="runStartTime"
                width="110"
              />
              <el-table-column
                label="工作结束时间"
                prop="runEndTime"
                width="110"
              />
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
      </div>
    </div>
  </div>
</template>
