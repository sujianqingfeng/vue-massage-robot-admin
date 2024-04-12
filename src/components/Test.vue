<script setup>
const a = computed(() => 1)

const { show } = useTemplateDialog()
const test = () => {
  show({
    template: () => import('./Temp.vue'),
    onConfirm: (context) => {
      context.hide()
    }
  })
}
</script>

<template>
  <div>
    <div class="color-red">
      {{ a }}
    </div>

    <el-button @click="test">ffff</el-button>
  </div>
</template>
