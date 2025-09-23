<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'CourseFlow'
});

interface CourseSection {
  id: string;
  title: string;
  duration: string;
  isActive?: boolean;
}

const sections = ref<CourseSection[]>([
  {
    id: '1',
    title: '导入新课',
    duration: '5分钟',
    isActive: true
  }
]);

const activeSection = ref<string>('1');

function selectSection(id: string) {
  activeSection.value = id;
  sections.value = sections.value.map(section => ({
    ...section,
    isActive: section.id === id
  }));
}
</script>

<template>
  <div class="course-flow h-full border border-gray-100 rounded-lg bg-white p-4">
    <div class="mb-4 flex items-center">
      <Icon icon="carbon:flow" class="mr-2 text-lg text-indigo-600" />
      <h3 class="text-gray-800 font-bold">课程流程图</h3>
    </div>

    <div class="flow-sections">
      <div
        v-for="section in sections"
        :key="section.id"
        class="flow-section mb-2 cursor-pointer rounded-lg px-4 py-3 transition-colors"
        :class="section.isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'"
        @click="selectSection(section.id)"
      >
        <div class="text-sm font-medium">{{ section.title }}</div>
        <div class="mt-1 text-xs text-gray-500">时间：{{ section.duration }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-flow {
  min-height: 500px;
}
</style>
