<script setup lang="ts">
import { ref } from 'vue';
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';

// 当前月份
const currentMonth = ref('2025/3');

// 日历数据
const calendarDays = [
  // 2月的最后几天 (2025年2月的最后一天是28日，3月1日是周六，所以需要显示周一到周五的日期：24,25,26,27,28)
  { day: 24, isCurrentMonth: false },
  { day: 25, isCurrentMonth: false },
  { day: 26, isCurrentMonth: false },
  { day: 27, isCurrentMonth: false },
  { day: 28, isCurrentMonth: false },
  ...Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
    isToday: i + 1 === 15
  })),
  // 4月的前几天
  { day: 1, isCurrentMonth: false },
  { day: 2, isCurrentMonth: false },
  { day: 3, isCurrentMonth: false },
  { day: 4, isCurrentMonth: false },
  { day: 5, isCurrentMonth: false },
  { day: 6, isCurrentMonth: false }
];

// 当前选中日期
const selectedDay = ref(26);

// 选择日期
const selectDay = (day: number) => {
  selectedDay.value = day;
};

// 周几标题
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 切换月份
const changeMonth = (direction: 'prev' | 'next') => {
  // 实际应用中这里应该更新月份和日历数据
  // eslint-disable-next-line no-console
  console.log(`切换到${direction === 'prev' ? '上' : '下'}个月`);
};
</script>

<template>
  <div class="month-calendar rounded-lg bg-white p-4">
    <div class="calendar-header mb-4 flex items-center justify-between">
      <div class="text-xl font-bold">{{ currentMonth }}</div>
      <div class="navigation-buttons flex gap-2">
        <NButton quaternary circle size="small" @click="changeMonth('prev')">
          <template #icon>
            <NIcon><ChevronBackOutline /></NIcon>
          </template>
        </NButton>
        <NButton quaternary circle size="small" @click="changeMonth('next')">
          <template #icon>
            <NIcon><ChevronForwardOutline /></NIcon>
          </template>
        </NButton>
      </div>
    </div>

    <!-- 星期标题 -->
    <div class="week-days grid grid-cols-7 mb-2">
      <div v-for="day in weekDays" :key="day" class="text-center text-sm text-gray-500">
        {{ day }}
      </div>
    </div>

    <!-- 日历格子 -->
    <div class="calendar-grid grid grid-cols-7 gap-1">
      <div
        v-for="(item, index) in calendarDays"
        :key="index"
        class="day-cell aspect-square flex cursor-pointer items-center justify-center rounded-full text-sm"
        :class="{
          'text-gray-400': !item.isCurrentMonth,
          'bg-[#2B46FE] text-white': item.day === selectedDay && item.isCurrentMonth,
          'hover:bg-gray-100': item.day !== selectedDay && item.isCurrentMonth
        }"
        @click="item.isCurrentMonth && selectDay(item.day)"
      >
        {{ item.day }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-calendar {
  height: 100%;
}
</style>
