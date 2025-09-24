<script setup lang="ts">
import { ref } from 'vue';
// 搜索功能
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const searchValue = ref('');

// 视图切换功能
const viewMode = ref('week'); // 'week', 'month', 'year'

// 切换视图方法
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeView = (mode: string) => {
  viewMode.value = mode;
};
</script>

<template>
  <div>
    <!-- 暂时注释掉的内容 -->
    <!-- <div class="w-full flex items-center justify-between rounded-lg bg-white p-4"> -->
    <!-- 左侧搜索框 -->
    <!--
 <div class="search-box flex items-center">
        <NInput v-model:value="searchValue" placeholder="快速查找课程" clearable round class="w-60">
          <template #prefix>
            <NIcon class="text-gray-500" size="20"><SearchOutline /></NIcon>
          </template>
        </NInput>
      </div> 
-->

    <!-- 右侧功能按钮 -->
    <!--
 <div class="action-buttons flex gap-4">
        <NButton type="primary" ghost>快速同步课表</NButton>
        <NButton type="primary" ghost>导出课表PDF</NButton>
        <NButton type="primary" ghost>设置</NButton>
      </div>
    </div> 
-->
  </div>
</template>

<style scoped>
.schedule-header {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
