<script setup></script>

<template>
  <TheHeader />

  <div class="flex h-[calc(100%-3.5rem)]">
    <div class="w-50 bg-white h-full">
      <TheNav />
    </div>
    <div class="p-2 flex-1 overflow-auto h-full">
      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
