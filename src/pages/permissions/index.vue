<script setup>
import DetailDrawer from './components/DetailDrawer.vue'
import { fetchAssignMenusApi, fetchDeleteRoleApi } from '~/api'
import { fetchRoleListApi } from '~/api'
import { fetchAddRoleApi } from '~/api'

const detailDrawerRef = ref(null)

const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()
const { apiDeleteConfirm } = useApiDeleteConfirm()

const { list, pagination, fetchListApi, loading, total, resetPagination } =
  useRequestList({
    apiFn: fetchRoleListApi
  })

const { queryForm, onReset, onQuery } = useQuery({
  defaultForm: {
    status: '',
    keywords: ''
  },
  fetchListApi,
  resetPagination
})

const { mapLabel, getOptions } = useOptions({
  1: '正常',
  0: '禁用'
})

const onDelete = ({ id }) => {
  apiDeleteConfirm({
    apiFn: () => fetchDeleteRoleApi({ ids: [id] }),
    onSuccess: onQuery
  })
}

const onDetail = ({ id }) => {
  detailDrawerRef.value.show({ id })
}

const onAddPermission = () => {
  showDialog({
    template: () => import('./components/AddOrModifyPermissionTemplate.vue'),
    title: '新增权限',
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddRoleApi,
      successMessage: '新增成功',
      onSuccess: onQuery
    })
  })
}

const onModifyPermission = ({ id }) => {
  showDialog({
    template: () => import('./components/AddOrModifyPermissionTemplate.vue'),
    title: '编辑权限',
    showParams: { id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAddRoleApi,
      successMessage: '编辑成功',
      onSuccess: onQuery
    })
  })
}

const onDistributionPermission = ({ roleNo, id }) => {
  showDialog({
    template: () => import('./components/DistributionPermissionTemplate.vue'),
    title: '分配权限',
    showParams: { roleNo, id },
    onConfirm: createDialogTemplateApiConfirm({
      apiFn: fetchAssignMenusApi,
      successMessage: '分配权限成功',
      onSuccess: onQuery
    })
  })
}
</script>

<template>
  <Scaffold
    title="权限管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input v-model="queryForm.keywords" placeholder="角色名称" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="queryForm.status"
            clearable
            placeholder="状态"
            :options="getOptions()"
          />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddPermission">新增权限</el-button>
    </template>

    <template #table="{ height }">
      <el-table v-loading="loading" :height="height + 'px'" :data="list">
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status.code === 1 ? 'success' : 'danger'">
              {{ mapLabel(row.status.code) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="330">
          <template #default="{ row }">
            <el-button link type="primary" @click="onDetail(row)">
              查看
            </el-button>

            <el-button link type="primary" @click="onModifyPermission(row)">
              编辑
            </el-button>
            <el-button
              link
              type="primary"
              @click="onDistributionPermission(row)"
            >
              分配权限
            </el-button>
            <el-button link type="danger" @click="onDelete(row)">
              删除
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
