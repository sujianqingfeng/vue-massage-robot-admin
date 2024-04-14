<script setup>
const props = defineProps({
  width: {
    type: String,
    default: ''
  }
})

const itemWidth = inject('itemWidth')

const style = computed(() => {
  return {
    width: props.width || itemWidth
  }
})
</script>

<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>
