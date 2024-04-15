<script setup>
const treeRef = ref(null)
const defaultProps = {
  children: 'children',
  label: 'label'
}
const data = [
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
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
  console.log(treeRef.value?.getCheckedNodes())
  console.log(treeRef.value?.getCheckedKeys())
}

defineExpose({
  show,
  onConfirm
})
</script>

<template>
  <el-tree ref="treeRef" show-checkbox :data="data" :props="defaultProps" />
</template>
