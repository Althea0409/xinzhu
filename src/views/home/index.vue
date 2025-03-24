<script setup lang="ts">
// 导入必要的依赖
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
// 导入各个模块组件
import ScheduleHeader from './modules/schedule-header.vue';
import ScheduleCalendar from './modules/schedule-calendar.vue';
import MonthCalendar from './modules/month-calendar.vue';
import ReminderCard from './modules/reminder-card.vue';
import ProgressCard from './modules/progress-card.vue';

// 初始化应用状态管理
const appStore = useAppStore();

// 计算间隔：移动端为0，桌面端为16
const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <div class="flex flex-col lg:flex-row" :style="{ gap: `${gap}px` }">
    <!-- 左侧主要内容区域 -->
    <div class="w-full flex flex-col lg:w-3/4" :style="{ gap: `${gap}px` }">
      <!-- 头部搜索和功能区 -->
      <ScheduleHeader />

      <!-- 课程表 -->
      <NCard :bordered="false" class="flex-1 card-wrapper">
        <ScheduleCalendar />
      </NCard>
    </div>

    <!-- 右侧边栏 -->
    <div class="w-full flex flex-col lg:w-1/4" :style="{ gap: `${gap}px` }">
      <!-- 月历组件 -->
      <NCard :bordered="false" class="card-wrapper">
        <MonthCalendar />
      </NCard>

      <!-- 提醒卡片 -->
      <ReminderCard />

      <!-- 进度卡片 -->
      <NCard :bordered="false" class="card-wrapper">
        <ProgressCard />
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  height: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
