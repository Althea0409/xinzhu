<script setup lang="ts">
import MonthCalendar from './month-calendar.vue';
import ReminderCard from './reminder-card.vue';
import ProgressCard from './progress-card.vue';
</script>

<template>
  <div class="course-stats space-y-6">
    <!-- 月历组件 -->
    <MonthCalendar />

    <!-- 备课提醒组件 -->
    <ReminderCard />

    <!-- 备课进度组件 -->
    <ProgressCard />
  </div>
</template>

<style scoped>
.stat-card {
  transition: transform 0.2s ease-in-out;
}

.stat-card:hover {
  transform: translateY(-2px);
}
</style>
