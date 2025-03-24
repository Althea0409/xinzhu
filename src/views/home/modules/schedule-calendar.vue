<script setup lang="ts">
import { ref } from 'vue';
import {
  CalendarOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
  LocationOutline,
  PersonOutline
} from '@vicons/ionicons5';

// 当前日期和周次
const currentDate = ref('2025/3');
const currentWeek = ref('本周');

// 课程数据
const courses = ref([
  {
    id: 1,
    name: '计算机图形学',
    class: '数媒22',
    room: '7B406',
    time: '7:00-9:00',
    day: 1, // 星期一
    color: 'border-blue-200 bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    name: '数字图像处理',
    class: '数媒22',
    room: '12A204',
    time: '7:00-9:00',
    day: 3, // 星期三
    color: 'border-purple-200 bg-purple-100 text-purple-600'
  },
  {
    id: 3,
    name: '计算机图形学',
    class: '数媒22',
    room: '7B506',
    time: '7:00-9:00',
    day: 6, // 星期六
    color: 'border-orange-200 bg-orange-100 text-orange-600'
  },
  {
    id: 4,
    name: '数字图像处理',
    class: '数媒22',
    room: '12B204',
    time: '10:00-11:00',
    day: 2, // 星期二
    color: 'border-purple-200 bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    name: '计算机图形学',
    class: '数媒22',
    room: '7B506',
    time: '10:00-11:00',
    day: 4, // 星期日
    color: 'border-blue-200 bg-blue-100 text-blue-600'
  }
]);

// 日期数据
const weekDays = [
  { day: '星期一', date: '03.24' },
  { day: '星期二', date: '03.25' },
  { day: '星期三', date: '03.26', isHighlighted: true },
  { day: '星期四', date: '03.27' },
  { day: '星期五', date: '03.28' },
  { day: '星期六', date: '03.29' },
  { day: '星期日', date: '03.30' }
];

// 时间段
const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];

// 获取特定日期和时间的课程
const getCourse = (day: number, time: string) => {
  return courses.value.find(course => course.day === day && course.time.startsWith(time.substring(0, 2)));
};

// 切换周次
const changeWeek = (direction: 'prev' | 'next') => {
  // 实际应用中这里应该更新日期和课程数据
  currentWeek.value = direction === 'prev' ? '上周' : '下周';
};

// 切换视图
const currentView = ref('week');
</script>

<template>
  <div class="schedule-calendar rounded-lg bg-white p-4">
    <div class="mb-4 text-center text-2xl font-bold">我的课程安排</div>
    <div class="calendar-header mb-4">
      <div class="w-full flex items-center justify-between">
        <div class="text-xl font-bold">{{ currentDate }}</div>
        <div class="flex flex-1 items-center justify-center">
          <NTabs
            v-model:value="currentView"
            type="segment"
            size="small"
            class="ml-16 w-64 bg-white transition-colors duration-200"
            tab-text-color="#2B46FE"
          >
            <NTabPane name="week" tab="周" class="px-1.5 py-0.5 text-[10px] font-medium" />
            <NTabPane name="month" tab="月" class="px-1.5 py-0.5 text-[10px] font-medium" />
            <NTabPane name="year" tab="年" class="px-1.5 py-0.5 text-[10px] font-medium" />
          </NTabs>
        </div>
        <div class="week-navigation flex items-center gap-2">
          <NButton quaternary circle @click="changeWeek('prev')">
            <template #icon>
              <NIcon><ChevronBackOutline /></NIcon>
            </template>
          </NButton>
          <NButton type="primary" size="small" class="px-4">{{ currentWeek }}</NButton>
          <NButton quaternary circle @click="changeWeek('next')">
            <template #icon>
              <NIcon><ChevronForwardOutline /></NIcon>
            </template>
          </NButton>
        </div>
      </div>

      <div class="calendar-grid border border-gray-200 rounded-lg">
        <!-- 日期头部 -->
        <div class="grid grid-cols-8 border-b border-gray-200">
          <div class="flex items-center justify-center border-r border-gray-200 p-4">
            <NIcon size="24" class="text-blue-500"><CalendarOutline /></NIcon>
          </div>
          <div
            v-for="(day, index) in weekDays"
            :key="index"
            class="border-r border-gray-200 p-4 text-center last:border-r-0"
          >
            <div :class="{ 'text-[#2B46FE]': day.isHighlighted }">{{ day.day }}</div>
            <div class="text-gray-500">{{ day.date }}</div>
          </div>
        </div>

        <!-- 时间格子 -->
        <div class="grid grid-cols-8">
          <div class="time-column border-r border-gray-200">
            <div
              v-for="time in timeSlots"
              :key="time"
              class="h-24 flex items-center justify-center border-b border-gray-200 text-gray-500 last:border-b-0"
            >
              {{ time }}
            </div>
          </div>

          <!-- 每天的课程格子 -->
          <div v-for="day in 7" :key="day" class="day-column border-r border-gray-200 last:border-r-0">
            <div
              v-for="time in timeSlots"
              :key="time"
              class="relative h-24 border-b border-gray-200 p-1 last:border-b-0"
            >
              <div
                v-if="getCourse(day, time)"
                class="course-card absolute left-1 right-1 top-1 flex flex-col border rounded-lg p-2"
                :class="getCourse(day, time)?.color"
              >
                <div class="mb-1 text-sm font-bold">{{ getCourse(day, time)?.name }}</div>
                <div class="mb-1.5 text-xs text-gray-600">{{ getCourse(day, time)?.time }}</div>
                <div class="flex-grow space-y-1.5">
                  <div class="flex items-center gap-1.5">
                    <NIcon size="14"><PersonOutline /></NIcon>
                    <span class="text-xs">班级：{{ getCourse(day, time)?.class }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <NIcon size="14"><LocationOutline /></NIcon>
                    <span class="text-xs">教室：{{ getCourse(day, time)?.room }}</span>
                  </div>
                </div>
                <div class="mt-1.5">
                  <div class="text-center">
                    <span
                      class="inline-block min-w-20 cursor-pointer rounded-md bg-white/50 px-4 py-1 text-xs transition-colors duration-200 hover:bg-white/80"
                    >
                      修改
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  height: calc(100% - 2px);
  height: calc(190px - 0.5rem);
}
</style>
