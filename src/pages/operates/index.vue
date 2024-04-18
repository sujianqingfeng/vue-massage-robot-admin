<script setup>
import {
  fetchAddOrModifyOperatorApi,
  fetchDeleteOperatorDApi,
  fetchOperatorListApi
} from '~/api'

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { apiDeleteConfirm } = useApiDeleteConfirm()

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchOperatorListApi
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
    apiFn: () => fetchDeleteOperatorDApi(id),
    onSuccess: onQuery
  })
}

const onAddOperate = () => {
  showDialog({
    template: () => import('./components/AddOrModifyOperateTemplate.vue'),
    title: '新增运营商',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyOperatorApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}

const onModifyOperate = ({ id }) => {
  showDialog({
    template: () => import('./components/AddOrModifyOperateTemplate.vue'),
    title: '编辑运营商',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyOperatorApi,
      successMessage: '编辑成功',
      onSuccess: onQuery
    })
  })
}

const router = useRouter()
const goToShops = () => {
  router.push('/operates/shops')
}
</script>

<template>
  <Scaffold
    title="运营商管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.name" placeholder="运营商名称" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.principal" placeholder="运营商负责人" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.cellPhone" placeholder="手机号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.address" placeholder="地址" />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddOperate">新增运营商</el-button>
    </template>

    <template #table="{ height }">
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        size="small"
      >
        <el-table-column label="运营商名称" prop="name" />
        <el-table-column label="运营商负责人" prop="principal" />
        <el-table-column label="手机号码" prop="cellPhone" />
        <el-table-column label="地址" prop="address" />
        <el-table-column label="所有门店">
          <template #default="{ row }">
            <el-button link type="primary" @click="goToShops(row)">
              查看门店列表
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
