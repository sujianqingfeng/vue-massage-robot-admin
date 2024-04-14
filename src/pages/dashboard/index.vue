<script setup>
import Amounts from './components/Amounts.vue'
import Devices from './components/Devices/index.vue'
import Orders from './components/Orders.vue'
import Shops from './components/Shops.vue'
</script>

<template>
  <div class="flex gap-2 justify-start items-start h-full">
    <div class="flex-auto flex flex-col gap-2 h-full">
      <div class="">
        <Amounts />
      </div>
      <div class="bg-white rounded-1 h-88 grow-1">
        <Devices />
      </div>
      <div class="bg-white rounded-1 p-6 h-88 grow-1">
        <Orders />
      </div>
    </div>
    <div class="bg-white w-100 h-full rounded-1">
      <Shops />
    </div>
  </div>
</template>
