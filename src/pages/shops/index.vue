<script setup>
import {
  fetchAddOrModifyShopApi,
  fetchDeleteShopApi,
  fetchShopListApi
} from '~/api'

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()

const { apiDeleteConfirm } = useApiDeleteConfirm()

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchShopListApi
  })

const { queryForm, onReset, onQuery } = useQuery({
  defaultForm: {
    principal: '',
    cellPhone: '',
    address: '',
    name: ''
  },
  fetchListApi,
  resetPagination
})

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteShopApi(id),
    onSuccess: onQuery
  })
}

const onAddShop = () => {
  showDialog({
    template: () => import('./components/AddOrModifyShopTemplate.vue'),
    title: '新增门店',
    width: '30rem',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyShopApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}

const onModifyShop = ({ id }) => {
  showDialog({
    template: () => import('./components/AddOrModifyShopTemplate.vue'),
    title: '编辑门店',
    width: '30rem',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyShopApi,
      successMessage: '新增成功',
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
  <Scaffold title="门店管理" :pagination="pagination" :total="total">
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
      <el-table v-loading="loading" :height="height + 'px'" :data="list">
        <el-table-column prop="no" label="门店/个体名称" />
        <el-table-column label="负责人" />
        <el-table-column label="手机号码" />
        <el-table-column label="类型" />
        <el-table-column label="运营商" />
        <el-table-column label="地址" />
        <el-table-column label="所有设备">
          <template #default="{ row }">
            <el-button link type="primary" @click="onGoToDeviceList(row)">
              查看设备列表
            </el-button>
          </template>
        </el-table-column>

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
