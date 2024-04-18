<script setup>
import { useUserStatusOptions } from './use-users'
import {
  fetchAddOrModifyUserApi,
  fetchDeleteUserApi,
  fetchRoleOptionsApi,
  fetchUserListApi
} from '~/api'

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { mapUserStatusLabel, getUserStatusOptions } = useUserStatusOptions()
const { apiDeleteConfirm } = useApiDeleteConfirm()

const { result: roleOptions } = useRequest({
  apiFn: fetchRoleOptionsApi,
  autoFetch: true,
  defaultResult: []
})

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchUserListApi
  })

const { queryForm, onReset, onQuery } = useQuery({
  defaultForm: {
    adminNo: '',
    account: '',
    adminName: '',
    roleNo: '',
    depart: '',
    status: ''
  },
  fetchListApi,
  resetPagination
})

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteUserApi({ ids: [id] }),
    onSuccess: onQuery
  })
}

const onAddUser = () => {
  showDialog({
    template: () => import('./components/AddOrModifyUserTemplate.vue'),
    title: '新增用户',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyUserApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}

const onModifyUser = ({ id }) => {
  showDialog({
    template: () => import('./components/AddOrModifyUserTemplate.vue'),
    title: '编辑用户',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddOrModifyUserApi,
      successMessage: '编辑成功',
      onSuccess: onQuery
    })
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
          <el-input v-model="queryForm.account" placeholder="登录账号" />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.adminName" placeholder="用户姓名" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="queryForm.roleNo"
            placeholder="角色"
            :options="roleOptions"
          />
        </QueryItem>

        <QueryItem>
          <el-input v-model="queryForm.test" placeholder="所属单位" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="queryForm.status"
            :options="getUserStatusOptions(true)"
            placeholder="状态"
          />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddUser">新增用户</el-button>
    </template>

    <template #table="{ height }">
      <el-table
        v-loading="loading"
        :height="height + 'px'"
        :data="list"
        size="small"
      >
        <el-table-column label="登录账号" prop="account" />
        <el-table-column label="用户姓名" prop="adminName" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column label="所属单位" prop="departName" />
        <el-table-column label="设备状态">
          <template #default="{ row }">
            <el-tag :type="row.status.code === 1 ? 'success' : 'danger'">
              {{ mapUserStatusLabel(row.status.code) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
