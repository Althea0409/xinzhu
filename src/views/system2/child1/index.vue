<script setup lang="ts">
import { ref } from 'vue';
import CourseCard from './modules/CourseCard.vue';
import WaitingTaskCard from './modules/WaitingTaskCard.vue';
import NotificationList from './modules/NotificationList.vue';
import ClassComparisonChart from './modules/ClassComparisonChart.vue';

// 模拟课程数据
const courses = ref([
  {
    id: '1',
    name: '高等数学',
    teacherId: 'T2024001',
    className: '2024级数学1班',
    channel: '线上授课',
    studentCount: 48,
    isActive: true
  },
  {
    id: '2',
    name: '大学英语',
    teacherId: 'T2024002',
    className: '2024级英语2班',
    channel: '线下教学',
    studentCount: 42,
    isActive: false
  },
  {
    id: '3',
    name: '计算机基础',
    teacherId: 'T2024003',
    className: '2024级计算机1班',
    channel: '混合教学',
    studentCount: 45,
    isActive: false
  },
  {
    id: '4',
    name: '物理学',
    teacherId: 'T2024004',
    className: '2024级物理1班',
    channel: '线下教学',
    studentCount: 38,
    isActive: false
  }
]);

// 切换选中的课程
function selectCourse(courseId: string) {
  courses.value.forEach(course => {
    course.isActive = course.id === courseId;
  });
}

// 进度百分比
const progressData = {
  homeworkCompletion: 85,
  attendanceRate: 92,
  averageScore: 78,
  participation: 65
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-8 ml-3 text-2xl text-gray-800 font-bold">教学课程选择</h1>

    <!-- 课程卡片横向滚动区域 -->
    <div class="mb-10 rounded-lg bg-white p-6 shadow-sm">
      <div class="mb-5 ml-3 flex items-center">
        <div class="mr-3 h-5 w-1.5 rounded bg-blue-500"></div>
        <h2 class="text-lg text-gray-700 font-bold">我的课程</h2>
      </div>
      <div class="flex gap-6 overflow-x-auto px-3 pb-4">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :name="course.name"
          :teacher-id="course.teacherId"
          :class-name="course.className"
          :channel="course.channel"
          :student-count="course.studentCount"
          :is-active="course.isActive"
          class="cursor-pointer transition-all duration-300 hover:shadow-md"
          @click="selectCourse(course.id)"
        />
      </div>
    </div>

    <!-- 主要内容区域：两列布局 -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- 左侧区域 - 2/3 宽度 -->
      <div class="lg:col-span-2 space-y-8">
        <!-- 待办事项和通知公告区域 -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div class="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <WaitingTaskCard />
          </div>
          <div class="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <NotificationList />
          </div>
        </div>

        <!-- 班级对比图表 -->
        <div class="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
          <ClassComparisonChart />
        </div>
      </div>

      <!-- 右侧区域 - 1/3 宽度 -->
      <div class="space-y-8">
        <!-- 学生进度区域 -->
        <div class="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
          <div class="mb-6 flex items-center">
            <div class="mr-3 h-4 w-4 rounded-full bg-blue-500"></div>
            <h3 class="text-gray-700 font-bold">学生进度</h3>
          </div>

          <div class="px-3 space-y-6">
            <div class="border-b pb-5">
              <div class="mb-3 flex justify-between">
                <span class="text-sm text-gray-600">作业完成率</span>
                <span class="text-sm text-gray-800 font-medium">{{ progressData.homeworkCompletion }}%</span>
              </div>
              <div class="h-2.5 w-full rounded-full bg-gray-200">
                <div class="blue-bar progress-bar"></div>
              </div>
            </div>

            <div class="border-b pb-5">
              <div class="mb-3 flex justify-between">
                <span class="text-sm text-gray-600">课堂出勤率</span>
                <span class="text-sm text-gray-800 font-medium">{{ progressData.attendanceRate }}%</span>
              </div>
              <div class="h-2.5 w-full rounded-full bg-gray-200">
                <div class="progress-bar green-bar"></div>
              </div>
            </div>

            <div class="border-b pb-5">
              <div class="mb-3 flex justify-between">
                <span class="text-sm text-gray-600">平均成绩</span>
                <span class="text-sm text-gray-800 font-medium">{{ progressData.averageScore }}%</span>
              </div>
              <div class="h-2.5 w-full rounded-full bg-gray-200">
                <div class="progress-bar orange-bar"></div>
              </div>
            </div>

            <div class="pb-2">
              <div class="mb-3 flex justify-between">
                <span class="text-sm text-gray-600">课程参与度</span>
                <span class="text-sm text-gray-800 font-medium">{{ progressData.participation }}%</span>
              </div>
              <div class="h-2.5 w-full rounded-full bg-gray-200">
                <div class="progress-bar purple-bar"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 近期活动区域 -->
        <div class="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
          <div class="mb-6 flex items-center">
            <div class="mr-3 h-4 w-4 rounded-full bg-blue-500"></div>
            <h3 class="text-gray-700 font-bold">近期活动</h3>
          </div>

          <div class="px-3 space-y-5">
            <div class="flex items-start rounded-md p-3 transition-colors hover:bg-gray-50">
              <div class="mr-4 mt-0.5 rounded-md bg-red-100 px-2.5 py-1 text-xs text-red-600 font-medium">今天</div>
              <div>
                <div class="text-sm text-gray-800 font-medium">期中测试</div>
                <div class="mt-1.5 text-xs text-gray-500">9:00 - 11:00</div>
              </div>
            </div>

            <div class="flex items-start rounded-md p-3 transition-colors hover:bg-gray-50">
              <div class="mr-4 mt-0.5 rounded-md bg-blue-100 px-2.5 py-1 text-xs text-blue-600 font-medium">明天</div>
              <div>
                <div class="text-sm text-gray-800 font-medium">教学研讨会</div>
                <div class="mt-1.5 text-xs text-gray-500">14:00 - 16:00</div>
              </div>
            </div>

            <div class="flex items-start rounded-md p-3 transition-colors hover:bg-gray-50">
              <div class="mr-4 mt-0.5 rounded-md bg-purple-100 px-2.5 py-1 text-xs text-purple-600 font-medium">
                下周
              </div>
              <div>
                <div class="text-sm text-gray-800 font-medium">学生答辩</div>
                <div class="mt-1.5 text-xs text-gray-500">全天</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.blue-bar {
  width: v-bind('progressData.homeworkCompletion + "%"');
  background-color: #3b82f6;
}

.green-bar {
  width: v-bind('progressData.attendanceRate + "%"');
  background-color: #22c55e;
}

.orange-bar {
  width: v-bind('progressData.averageScore + "%"');
  background-color: #f97316;
}

.purple-bar {
  width: v-bind('progressData.participation + "%"');
  background-color: #a855f7;
}
</style>
