<script setup>
const emit = defineEmits(['back'])

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const onBack = () => {
  emit('back')
}
</script>

<template>
  <div class="color-#1E1E1E flex items-center mb-6 gap-2">
    <button class="i-ri-arrow-left-circle-line text-6" @click="onBack"></button>
    <p class="text-4.5 leading-5.27 font-bold">{{ title }}</p>
  </div>
</template>
