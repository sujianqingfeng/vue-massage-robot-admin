<script setup></script>

<template>
  <TheHeader />

  <div class="flex h-[calc(100%-2.5rem)]">
    <div class="w-50 bg-white">
      <TheNav />
    </div>
    <div class="m-2 flex-auto">
      <RouterView />
    </div>
  </div>
</template>
