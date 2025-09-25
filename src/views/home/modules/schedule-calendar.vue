<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { NButton, NIcon, NModal } from 'naive-ui';
import {
  CalendarOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
  LocationOutline,
  PersonOutline
} from '@vicons/ionicons5';

// 获取一周的开始日期（周一）
const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 调整为周一开始
  return new Date(d.setDate(diff));
};

// 当前日期对象
const currentDate = ref(new Date());

// 当前日期显示格式
const currentDateDisplay = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  return `${year}/${month}`;
});

// 当前周次显示
const currentWeek = computed(() => {
  const startOfWeek = getStartOfWeek(currentDate.value);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  };

  return `${formatDate(startOfWeek)}-${formatDate(endOfWeek)}`;
});

// 动态生成一周的日期数据
const weekDays = computed(() => {
  const startOfWeek = getStartOfWeek(currentDate.value);
  const today = new Date();
  const days = [];

  for (let i = 0; i < 7; i += 1) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const isToday = date.toDateString() === today.toDateString();

    days.push({
      day: dayNames[date.getDay()],
      date: String(date.getDate()).padStart(2, '0'),
      fullDate: date,
      isHighlighted: isToday
    });
  }

  return days;
});

// 时间段配置
const timeSlots = [
  { time: '8:00', label: '8:00' },
  { time: '9:00', label: '9:00' },
  { time: '10:00', label: '10:00' },
  { time: '11:00', label: '11:00' },
  { time: '14:00', label: '14:00' },
  { time: '15:00', label: '15:00' }
];

// 课程数据 - 符合真实初中语文教师的课程安排
const courses = ref([
  // 周一课程安排 - 通常每天2-3节课
  {
    id: 1,
    name: '古诗词欣赏（精读）',
    teacher: '张老师',
    time: '8:00-8:45',
    location: '初一2班',
    day: 1, // 周一
    color: 'bg-blue-100 border-blue-200 text-blue-600',
    status: 'upcoming'
  },
  {
    id: 2,
    name: '经典朗诵',
    teacher: '张老师',
    time: '9:00-9:45',
    location: '初一2班',
    day: 1, // 周一
    color: 'bg-orange-100 border-orange-200 text-orange-600',
    status: 'upcoming'
  },
  {
    id: 3,
    name: '经典朗诵',
    teacher: '张老师',
    time: '11:00-11:45',
    location: '初一2班',
    day: 2, // 周一
    color: 'bg-orange-100 border-orange-200 text-orange-600',
    status: 'upcoming'
  },

  // 周二课程安排
  //   {
  //     id: 4,
  //     name: '语文',
  //     teacher: '张老师',
  //     time: '9:00-9:45',
  //     location: '初一2班',
  //     day: 2, // 周二
  //     color: 'bg-orange-100 border-orange-200 text-orange-800',
  //     status: 'ongoing'
  //   },
  {
    id: 5,
    name: '阅读练习',
    teacher: '张老师',
    time: '14:00-14:45',
    location: '初一2班',
    day: 2, // 周二
    color: 'bg-purple-100 border-purple-200 text-purple-600',
    status: 'ongoing'
  },

  // 周三课程安排
  {
    id: 6,
    name: '阅读练习',
    teacher: '张老师',
    time: '10:00-10:45',
    location: '初一2班',
    day: 3, // 周三
    color: 'bg-purple-100 border-purple-200 text-purple-600',
    status: 'ended'
  },
  {
    id: 7,
    name: '阅读练习',
    teacher: '张老师',
    time: '11:00-11:45',
    location: '初一2班',
    day: 3, // 周三
    color: 'bg-purple-100 border-purple-200 text-purple-600',
    status: 'ended'
  },
  //   {
  //     id: 8,
  //     name: '语文',
  //     teacher: '张老师',
  //     time: '15:00-15:45',
  //     location: '初一2班',
  //     day: 3, // 周三
  //     color: 'bg-purple-100 border-purple-200 text-purple-800',
  //     status: 'ended'
  //   },

  // 周四课程安排
  {
    id: 9,
    name: '随堂测验',
    teacher: '张老师',
    time: '9:00-9:45',
    location: '初一2班',
    day: 4, // 周四
    color: 'bg-green-100 border-green-200 text-green-600',
    status: 'upcoming'
  },
  {
    id: 10,
    name: '古诗词欣赏（精读）',
    teacher: '张老师',
    time: '14:00-14:45',
    location: '初一2班',
    day: 4, // 周四
    color: 'bg-blue-100 border-blue-200 text-blue-600',
    status: 'upcoming'
  },

  // 周五课程安排
  {
    id: 11,
    name: '随堂测验',
    teacher: '张老师',
    time: '8:00-8:45',
    location: '初一2班',
    day: 5, // 周五
    color: 'bg-green-100 border-green-200 text-green-600',
    status: 'upcoming'
  },
  {
    id: 12,
    name: '课外知识分享会',
    teacher: '张老师',
    time: '10:00-10:45',
    location: '初一2班',
    day: 5, // 周五
    color: 'bg-indigo-100 border-indigo-200 text-indigo-600',
    status: 'upcoming'
  }
]);

// 获取指定时间段和日期的课程
const getCourseForSlot = (timeSlot: string, dayIndex: number) => {
  const dayOfWeek = dayIndex + 1; // 转换为周一=1的格式
  return courses.value.find(course => course.time.startsWith(timeSlot) && course.day === dayOfWeek);
};

// 切换周次
const changeWeek = (direction: 'prev' | 'next') => {
  const newDate = new Date(currentDate.value);
  if (direction === 'prev') {
    newDate.setDate(newDate.getDate() - 7);
  } else {
    newDate.setDate(newDate.getDate() + 7);
  }
  currentDate.value = newDate;
};

// 切换视图
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentView = ref('week');

// 课程详情弹窗相关
const showCourseDetail = ref(false);
const selectedCourse = ref<any>(null);

// 显示课程详情
function showCourseInfo(course: any) {
  selectedCourse.value = course;
  showCourseDetail.value = true;
}

// 编辑课程
function editCourse(course: any) {
  // 这里可以添加编辑逻辑
  // eslint-disable-next-line no-console
  console.log('编辑课程:', course);
  // 可以打开编辑弹窗或跳转到编辑页面
}

// 删除课程
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deleteCourse(courseId: number) {
  const index = courses.value.findIndex(course => course.id === courseId);
  if (index > -1) {
    courses.value.splice(index, 1);
  }
}

// 获取课程统计信息
const courseStats = computed(() => {
  const stats = {
    totalCourses: courses.value.length,
    subjects: new Set(courses.value.map(course => course.name)).size,
    teachers: new Set(courses.value.map(course => course.teacher)).size
  };
  return stats;
});

// 获取今日课程
const todayCourses = computed(() => {
  const today = new Date();
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // 转换为周一=1的格式
  return courses.value
    .filter(course => course.day === dayOfWeek)
    .sort((a, b) => {
      const timeA = a.time.split('-')[0];
      const timeB = b.time.split('-')[0];
      return timeA.localeCompare(timeB);
    });
});

// 暴露方法给父组件
defineExpose({
  showCourseInfo,
  courses,
  courseStats,
  todayCourses
});

// 组件挂载时初始化
onMounted(() => {
  // 初始化为当前日期
  currentDate.value = new Date();
});
</script>

<template>
  <div class="schedule-calendar rounded-lg bg-white shadow-sm">
    <!-- 头部导航 -->
    <div class="flex items-center justify-between p-6">
      <div class="flex items-center gap-4">
        <h2 class="text-xl text-gray-800 font-semibold">我的课程安排</h2>
        <span class="text-sm text-gray-500">{{ currentDateDisplay }}</span>
      </div>

      <div class="flex items-center gap-4">
        <div class="week-navigation flex items-center gap-2">
          <NButton quaternary circle @click="changeWeek('prev')">
            <NIcon><ChevronBackOutline /></NIcon>
          </NButton>
          <NButton type="primary" size="small" class="px-4">{{ currentWeek }}</NButton>
          <NButton quaternary circle @click="changeWeek('next')">
            <NIcon><ChevronForwardOutline /></NIcon>
          </NButton>
        </div>
      </div>
    </div>

    <div class="calendar-content p-6">
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

        <!-- 时间段和课程 -->
        <div
          v-for="(slot, slotIndex) in timeSlots"
          :key="slotIndex"
          class="grid grid-cols-8 border-b border-gray-200 last:border-b-0"
        >
          <!-- 时间列 -->
          <div class="border-r border-gray-200 p-4 text-center text-sm text-gray-600 font-medium">
            {{ slot.label }}
          </div>

          <!-- 课程列 -->
          <div
            v-for="(day, dayIndex) in weekDays"
            :key="dayIndex"
            class="relative min-h-[120px] border-r border-gray-200 p-2 last:border-r-0"
          >
            <div
              v-if="getCourseForSlot(slot.time, dayIndex)"
              class="course-card cursor-pointer border-2 rounded-lg p-3 transition-all duration-200 hover:shadow-md"
              :class="[getCourseForSlot(slot.time, dayIndex)?.color]"
              @click="showCourseInfo(getCourseForSlot(slot.time, dayIndex))"
            >
              <div class="mb-1 text-sm font-semibold">
                {{ getCourseForSlot(slot.time, dayIndex)?.name }}
              </div>
              <div class="mb-1 text-xs opacity-75">
                {{ getCourseForSlot(slot.time, dayIndex)?.time }}
              </div>
              <div class="flex items-center gap-1 text-xs opacity-75">
                <NIcon size="12"><PersonOutline /></NIcon>
                <span>{{ getCourseForSlot(slot.time, dayIndex)?.teacher }}</span>
              </div>
              <div class="mt-1 flex items-center gap-1 text-xs opacity-75">
                <NIcon size="12"><LocationOutline /></NIcon>
                <span>{{ getCourseForSlot(slot.time, dayIndex)?.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 课程详情弹窗 -->
    <NModal v-model:show="showCourseDetail" class="course-detail-modal">
      <div v-if="selectedCourse" class="rounded-lg bg-white p-4 shadow-lg">
        <!-- 标题区域 -->
        <div class="flex items-center gap-2 border-b border-gray-100 pb-2">
          <div class="h-6 w-6 flex items-center justify-center rounded bg-blue-50">
            <NIcon size="16" class="text-blue-600"><CalendarOutline /></NIcon>
          </div>
          <span class="text-base text-gray-800 font-semibold">课程详情</span>
        </div>

        <!-- 内容区域 -->
        <div class="pt-2 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <div class="text-xs text-gray-500 font-medium">课程名称</div>
              <div class="text-sm font-semibold" :class="selectedCourse.color.split(' ')[2]">
                {{ selectedCourse.name }}
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-gray-500 font-medium">上课时间</div>
              <div class="text-sm text-gray-700 font-medium">{{ selectedCourse.time }}</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <div class="text-xs text-gray-500 font-medium">任课老师</div>
              <div class="flex items-center gap-1">
                <div class="h-5 w-5 flex items-center justify-center rounded-full bg-gray-100">
                  <NIcon size="12" class="text-gray-600"><PersonOutline /></NIcon>
                </div>
                <span class="text-sm text-gray-700 font-medium">{{ selectedCourse.teacher }}</span>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-xs text-gray-500 font-medium">上课地点</div>
              <div class="flex items-center gap-1">
                <div class="h-5 w-5 flex items-center justify-center rounded-full bg-gray-100">
                  <NIcon size="12" class="text-gray-600"><LocationOutline /></NIcon>
                </div>
                <span class="text-sm text-gray-700 font-medium">{{ selectedCourse.location }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 按钮区域 -->
        <div class="mt-3 flex justify-end gap-2 border-t border-gray-100 pt-2">
          <NButton size="small" class="px-3" @click="showCourseDetail = false">关闭</NButton>
          <NButton type="primary" size="small" class="px-3" @click="editCourse(selectedCourse)">编辑课程</NButton>
        </div>
      </div>
    </NModal>
  </div>
</template>

<style scoped>
.course-card {
  height: calc(100% - 2px);
  min-height: calc(120px - 0.5rem);
}

:deep(.course-detail-modal) {
  width: 420px;
}
</style>
