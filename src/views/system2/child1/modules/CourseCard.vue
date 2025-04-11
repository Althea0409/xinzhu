<script setup lang="ts">
import { computed } from 'vue';

interface CourseCardProps {
  /** 课程名称 */
  name: string;
  /** 教师ID */
  teacherId: string;
  /** 教学班级 */
  className: string;
  /** 教学渠道 */
  channel: string;
  /** 学生人数 */
  studentCount: number;
  /** 是否为当前选中的课程 */
  isActive?: boolean;
}

defineOptions({
  name: 'CourseCard'
});

const props = withDefaults(defineProps<CourseCardProps>(), {
  isActive: false
});

const cardClass = computed(() => {
  return {
    'course-card': true,
    'course-card--active': props.isActive
  };
});
</script>

<template>
  <div :class="cardClass" class="relative rounded-md p-4 transition-all duration-300 hover:shadow-md">
    <div class="mb-1 text-gray-800 font-bold">{{ name }}</div>
    <div class="text-sm text-gray-600">教室：{{ teacherId }}</div>
    <div class="text-sm text-gray-600">教学班级：{{ className }}</div>
    <div class="text-sm text-gray-600">教学渠道：{{ channel }}</div>
    <div class="absolute right-3 top-2 rounded-full bg-gray-200 px-2 py-0.5 text-sm">{{ studentCount }}人</div>
  </div>
</template>

<style scoped>
.course-card {
  background-color: white;
  min-width: 200px;
  flex-shrink: 0;
}

.course-card--active {
  background-color: #4361ee;
  color: white;
}

.course-card--active .text-gray-600,
.course-card--active .text-gray-800 {
  color: #e6eaff;
}

.course-card--active .bg-gray-200 {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}
</style>
