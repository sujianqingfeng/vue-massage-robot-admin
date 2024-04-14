<script setup>
import Situation from './Situation.vue'
import Total from './Total.vue'
</script>

<template>
  <div class="flex h-full">
    <Total />
    <div class="flex-auto p-5 h-full">
      <Situation />
    </div>
  </div>
</template>
