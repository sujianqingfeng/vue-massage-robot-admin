<script setup>
const data = ref([{}])

const onDetail = () => {}
</script>

<template>
  <div class="bg-white rounded-1 p-6 h-full flex flex-col">
    <div class="color-#1E1E1E text-4.5 leading-5.27 font-bold mb-6">
      门店消费记录
    </div>

    <div class="flex flex-auto">
      <div class="w-50 border-r">
        <div class="text-3 font-bold p-2 cursor-pointer">店铺名称</div>
        <div class="text-3 font-bold p-2 bg-#0083FF/10">店铺名称</div>
      </div>
      <div class="flex-auto flex flex-col p-2">
        <div class="flex-auto">
          <el-table height="100%" :data="data">
            <el-table-column label="订单号" />
            <el-table-column label="机器编号" />
            <el-table-column label="项目内容" />
            <el-table-column label="创建时间" />
            <el-table-column label="订单金额(元)" />
            <el-table-column label="支付状态" />
            <el-table-column label="工作开始时间" />
            <el-table-column label="工作结束时间" />

            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button link type="primary" @click="onDetail(row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="flex justify-end items-center py-2">
          <Pagination :total="100" />
        </div>
      </div>
    </div>
  </div>
</template>
