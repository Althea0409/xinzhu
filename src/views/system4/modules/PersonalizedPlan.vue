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

// 根据标题类型返回对应的图标SVG内容和颜色
const getIconInfo = (title: string): { path: string; color: string } => {
  if (title.includes('实践')) {
    return {
      path: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: '#4361ee'
    };
  } else if (title.includes('教学')) {
    return {
      path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: '#40c057'
    };
  } else if (title.includes('能力')) {
    return {
      path: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      color: '#f03e3e'
    };
  }
  // 默认图标 - 书籍/课程
  return {
    path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: '#1864ab'
  };
};
</script>

<template>
  <div class="flex flex-col rounded-md bg-blue-50 p-4 transition-all duration-300 hover:shadow-md">
    <div class="mb-5 flex items-start">
      <div class="mr-3 mt-1 flex-shrink-0">
        <div
          class="icon-container h-12 w-12 flex items-center justify-center rounded-md text-white"
          :style="{ backgroundColor: getIconInfo(title).color }"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            stroke="currentColor"
            stroke-width="1.75"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path :d="getIconInfo(title).path" />
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
    <NButton type="primary" size="small" class="button-learn mt-auto w-full self-center">开始学习</NButton>
  </div>
</template>

<style scoped>
/* 自定义样式 */
:deep(.n-button--primary-type) {
  background-color: #3860f4;
  border-color: #3860f4;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 6px 12px;
}

:deep(.n-button--primary-type:hover) {
  background-color: #5074f5;
  border-color: #5074f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(56, 96, 244, 0.3);
}

.icon-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.icon-container:hover {
  transform: rotate(5deg) scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.button-learn {
  margin-top: 8px;
  letter-spacing: 1px;
}
</style>
