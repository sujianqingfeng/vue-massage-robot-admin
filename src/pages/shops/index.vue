<script setup>
import {
  fetchAddOrModifyShopApi,
  fetchDeleteShopApi,
  fetchShopListApi
} from '~/api'

const { options: typeOptions } = useDictOptions('store_category')
const { showDialog, createDialogTemplateApiConfirm } = useTemplateDialog()

const { apiDeleteConfirm } = useApiDeleteConfirm()

const { list, pagination, loading, total, onQuery, onReset, form } =
  useRequestList({
    apiFn: fetchShopListApi,
    params: {
      name: '',
      operatorName: '',
      principal: '',
      cellPhone: '',
      storeType: '',
      address: ''
    }
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
    title="门店管理"
    :pagination="pagination"
    :total="total"
    @pagination-change="onQuery"
  >
    <template #query>
      <Query @query="onQuery" @reset="onReset">
        <QueryItem>
          <el-input
            v-model="form.name"
            placeholder="门店/个别名称"
            maxlength="30"
          />
        </QueryItem>

        <QueryItem>
          <el-input
            v-model="form.principal"
            placeholder="负责人"
            maxlength="20"
          />
        </QueryItem>

        <QueryItem>
          <el-input
            v-model="form.cellPhone"
            placeholder="手机号码"
            maxlength="11"
          />
        </QueryItem>

        <QueryItem>
          <el-input v-model="form.operatorName" placeholder="运营商" />
        </QueryItem>

        <QueryItem>
          <SelectWithOptions
            v-model="form.storeType"
            :options="typeOptions"
            placeholder="类型"
          />
        </QueryItem>

        <QueryItem>
          <el-input
            v-model="form.address"
            placeholder="地址"
            maxlength="50"
          />
        </QueryItem>
      </Query>
    </template>

    <template #operation>
      <el-button @click="onAddShop">新增门店/个体</el-button>
    </template>

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
        <el-table-column label="所有设备" width="100">
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
