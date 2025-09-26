<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { NButton, NCard, NIcon, NTag } from 'naive-ui';
import { AnalyticsOutline } from '@vicons/ionicons5';
import GradeDistribution from './modules/GradeDistribution.vue';
import KnowledgeRadar from './modules/KnowledgeRadar.vue';
import ErrorTop10 from './modules/ErrorTop10.vue';
import ClassManagement from './modules/ClassManagement.vue';

// 班级基本信息
const classInfo = ref({
  className: '初一(2)班 ',
  subject: '语文',
  studentCount: 50,
  semester: '2025年秋季学期',
  teacher: '张老师'
});

// 整体统计数据
const overallStats = ref({
  averageScore: 85.2,
  passRate: 92.8,
  excellentRate: 35.7,
  improvementRate: 12.5
});

// 最近更新时间 - 实时更新
const lastUpdated = ref('');

// 格式化时间函数
const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 更新时间
const updateTime = () => {
  lastUpdated.value = formatTime(new Date());
};

// 定时器
let timer: NodeJS.Timeout | null = null;

// 组件挂载时启动定时器
onMounted(() => {
  updateTime(); // 立即更新一次
  timer = setInterval(updateTime, 60000); // 每分钟更新一次
});

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});

// 计算统计数据的颜色
const getStatColor = (value: number, type: 'score' | 'rate') => {
  if (type === 'score') {
    if (value >= 90) return '#2B46FE';
    if (value >= 80) return '#52c41a';
    if (value >= 70) return '#faad14';
    return '#ff4d4f';
  }
  if (value >= 90) return '#2B46FE';
  if (value >= 80) return '#52c41a';
  if (value >= 60) return '#faad14';
  return '#ff4d4f';
};
</script>

<template>
  <div class="min-h-screen p-6">
    <!-- 页面标题区域 -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-3xl text-gray-800 font-bold">{{ classInfo.className }} 初中语文教学数据看板</h1>
          <div class="flex items-center text-sm text-gray-600 space-x-4">
            <span>{{ classInfo.semester }}</span>
            <span>•</span>
            <span>任课教师：{{ classInfo.teacher }}</span>
            <span>•</span>
            <span>学生人数：{{ classInfo.studentCount }}人</span>
            <span>•</span>
            <span>最后更新：{{ lastUpdated }}</span>
          </div>
        </div>
        <NButton type="primary" size="large" style="background-color: #2b46fe; border-color: #2b46fe">
          <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
          <template #icon>
            <NIcon><AnalyticsOutline /></NIcon>
          </template>
          生成报告
        </NButton>
      </div>
    </div>

    <!-- 核心指标卡片 -->
    <div class="mb-8">
      <NGrid :cols="4" :x-gap="16" responsive="screen">
        <NGridItem>
          <NCard class="text-center transition-all duration-300 hover:shadow-lg" style="border-left: 4px solid #2b46fe">
            <NStatistic label="班级平均分" :value="overallStats.averageScore" :precision="1">
              <template #suffix>分</template>
            </NStatistic>
            <div class="mt-2">
              <NTag
                :color="{ color: getStatColor(overallStats.averageScore, 'score'), textColor: 'white' }"
                size="small"
              >
                {{ overallStats.averageScore >= 85 ? '优秀' : overallStats.averageScore >= 75 ? '良好' : '待提升' }}
              </NTag>
            </div>
          </NCard>
        </NGridItem>

        <NGridItem>
          <NCard class="text-center transition-all duration-300 hover:shadow-lg" style="border-left: 4px solid #52c41a">
            <NStatistic label="及格率" :value="overallStats.passRate" :precision="1">
              <template #suffix>%</template>
            </NStatistic>
            <div class="mt-2">
              <NTag :color="{ color: getStatColor(overallStats.passRate, 'rate'), textColor: 'white' }" size="small">
                {{ overallStats.passRate >= 90 ? '优秀' : overallStats.passRate >= 80 ? '良好' : '待提升' }}
              </NTag>
            </div>
          </NCard>
        </NGridItem>

        <NGridItem>
          <NCard class="text-center transition-all duration-300 hover:shadow-lg" style="border-left: 4px solid #faad14">
            <NStatistic label="优秀率" :value="overallStats.excellentRate" :precision="1">
              <template #suffix>%</template>
            </NStatistic>
            <div class="mt-2">
              <NTag
                :color="{ color: getStatColor(overallStats.excellentRate, 'rate'), textColor: 'white' }"
                size="small"
              >
                {{ overallStats.excellentRate >= 30 ? '优秀' : overallStats.excellentRate >= 20 ? '良好' : '待提升' }}
              </NTag>
            </div>
          </NCard>
        </NGridItem>

        <NGridItem>
          <NCard class="text-center transition-all duration-300 hover:shadow-lg" style="border-left: 4px solid #722ed1">
            <NStatistic label="进步率" :value="overallStats.improvementRate" :precision="1">
              <template #suffix>%</template>
            </NStatistic>
            <div class="mt-2">
              <NTag :color="{ color: '#722ed1', textColor: 'white' }" size="small">
                {{ overallStats.improvementRate > 0 ? '上升趋势' : '需要关注' }}
              </NTag>
            </div>
          </NCard>
        </NGridItem>
      </NGrid>
    </div>

    <!-- 主要内容区域 -->
    <NGrid :cols="3" :x-gap="16" :y-gap="16" responsive="screen">
      <!-- 成绩分布图 -->
      <NGridItem :span="2">
        <div class="h-full">
          <GradeDistribution />
        </div>
      </NGridItem>

      <!-- 班级管理 -->
      <NGridItem>
        <div class="h-full">
          <ClassManagement />
        </div>
      </NGridItem>

      <!-- 知识点掌握雷达图 -->
      <NGridItem>
        <div class="h-full">
          <KnowledgeRadar />
        </div>
      </NGridItem>

      <!-- 错题Top10 -->
      <NGridItem :span="2">
        <div class="h-full">
          <ErrorTop10 />
        </div>
      </NGridItem>
    </NGrid>

    <!-- 快速操作区域 -->
    <!--
 <div class="mt-8">
      <NCard title="快速操作" class="hover:shadow-lg transition-all duration-300">
        <NSpace size="large">
          <NButton type="primary" size="large" style="background-color: #2B46FE; border-color: #2B46FE;">
            <template #icon>
              <NIcon><BookOutline /></NIcon>
            </template>
            布置作业
          </NButton>
          
          <NButton type="default" size="large">
            <template #icon>
              <NIcon><PeopleOutline /></NIcon>
            </template>
            学生管理
          </NButton>
          
          <NButton type="default" size="large">
            <template #icon>
              <NIcon><TrendingUpOutline /></NIcon>
            </template>
            成绩分析
          </NButton>
          
          <NButton type="default" size="large">
            <template #icon>
              <NIcon><AnalyticsOutline /></NIcon>
            </template>
            导出数据
          </NButton>
        </NSpace>
      </NCard>
    </div> 
-->
  </div>
</template>

<style scoped>
/* 自定义样式 */
.n-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(43, 70, 254, 0.08);
}

.n-card:hover {
  box-shadow: 0 8px 24px rgba(43, 70, 254, 0.15);
}

.n-statistic {
  --n-value-font-size: 28px;
  --n-value-font-weight: 700;
  --n-label-font-size: 14px;
  --n-label-text-color: #666;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .n-grid-item[span='2'] {
    grid-column: span 3;
  }
}

@media (max-width: 768px) {
  .n-grid {
    grid-template-columns: 1fr;
  }

  .n-grid-item {
    grid-column: span 1 !important;
  }
}

/* 渐变背景 */
.bg-gradient-to-br {
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
}

/* 主题色应用 */
:deep(.n-button--primary-type) {
  background-color: #2b46fe !important;
  border-color: #2b46fe !important;
}

:deep(.n-button--primary-type:hover) {
  background-color: #1e3bfe !important;
  border-color: #1e3bfe !important;
}

:deep(.n-button--primary-type:focus) {
  background-color: #1e3bfe !important;
  border-color: #1e3bfe !important;
}
</style>
