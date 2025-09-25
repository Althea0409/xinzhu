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
    isActive: false
  },
  {
    id: '2',
    title: '初读课文',
    duration: '10分钟',
    isActive: false
  },
  {
    id: '3',
    title: '深入分析',
    duration: '20分钟',
    isActive: false
  },
  {
    id: '4',
    title: '朗读指导',
    duration: '8分钟',
    isActive: false
  },
  {
    id: '5',
    title: '课堂小结',
    duration: '2分钟',
    isActive: false
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

// 获取教学要点提示
function getTeachingPoints(sectionId: string): string {
  const points: Record<string, string> = {
    '1': '播放《三国演义》主题曲，引出曹操',
    '2': '教师范读，学生注意字音节奏',
    '3': '分析诗歌结构，重点句子赏析',
    '4': '指导有感情朗读，注意语调节奏',
    '5': '总结主题思想和艺术特色'
  };
  return points[sectionId] || '';
}

// 计算总时长
function getTotalDuration(): string {
  const totalMinutes = sections.value.reduce((total, section) => {
    const minutes = Number.parseInt(section.duration.replace('分钟', ''), 10);
    return total + minutes;
  }, 0);
  return `${totalMinutes}分钟`;
}

// 获取步骤样式
function getStepStyle(index: number): string {
  const styles = [
    'bg-blue-50 border-blue-400 hover:bg-blue-100 shadow-sm',
    'bg-green-50 border-green-400 hover:bg-green-100 shadow-sm',
    'bg-purple-50 border-purple-400 hover:bg-purple-100 shadow-sm',
    'bg-orange-50 border-orange-400 hover:bg-orange-100 shadow-sm',
    'bg-pink-50 border-pink-400 hover:bg-pink-100 shadow-sm'
  ];
  return styles[index] || styles[0];
}

// 获取步骤编号样式
function getStepNumberStyle(index: number): string {
  const styles = [
    'bg-blue-500 text-white',
    'bg-green-500 text-white',
    'bg-purple-500 text-white',
    'bg-orange-500 text-white',
    'bg-pink-500 text-white'
  ];
  return styles[index] || styles[0];
}

// 获取时间标签样式
function getTimeStyle(index: number): string {
  const styles = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-orange-100 text-orange-700',
    'bg-pink-100 text-pink-700'
  ];
  return styles[index] || styles[0];
}

// 获取要点文字样式
function getPointsStyle(index: number): string {
  const styles = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600', 'text-pink-600'];
  return styles[index] || styles[0];
}
</script>

<template>
  <div class="course-flow h-full border border-gray-100 rounded-lg bg-white p-4">
    <div class="mb-4 flex items-center">
      <Icon icon="carbon:flow" class="mr-2 text-lg text-indigo-600" />
      <h3 class="text-gray-800 font-bold">《观沧海》课程流程</h3>
    </div>

    <div class="flow-sections space-y-4">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="flow-section relative cursor-pointer border-l-3 rounded-lg px-2 py-3 transition-all duration-200"
        :class="getStepStyle(index)"
        @click="selectSection(section.id)"
      >
        <!-- 步骤编号 -->
        <div
          class="absolute top-1/2 h-7 w-7 flex transform items-center justify-center rounded-full text-sm font-bold -left-4 -translate-y-1/2"
          :class="getStepNumberStyle(index)"
        >
          {{ index + 1 }}
        </div>

        <div class="ml-8">
          <div class="flex items-center justify-between">
            <div class="text-sm font-medium">{{ section.title }}</div>
            <div class="rounded-full px-2 py-1 text-xs" :class="getTimeStyle(index)">
              {{ section.duration }}
            </div>
          </div>

          <!-- 教学要点提示 -->
          <div v-if="getTeachingPoints(section.id)" class="mt-2 text-xs" :class="getPointsStyle(index)">
            {{ getTeachingPoints(section.id) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 总时长统计 -->
    <div class="mt-6 rounded-lg bg-gray-50 p-3">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600">总课时</span>
        <span class="text-gray-800 font-medium">{{ getTotalDuration() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-flow {
  min-height: 946px;
}
</style>
