<script setup>
const formRef = ref(null)
const form = ref({
  name: '',
  age: ''
})
const rules = {
  name: [{ required: true, message: '请输入机器编号', trigger: 'blur' }],
  age: [{ required: true, message: '请选择所属门店', trigger: 'blur' }]
}

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  }
]

const show = () => {
  console.log('show')
}

const onConfirm = async () => {
  await formRef.value.validate()
}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入角色名称" />
    </el-form-item>

    <el-form-item label="权限" prop="name">
      <el-tree-select
        v-model="form.name"
        :data="data"
        multiple
        :render-after-expand="false"
        show-checkbox
        placeholder="请选择权限"
      />
    </el-form-item>
  </el-form>
</template>
