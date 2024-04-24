<script setup>
import Amounts from './components/Amounts.vue'
import Devices from './components/Devices/index.vue'
import Orders from './components/Orders.vue'
import Shops from './components/Shops.vue'
</script>

<template>
  <div class="flex gap-2 justify-start items-start h-full w-full">
    <div class="flex-1 flex flex-col gap-2 h-full">
      <div class="">
        <Amounts />
      </div>
      <div class="bg-white rounded-1">
        <Devices />
      </div>
      <div class="bg-white rounded-1 p-6 flex-1 flex flex-col">
        <Orders />
      </div>
    </div>
    <div class="bg-white w-100 rounded-1 shrink-0 h-full">
      <Shops />
    </div>
  </div>
</template>
