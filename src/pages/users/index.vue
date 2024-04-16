<script setup>
import { useUserStatusOptions } from './use-users'
import { fetchAddUserApi, fetchUserListApi } from '~/api'

const zh = useZh()
const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { mapUserStatusLabel } = useUserStatusOptions()

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchUserListApi
  })

const { queryForm, onReset, onQuery } = useQuery({
  defaultForm: {
    status: '',
    keywords: ''
  },
  fetchListApi,
  resetPagination
})

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

const onAddUser = () => {
  showDialog({
    template: () => import('./components/AddOrModifyUserTemplate.vue'),
    title: '新增用户',
    width: '30rem',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddUserApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}

const onModifyUser = () => {
  showDialog({
    template: () => import('./components/AddOrModifyUserTemplate.vue'),
    title: '编辑用户',
    width: '30rem'
  })
}
</script>

<template>
  <Scaffold
    title="用户管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="登录账号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="用户姓名" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="角色" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="所属单位" />
        </QueryItem>

        <QueryItem>
          <el-select v-model="queryForm.test" placeholder="状态">
            <el-option label="全部" value="all" />
            <el-option label="待支付" value="unpaid" />
          </el-select>
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddUser">新增用户</el-button>
    </template>

    <template #table="{ height }">
      <el-table v-loading="loading" :height="height + 'px'" :data="list">
        <el-table-column label="登录账号" prop="account" />
        <el-table-column label="用户姓名" prop="adminName" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column label="所属单位" />
        <el-table-column label="设备状态">
          <template #default="{ row }">
            <el-tag :type="row.status.code === 1 ? 'success' : 'danger'">
              {{ mapUserStatusLabel(row.status.code) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onModifyUser(row)">
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
