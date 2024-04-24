<script setup>
import {
  fetchAddVersionApi,
  fetchDeleteVersionApi,
  fetchVersionListApi
} from '~/api'

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { apiDeleteConfirm } = useApiDeleteConfirm()

const { list, pagination, loading, total, onQuery } = useRequestList({
  apiFn: fetchVersionListApi,
  params: {
    principal: '',
    cellPhone: '',
    address: '',
    name: ''
  }
})

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteVersionApi(id),
    onSuccess: onQuery
  })
}

const onAddVersion = () => {
  showDialog({
    template: () => import('./components/AddOrModifyVersionTemplate.vue'),
    title: '新增版本',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddVersionApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}
</script>

<template>
  <Scaffold
    title="软件版本管理"
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
        <el-table-column label="最新版本" prop="eqVersion" />
        <el-table-column label="上一版本" prop="preVersion" />
        <el-table-column label="发布时间" prop="createTime" />
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
