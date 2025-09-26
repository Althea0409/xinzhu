<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCard, NIcon, NSpace, NTag } from 'naive-ui';
import {
  ChatbubbleEllipsesOutline,
  DocumentTextOutline,
  NotificationsOutline,
  PeopleOutline,
  PersonAddOutline,
  SchoolOutline,
  SettingsOutline,
  TimeOutline,
  TrophyOutline
} from '@vicons/ionicons5';

defineOptions({
  name: 'ClassManagement'
});

interface Student {
  id: string;
  name: string;
  studentId: string;
  avatar: string;
  score: number;
  rank: number;
  status: 'excellent' | 'good' | 'average' | 'attention';
}

interface ClassInfo {
  className: string;
  grade: string;
  totalStudents: number;
  presentStudents: number;
  averageScore: number;
  classRank: number;
  teacher: string;
}

const classInfo = ref<ClassInfo>({
  className: '初一(2)班',
  grade: '七年级',
  totalStudents: 50,
  presentStudents: 48,
  averageScore: 78.5,
  classRank: 2,
  teacher: '张老师'
});

const topStudents = ref<Student[]>([
  { id: '001', name: '李小明', studentId: '001', avatar: '', score: 95, rank: 1, status: 'excellent' },
  { id: '002', name: '王小红', studentId: '002', avatar: '', score: 92, rank: 2, status: 'excellent' },
  { id: '003', name: '张小华', studentId: '003', avatar: '', score: 89, rank: 3, status: 'good' },
  { id: '004', name: '刘小强', studentId: '004', avatar: '', score: 87, rank: 4, status: 'good' },
  { id: '005', name: '陈小美', studentId: '005', avatar: '', score: 85, rank: 5, status: 'good' }
]);

// 头像颜色函数暂时保留在设计中，如需个性化可启用

function getRankColor(rank: number): string {
  const colors = {
    1: '#FFD700', // 金色
    2: '#C0C0C0', // 银色
    3: '#CD7F32', // 铜色
    4: '#4C6EFF', // 蓝色
    5: '#A855F7' // 紫色
  };
  return colors[rank as keyof typeof colors] || '#9E9E9E';
}

function getStatusType(status: string): 'success' | 'info' | 'warning' | 'error' {
  const types = {
    excellent: 'success' as const,
    good: 'info' as const,
    average: 'warning' as const,
    attention: 'error' as const
  };
  return types[status as keyof typeof types] || 'info';
}

function getStatusColor(status: string): string {
  const colors = {
    excellent: '#2B46FE',
    good: '#52C41A',
    average: '#FFA726',
    attention: '#EF5350'
  };
  return colors[status as keyof typeof colors] || '#9E9E9E';
}

function getStatusText(status: string): string {
  const texts = {
    excellent: '优秀',
    good: '良好',
    average: '一般',
    attention: '需关注'
  };
  return texts[status as keyof typeof texts] || '未知';
}
</script>

<template>
  <NCard title="班级管理" class="class-management-card h-full">
    <!-- @vue-ignore: naive-ui header-extra 插槽类型提示兼容 -->
    <template #header-extra>
      <NSpace>
        <NButton size="small" type="primary" style="background-color: #2b46fe; border-color: #2b46fe; color: white">
          <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
          <template #icon>
            <NIcon><SettingsOutline /></NIcon>
          </template>
          <span class="hidden sm:inline">班级设置</span>
        </NButton>
      </NSpace>
    </template>

    <div class="space-y-6">
      <!-- 班级基本信息 -->
      <div class="rounded-lg from-blue-50 to-indigo-50 bg-gradient-to-r p-4">
        <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h3 class="text-lg text-gray-800 font-bold">{{ classInfo.className }}</h3>
            <p class="text-sm text-gray-600">班主任：{{ classInfo.teacher }}</p>
          </div>
          <div class="text-left sm:text-right">
            <div class="text-2xl text-blue-600 font-bold">#{{ classInfo.classRank }}</div>
            <div class="text-xs text-gray-500">年级排名</div>
          </div>
        </div>

        <NGrid :cols="2" :sm-cols="4" :x-gap="12" :y-gap="16" responsive="screen">
          <NGridItem>
            <div class="text-center">
              <div class="mb-2 flex items-center justify-center space-x-2">
                <NIcon class="text-blue-600" size="18"><PeopleOutline /></NIcon>
                <span class="text-sm text-gray-600 font-medium">班级人数</span>
              </div>
              <div class="text-2xl text-gray-900 font-bold">
                {{ classInfo.totalStudents }}
                <span class="ml-1 text-sm text-gray-500">人</span>
              </div>
            </div>
          </NGridItem>
          <NGridItem>
            <div class="text-center">
              <div class="mb-2 flex items-center justify-center space-x-2">
                <NIcon class="text-green-600" size="18"><SchoolOutline /></NIcon>
                <span class="text-sm text-gray-600 font-medium">出勤人数</span>
              </div>
              <div class="text-2xl text-gray-900 font-bold">
                {{ classInfo.presentStudents }}
                <span class="ml-1 text-sm text-gray-500">人</span>
              </div>
            </div>
          </NGridItem>
          <NGridItem>
            <div class="text-center">
              <div class="mb-2 flex items-center justify-center space-x-2">
                <NIcon class="text-orange-600" size="18"><TrophyOutline /></NIcon>
                <span class="text-sm text-gray-600 font-medium">平均分</span>
              </div>
              <div class="text-2xl text-gray-900 font-bold">
                {{ classInfo.averageScore }}
                <span class="ml-1 text-sm text-gray-500">分</span>
              </div>
            </div>
          </NGridItem>
          <NGridItem>
            <div class="text-center">
              <div class="mb-2 flex items-center justify-center space-x-2">
                <NIcon class="text-purple-600" size="18"><TimeOutline /></NIcon>
                <span class="text-sm text-gray-600 font-medium">出勤率</span>
              </div>
              <div class="text-2xl text-gray-900 font-bold">
                {{ ((classInfo.presentStudents / classInfo.totalStudents) * 100).toFixed(1) }}
                <span class="ml-1 text-sm text-gray-500">%</span>
              </div>
            </div>
          </NGridItem>
        </NGrid>
      </div>

      <!-- 快捷操作 -->
      <div>
        <h4 class="mb-3 text-base text-gray-800 font-medium">快捷操作</h4>
        <NGrid :cols="2" :sm-cols="4" :x-gap="8" :y-gap="8" responsive="screen">
          <NGridItem>
            <NButton block type="primary" ghost size="small" class="action-button" style="color: white">
              <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
              <template #icon>
                <NIcon size="16"><PersonAddOutline /></NIcon>
              </template>
              <span class="button-text">学生管理</span>
            </NButton>
          </NGridItem>
          <NGridItem>
            <NButton block type="info" ghost size="small" class="action-button">
              <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
              <template #icon>
                <NIcon size="16"><DocumentTextOutline /></NIcon>
              </template>
              <span class="button-text">作业布置</span>
            </NButton>
          </NGridItem>
          <NGridItem>
            <NButton block type="warning" ghost size="small" class="action-button">
              <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
              <template #icon>
                <NIcon size="16"><NotificationsOutline /></NIcon>
              </template>
              <span class="button-text">发送通知</span>
            </NButton>
          </NGridItem>
          <NGridItem>
            <NButton block type="success" ghost size="small" class="action-button">
              <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
              <template #icon>
                <NIcon size="16"><ChatbubbleEllipsesOutline /></NIcon>
              </template>
              <span class="button-text">家长沟通</span>
            </NButton>
          </NGridItem>
        </NGrid>
      </div>

      <!-- 班级前五名 -->
      <div>
        <div class="mb-3 flex items-center justify-between">
          <h4 class="text-base text-gray-800 font-medium">班级前五名</h4>
          <NButton
            size="tiny"
            text
            type="primary"
            style="color: white; background-color: #2b46fe; padding: 4px 8px; border-radius: 4px"
          >
            查看更多
          </NButton>
        </div>
        <div class="space-y-6">
          <div
            v-for="(student, index) in topStudents"
            :key="student.id"
            class="flex items-center justify-between border border-gray-200 rounded-lg bg-gray-100 p-3 transition-shadow hover:shadow-sm"
          >
            <div class="flex items-center space-x-3">
              <div class="relative">
                <NAvatar
                  :size="36"
                  :style="{ backgroundColor: getStatusColor(student.status) }"
                  class="text-white font-medium"
                >
                  {{ student.name.charAt(0) }}
                </NAvatar>
                <div
                  class="absolute h-5 w-5 flex items-center justify-center rounded-full text-xs text-white font-bold -right-1 -top-1"
                  :style="{ backgroundColor: getRankColor(index + 1) }"
                >
                  {{ index + 1 }}
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <p class="truncate text-gray-900 font-medium">{{ student.name }}</p>
                  <p class="text-sm text-gray-500">学号: {{ student.studentId }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="text-right">
                <div class="text-lg text-gray-900 font-bold">{{ student.score }}分</div>
              </div>
              <NTag :type="getStatusType(student.status)" size="small" class="whitespace-nowrap">
                {{ getStatusText(student.status) }}
              </NTag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NCard>
</template>

<style scoped>
.action-button {
  min-height: 36px;
  font-size: 12px;
  font-weight: 500;
}

.button-text {
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

/* 响应式隐藏文字，只在小屏幕上显示图标 */
@media (max-width: 640px) {
  .button-text {
    display: none;
  }

  .action-button {
    min-width: 40px;
    padding: 0 8px;
  }
}

/* 统计数据样式优化 */
:deep(.n-statistic) {
  .n-statistic-label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .n-statistic-value {
    font-size: 18px;
    font-weight: 700;
    color: #1f2937;
  }
}

/* 列表项样式优化 */
:deep(.n-list-item) {
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

:deep(.n-list-item:last-child) {
  border-bottom: none;
}

/* 卡片阴影效果 */
.class-management-card :deep(.n-card) {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* 按钮悬停效果 */
.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(43, 70, 254, 0.15);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .class-management-card {
    margin: 0 -16px;
  }

  :deep(.n-card-header) {
    padding: 16px;
  }

  :deep(.n-card__content) {
    padding: 0 16px 16px;
  }
}
</style>
