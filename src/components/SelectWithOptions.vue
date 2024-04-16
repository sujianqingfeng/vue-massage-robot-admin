<script setup>
defineProps({
  options: {
    type: Array,
    default: () => []
  }
})

const model = defineModel({ default: '', type: String || Number })

const attrs = useAttrs()
</script>

<template>
  <el-select v-model="model" v-bind="attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
