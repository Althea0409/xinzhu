<script setup lang="ts">
import type { StudentInfo } from '../types';
import { SubjectTag } from '../subject-tag';
import { StatusBadge } from '../status-badge';

interface Props {
  /** 学生信息 */
  student: StudentInfo;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  /** 点击卡片事件 */
  (e: 'click', student: StudentInfo): void;
}>();

/** 处理卡片点击事件 */
function handleCardClick() {
  emit('click', props.student);
}
</script>

<template>
  <div
    class="cursor-pointer overflow-hidden border border-gray-100 rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    @click="handleCardClick"
  >
    <!-- 学生信息头部 -->
    <div class="border-b p-3">
      <h3 class="text-base font-bold">{{ student.name }}</h3>
      <p class="mt-1 text-xs text-gray-500">{{ student.className }}</p>
    </div>

    <!-- 科目标签 -->
    <div class="flex flex-wrap gap-2 p-3">
      <SubjectTag v-for="subject in student.subjects" :key="subject.id" :subject="subject" />
    </div>

    <!-- 学习状态 -->
    <div class="mt-1 flex justify-end px-3 pb-3">
      <StatusBadge :status="student.studyStatus" />
    </div>
  </div>
</template>

<style scoped>
/* 使用UnoCSS声明式样式，不需要额外CSS */
</style>
