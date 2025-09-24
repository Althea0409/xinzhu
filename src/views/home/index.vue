<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ScheduleCalendar from './modules/schedule-calendar.vue';
import CourseStats from './modules/course-stats.vue';

// 课程数据 - 从子组件获取
const scheduleRef = ref();
const courses = ref([]);

// 处理显示课程详情
const handleShowCourseDetail = (course: any) => {
  if (scheduleRef.value) {
    scheduleRef.value.showCourseInfo(course);
  }
};

// 获取课程数据
const getCourses = () => {
  if (scheduleRef.value) {
    return scheduleRef.value.courses || [];
  }
  return [];
};

// 监听课程数据变化
const updateCourses = () => {
  courses.value = getCourses();
};

// 组件挂载后更新课程数据
onMounted(() => {
  setTimeout(() => {
    updateCourses();
  }, 100);
});
</script>

<template>
  <div class="home-page min-h-screen bg-gray-50 px-12 py-8">
    <div class="mx-auto max-w-[1500px] w-full">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <!-- 主要课程表区域 -->
        <div class="lg:col-span-3">
          <ScheduleCalendar ref="scheduleRef" @show-course-detail="handleShowCourseDetail" />
        </div>

        <!-- 侧边栏统计信息 -->
        <div class="lg:col-span-1">
          <CourseStats :courses="courses" @show-course-detail="handleShowCourseDetail" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  height: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
