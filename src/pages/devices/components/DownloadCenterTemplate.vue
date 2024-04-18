<script setup>
const zh = useZh()

const data = ref([{}])

const show = () => {
  console.log('🚀 ~ show ~ show:')
}

const onDownload = () => {
  console.log('🚀 ~ onDownload ~ onDownload:')
}

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

defineExpose({
  show
})
</script>

<template>
  <el-table :data="data" size="small">
    <el-table-column label="导出人" />
    <el-table-column label="导出时间" />
    <el-table-column label="文件名" />
    <el-table-column label="状态">
      <template #default="{ row }">
        <el-tag v-if="row.status === 'success'">已完成</el-tag>
        <el-tag v-else type="success">生成中</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button link type="primary" @click="onDownload(row)">下载</el-button>
        <el-button link type="danger" @click="onDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="flex justify-center items-center mt-2">
    <Pagination :total="100" />
  </div>
</template>
