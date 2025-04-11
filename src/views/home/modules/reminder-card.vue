<script setup lang="ts">
import { ref } from 'vue';
import { NotificationsOutline } from '@vicons/ionicons5';

// 当前提醒
const currentReminder = ref({
  date: '明天 (03.27)',
  time: '10：00-11：00',
  course: '计算机图形学',
  status: '教案未准备！'
});

// 前往准备
const goToPrepare = () => {
  // 实际应用中这里应该跳转到准备页面
};
</script>

<template>
  <div class="reminder-card rounded-lg bg-blue-50 p-4">
    <div class="card-header mb-4 flex items-center gap-2">
      <div class="icon-wrapper rounded bg-blue-500 p-1 text-white">
        <NIcon size="20"><NotificationsOutline /></NIcon>
      </div>
      <div class="text-blue-500 font-bold">紧急待办</div>
    </div>

    <div class="reminder-content flex items-center gap-4">
      <div class="icon-wrapper flex-shrink-0">
        <div class="relative">
          <img src="/src/assets/images/clipboard.png" alt="Clipboard" class="h-32 w-32" />
          <div class="absolute h-4 w-4 rounded-full bg-blue-500 -right-1 -top-1"></div>
        </div>
      </div>
      <div class="flex-grow">
        <div class="text-lg font-bold">{{ currentReminder.date }}</div>
        <div class="text-blue-500">{{ currentReminder.time }} {{ currentReminder.course }}</div>
        <div class="text-red-500">{{ currentReminder.status }}</div>
      </div>
      <div class="flex-shrink-0">
        <NButton type="primary" size="small" class="mt-26 rounded-full" @click="goToPrepare">去准备</NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reminder-card {
  height: 100%;
}
</style>
