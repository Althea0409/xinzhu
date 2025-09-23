<script setup lang="ts">
import { computed } from 'vue';
import type { StudyStatusType } from '../types';

interface Props {
  /** 学习状态 */
  status: StudyStatusType;
}

const props = defineProps<Props>();

/** 根据状态类型获取对应的中文文本 */
const statusText = computed(() => {
  const statusMap = {
    normal: '正常',
    'middle-excellent': '中度关注',
    excellent: '优秀',
    'needs-improvement': '重度关注'
  };

  return statusMap[props.status] || '未知状态';
});

/** 根据状态类型获取对应的背景色 */
const bgColorClass = computed(() => {
  const colorMap = {
    normal: 'bg-green-500',
    'middle-excellent': 'bg-orange-500',
    excellent: 'bg-blue-500',
    'needs-improvement': 'bg-red-500'
  };

  return colorMap[props.status] || 'bg-gray-500';
});
</script>

<template>
  <span class="inline-block rounded px-2 py-1 text-xs text-white" :class="bgColorClass">
    {{ statusText }}
  </span>
</template>

<style scoped>
/* 使用UnoCSS声明式样式 */
</style>
