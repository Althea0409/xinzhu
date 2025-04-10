<script setup lang="ts">
import { NTag } from 'naive-ui';

interface MetricsProps {
  title?: string;
  value?: string;
  tags?: { label: string; type?: 'primary' | 'success' | 'warning' | 'error' | 'info' }[];
}

withDefaults(defineProps<MetricsProps>(), {
  title: '智能工具应用',
  value: '超过本区域82%的教师',
  tags: () => [
    { label: '学情分析专家', type: 'primary' },
    { label: '超级达人', type: 'success' }
  ]
});
</script>

<template>
  <div class="metrics-container p-4">
    <div class="flex">
      <div class="mr-4 h-20 w-20 flex items-center justify-center rounded-md bg-green-100">
        <div class="h-16 w-16 flex items-center justify-center rounded-md bg-green-500 text-white">
          <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        </div>
      </div>
      <div class="flex-1">
        <h3 class="text-base font-bold">{{ title }}</h3>
        <div class="mt-1 text-sm text-gray-600">{{ value }}</div>
        <div class="mt-3 flex flex-wrap gap-2">
          <NTag
            v-for="(tag, index) in tags"
            :key="index"
            :type="tag.type || 'primary'"
            size="small"
            :bordered="false"
            round
            class="h-6 px-3 py-0 text-xs"
          >
            {{ tag.label }}
          </NTag>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metrics-container {
  min-height: 100px;
  display: flex;
  flex-direction: column;
}

/* 调整标签样式 */
:deep(.n-tag--primary) {
  background-color: #f0f5ff;
  color: #4080ff;
}

:deep(.n-tag--success) {
  background-color: #e8f7ed;
  color: #00b578;
}
</style>
