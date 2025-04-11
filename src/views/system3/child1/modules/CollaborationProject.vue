<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface School {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  schools: School[];
}

defineOptions({
  name: 'CollaborationProject'
});

const props = defineProps<{
  project: Project;
}>();

const emit = defineEmits<{
  (e: 'join', id: string): void;
}>();

function handleJoin() {
  emit('join', props.project.id);
}

// 计算显示的学校数量
const displayedSchools = 2;
const hasMoreSchools = props.project.schools.length > displayedSchools;
const displaySchoolCount = props.project.schools.length - displayedSchools;
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 flex items-start">
      <div class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
        <Icon icon="carbon:group" class="text-lg text-indigo-600" />
      </div>
      <h3 class="flex-1 text-base text-gray-800 font-bold">{{ project.title }}</h3>
    </div>

    <div class="mb-6 flex items-center">
      <Icon icon="carbon:group" class="mr-2 text-lg text-indigo-600" />
      <div class="mr-3 flex -space-x-2">
        <div
          v-for="(school, index) in project.schools.slice(0, displayedSchools)"
          :key="school.id"
          class="h-8 w-8 flex items-center justify-center border-2 border-white rounded-full bg-indigo-500 text-xs text-white font-bold"
          :class="[`z-${10 - index}`]"
        >
          {{ school.name.substring(0, 2) }}
        </div>
        <div
          v-if="hasMoreSchools"
          class="z-0 h-8 w-8 flex items-center justify-center border-2 border-white rounded-full bg-gray-100 text-xs text-gray-600"
        >
          +{{ displaySchoolCount }}
        </div>
      </div>
      <div class="text-sm text-gray-600">
        <div class="flex flex-wrap">
          <span class="mr-1">参与学校:</span>
          <span class="truncate">
            {{ project.schools.map(school => school.name).join('、') }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-auto flex items-center justify-between">
      <div class="flex items-center text-xs text-indigo-600">
        <Icon icon="carbon:user-multiple" class="mr-1" />
        <span>{{ project.schools.length }}所学校参与</span>
      </div>
      <NButton
        size="small"
        type="primary"
        ghost
        class="w-24 flex items-center justify-center border-blue-500 rounded-full text-xs text-blue-500 hover:bg-blue-50"
        @click="handleJoin"
      >
        <Icon icon="carbon:user-multiple" class="mr-1" />
        加入项目
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.z-0 {
  z-index: 0;
}
.z-10 {
  z-index: 10;
}
.z-9 {
  z-index: 9;
}
.z-8 {
  z-index: 8;
}
.z-7 {
  z-index: 7;
}
.z-6 {
  z-index: 6;
}
</style>
