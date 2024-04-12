<script setup></script>

<template>
  <header class="flex justify-between items-center bg-#1A314E h-10 px-2">
    <div>按摩机器人后台系统</div>

    <div class="flex justify-start items-center gap-2">
      <button class="i-carbon-restart"></button>
      <div class="inline-block h-2 w-1px bg-white"></div>

      <el-dropdown trigger="click">
        <div class="flex items-center gap-1">
          ffff
          <div class="i-ri-arrow-down-s-line"></div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
