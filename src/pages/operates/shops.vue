<script setup>
const router = useRouter()
const onBack = () => {
  router.back()
}
</script>

<template>
  <Scaffold>
    <template #title>
      <BackTitle title="门店列表" @back="onBack" />
    </template>

    <template #table="{ height }">
      <div>跟门店管理页面一样，等后面调试完才移植过来</div>
    </template>
  </Scaffold>
</template>
