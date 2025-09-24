<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import { NButton, NIcon } from 'naive-ui';

// 当前日期对象
const currentDate = ref(new Date());

// 当前月份显示格式
const currentMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  return `${year}/${month}`;
});

// 获取当前月份的日历数据
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  // 获取当月第一天是星期几（0=周日，1=周一...）
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  // 调整为周一开始（0=周一，1=周二...）
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // 获取当月天数
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 获取上个月天数
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  const days = [];

  // 添加上个月的日期
  for (let i = adjustedFirstDay - 1; i >= 0; i -= 1) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false
    });
  }

  // 添加当月的日期
  const today = new Date();
  const isCurrentMonthAndYear = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      day,
      isCurrentMonth: true,
      isToday: isCurrentMonthAndYear && day === todayDate
    });
  }

  // 添加下个月的日期，补齐到42格（6周）
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day += 1) {
    days.push({
      day,
      isCurrentMonth: false
    });
  }

  return days;
});

// 当前选中日期
const selectedDay = ref(new Date().getDate());

// 选择日期
const selectDay = (day: number) => {
  selectedDay.value = day;
};

// 周几标题
const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 切换月份
const changeMonth = (direction: 'prev' | 'next') => {
  const newDate = new Date(currentDate.value);
  if (direction === 'prev') {
    newDate.setMonth(newDate.getMonth() - 1);
  } else {
    newDate.setMonth(newDate.getMonth() + 1);
  }
  currentDate.value = newDate;

  // 如果选中的日期在新月份不存在，则选中新月份的最后一天
  const daysInNewMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
  if (selectedDay.value > daysInNewMonth) {
    selectedDay.value = daysInNewMonth;
  }
};

// 组件挂载时初始化
onMounted(() => {
  // 确保选中当前日期
  const today = new Date();
  if (today.getFullYear() === currentDate.value.getFullYear() && today.getMonth() === currentDate.value.getMonth()) {
    selectedDay.value = today.getDate();
  }
});
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
          'hover:bg-gray-100': item.day !== selectedDay && item.isCurrentMonth,
          'ring-2 ring-[#2B46FE] ring-opacity-50': item.isToday && item.day !== selectedDay
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
