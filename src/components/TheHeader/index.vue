<script setup>
const router = useRouter()
const { showDialog } = useTemplateDialog()

const onChangePassword = () => {
  console.log('修改密码')

  showDialog({
    template: () => import('./ChangePasswordTemplate.vue'),
    title: '修改密码',
    width: '30rem'
  })
}

const onCommand = (val) => {
  if (val === 'changePassword') {
    onChangePassword()
  } else if (val === 'logout') {
    router.replace('/login')
  }
}
</script>

<template>
  <header class="flex justify-between items-center bg-#1A314E h-14 px-4">
    <div class="color-white text-5 font-bold leading-5.8">
      按摩机器人后台系统
    </div>

    <div class="flex justify-start items-center gap-4">
      <button class="color-#D1D6DC text-4 i-carbon-restart"></button>
      <div class="inline-block h-3 w-1px bg-#768395"></div>

      <el-dropdown trigger="click" @command="onCommand">
        <div class="flex items-center gap-1 text-white text-3.5 leading-4.1">
          你好，张希西
          <div class="i-ri-arrow-down-s-line"></div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
