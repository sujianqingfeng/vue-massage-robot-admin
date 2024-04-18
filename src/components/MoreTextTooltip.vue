<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  length: {
    type: Number,
    default: 10
  }
})

const shortText = computed(() => {
  return props.text.length > props.length
    ? `${props.text.slice(0, props.length)}...`
    : props.text
})

const attrs = useAttrs()
</script>

<template>
  <el-tooltip v-bind="attrs" :content="text" placement="bottom">
    <slot :short-text="shortText">
      <span>{{ shortText }}</span>
    </slot>
  </el-tooltip>
</template>
