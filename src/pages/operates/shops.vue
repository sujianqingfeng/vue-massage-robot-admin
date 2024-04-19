<script setup>
import {
  fetchAddOrModifyShopApi,
  fetchDeleteShopApi,
  fetchShopListApi
} from '~/api'

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()

const { apiDeleteConfirm } = useApiDeleteConfirm()

// TODO: 参数
const { list, pagination, loading, total, onQuery } = useRequestList({
  apiFn: fetchShopListApi,
  params: {
    name: ''
  }
})

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteShopApi(id),
    onSuccess: onQuery
  })
}

const onModifyShop = ({ id }) => {
  showDialog({
    template: () =>
      import('~/pages/shops/components/AddOrModifyShopTemplate.vue'),
    title: '编辑门店',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyShopApi,
      successMessage: '编辑成功',
      onSuccess: onQuery
    })
  })
}

const router = useRouter()
const onGoToDeviceList = () => {
  router.push('/shops/devices')
}
</script>

<template>
  <Scaffold
    :pagination="pagination"
    :total="total"
    title="门店列表"
    back
    @pagination-change="onQuery"
  >
    <template #table="{ height }">
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        size="small"
      >
        <el-table-column label="门店/个体名称" prop="name" width="120" />
        <el-table-column label="负责人" prop="principal" />
        <el-table-column label="手机号码" prop="cellPhone" />
        <el-table-column label="类型" prop="storeType" />
        <el-table-column label="运营商" prop="operatorName" />
        <el-table-column label="地址" prop="address" />
        <el-table-column label="所有设备">
          <template #default="{ row }">
            <el-button link type="primary" @click="onGoToDeviceList(row)">
              查看设备列表
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作">
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
