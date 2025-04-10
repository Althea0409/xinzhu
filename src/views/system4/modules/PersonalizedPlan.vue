<script setup lang="ts">
import { NButton } from 'naive-ui';

interface PlanProps {
  title?: string;
  description?: string;
  duration?: string;
  materials?: string;
}

withDefaults(defineProps<PlanProps>(), {
  title: '推荐课程',
  description: '智能提升系统使用指南',
  duration: '预计学习时间40分钟',
  materials: '包含3个案例+2次实操训练'
});
</script>

<template>
  <div class="flex flex-col rounded-md bg-blue-50 p-4">
    <div class="mb-5 flex items-start">
      <div class="mr-3 mt-1 flex-shrink-0">
        <div class="h-12 w-12 flex items-center justify-center rounded-md bg-blue-500 text-white">
          <!-- 实践演练图标 -->
          <svg
            v-if="title.includes('实践')"
            viewBox="0 0 24 24"
            width="26"
            height="26"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          >
            <path
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>

          <!-- 教学设计图标 -->
          <svg
            v-else-if="title.includes('教学')"
            viewBox="0 0 24 24"
            width="26"
            height="26"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" />
            <path d="M8 7h6" />
            <path d="M8 11h8" />
            <path d="M8 15h5" />
          </svg>

          <!-- 能力评测图标 -->
          <svg
            v-else-if="title.includes('能力')"
            viewBox="0 0 24 24"
            width="26"
            height="26"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          >
            <circle cx="12" cy="12" r="8" />
            <path d="M12 16v-4" />
            <path d="M8 12l4-4 4 4" />
          </svg>

          <!-- 默认图标 -->
          <svg v-else viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
      <div>
        <h3 class="text-gray-800 font-bold">{{ title }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ description }}</p>
        <div class="mt-2 text-xs text-gray-500">{{ duration }}</div>
        <div class="text-xs text-gray-500">{{ materials }}</div>
      </div>
    </div>
    <NButton type="primary" size="small" class="mt-auto w-full self-center">开始学习</NButton>
  </div>
</template>

<style scoped>
/* 自定义样式 */
:deep(.n-button--primary-type) {
  background-color: #3860f4;
  border-color: #3860f4;
}

:deep(.n-button--primary-type:hover) {
  background-color: #5074f5;
  border-color: #5074f5;
}
</style>
