<script setup>
import {
  fetchAddOrModifyOperatorApi,
  fetchDeleteOperatorDApi,
  fetchOperatorListApi
} from '~/api'

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { apiDeleteConfirm } = useApiDeleteConfirm()

const { list, pagination, loading, total, onQuery } =
  useRequestList({
    apiFn: fetchOperatorListApi,
    params: {
      principal: '',
      cellPhone: '',
      address: '',
      name: ''
    }
  })

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteOperatorDApi(id),
    onSuccess: onQuery
  })
}

const onAddVersion = () => {
  showDialog({
    template: () => import('./components/AddOrModifyVersionTemplate.vue'),
    title: '新增版本',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyOperatorApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}
</script>

<template>
  <Scaffold
    title="运营商管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #operation>
      <el-button @click="onAddVersion">新增版本</el-button>
    </template>

    <template #table="{ height }">
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        size="small"
      >
        <el-table-column label="最新版本" prop="name" />
        <el-table-column label="上一版本" prop="principal" />
        <el-table-column label="发布时间" prop="cellPhone" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button link type="danger" @click="onDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Scaffold>
</template>
