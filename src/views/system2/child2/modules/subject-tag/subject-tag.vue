<script setup lang="ts">
import { computed } from 'vue';
import type { SubjectInfo } from '../types';

interface Props {
  /** 学科信息 */
  subject: SubjectInfo;
}

const props = defineProps<Props>();

/** 根据学科类型返回背景颜色类名 */
const bgColorClass = computed(() => {
  const typeMap = {
    math: 'bg-blue-100',
    english: 'bg-green-100',
    chinese: 'bg-orange-100',
    physics: 'bg-purple-100',
    chemistry: 'bg-yellow-100',
    biology: 'bg-teal-100',
    history: 'bg-red-100',
    geography: 'bg-indigo-100',
    politics: 'bg-pink-100'
  };

  return typeMap[props.subject.type] || 'bg-gray-100';
});

/** 根据学科类型返回文本颜色类名 */
const textColorClass = computed(() => {
  const typeMap = {
    math: 'text-blue-600',
    english: 'text-green-600',
    chinese: 'text-orange-600',
    physics: 'text-purple-600',
    chemistry: 'text-yellow-600',
    biology: 'text-teal-600',
    history: 'text-red-600',
    geography: 'text-indigo-600',
    politics: 'text-pink-600'
  };

  return typeMap[props.subject.type] || 'text-gray-600';
});
</script>

<template>
  <span class="inline-block rounded-full px-2 py-0.5 text-xs" :class="[bgColorClass, textColorClass]">
    {{ subject.name }}
  </span>
</template>

<style scoped>
/* 使用UnoCSS声明式样式 */
</style>
