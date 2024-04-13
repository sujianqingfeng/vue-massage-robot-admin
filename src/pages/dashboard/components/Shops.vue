<script setup></script>

<template>
  <div class="px-4 py-6.5">
    <div
      class="flex justify-between items-center color-#1E1E1E text-4 font-bold leading-4.69"
    >
      <div>总门店数</div>
      <div>124455</div>
    </div>

    <div class="h-1px border-dotted border-t mt-5 border-#E7ECEF"></div>

    <div class="py-4 flex justify-between items-center">
      <div class="color-#0D1926 text-4.5 leading-5.27 font-bold">
        门店营业排行
      </div>

      <div class="w-18">
        <el-select v-model="v" placeholder="Select">
          <el-option key="item.value" label="今日" value="item.value" />
        </el-select>
      </div>
    </div>

    <div class="bg-#F1F5F8 px-2.5 py-5 rounded-1">
      <div
        class="flex items-center bg-white rounded-12.5 text-2 h-12 mb-3.7 color-#144675"
      >
        <div class="w-15 text-center">编号</div>
        <div class="flex-auto">店门名称</div>
        <div class="w-25 text-center">营业额(万元)</div>
      </div>

      <div
        v-for="item in 10"
        :key="item"
        class="flex items-center bg-white rounded-12.5 text-2 h-12 mb-3.7"
      >
        <div class="w-15 text-center">编号</div>
        <div class="flex-auto">店门名称</div>
        <div class="w-25 text-center">营业额(万元)</div>
      </div>
    </div>
  </div>
</template>
