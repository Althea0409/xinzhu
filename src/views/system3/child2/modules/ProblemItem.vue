<script setup lang="ts">
import { defineProps } from 'vue';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'ProblemItem'
});

interface ProblemItemProps {
  title: string;
  solutionCount: number;
}

defineProps<ProblemItemProps>();

// 获取今天的日期，格式为YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];
</script>

<template>
  <div class="problem-item mb-6 overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
    <div class="px-5 pb-4 pt-5">
      <div class="flex items-start justify-between">
        <div class="inline-flex items-center rounded-full bg-[#2B46FE0D] px-3 py-1 text-xs text-[#2B46FE] font-medium">
          <Icon icon="carbon:document-requirements" class="mr-1 text-[#2B46FE]" />
          <span>{{ solutionCount }}个解决方案</span>
        </div>
        <div class="flex items-center text-gray-400 space-x-1">
          <Icon icon="carbon:view" class="text-sm" />
          <span class="text-xs">42</span>
        </div>
      </div>

      <h3 class="line-clamp-2 mt-3 text-lg text-gray-800 font-medium">
        {{ title }}
      </h3>

      <div class="mt-3 h-28 overflow-hidden rounded-md bg-gray-50 p-1">
        <!-- 问题预览/图片区域 -->
        <div class="h-full flex items-center justify-center">
          <Icon icon="carbon:image" class="text-3xl text-gray-300" />
        </div>
      </div>
    </div>

    <div class="border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-500">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Icon icon="carbon:time" class="mr-1" />
          <span>{{ today }}</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <Icon icon="carbon:favorite" class="mr-1 text-gray-400 hover:text-[#2B46FE]" />
            <span>12</span>
          </div>
          <div class="flex items-center">
            <Icon icon="carbon:chat" class="mr-1 text-gray-400 hover:text-[#2B46FE]" />
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.problem-item {
  transition: all 0.2s ease-in-out;
}

.problem-item:hover {
  transform: translateY(-2px);
}
</style>
