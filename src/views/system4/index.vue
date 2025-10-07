<script setup lang="ts">
import { computed, ref } from 'vue';
import RadarChart from './modules/RadarChart.vue';
import AssessmentMatrix from './modules/AssessmentMatrix.vue';
import PersonalizedPlan from './modules/PersonalizedPlan.vue';
import TeacherPortrait from './modules/TeacherPortrait.vue';
import StudentFeedback from './modules/StudentFeedback.vue';
import QualityReport from './modules/QualityReport.vue';
// 导入图标库
import '@vicons/carbon';

// 雷达图数据
const radarData = ref([
  {
    name: '能力值',
    value: [90, 70, 80, 60, 75]
  }
]);

const radarCategories = ref(['工具应用', '数据思维', '备课经验', '创新实践', '教学设计']);

// 评估矩阵数据
const assessmentData = ref([
  {
    primary: '智能工具应用',
    secondary: '学情分析系统操作',
    method: '模拟操作评估',
    score: 85,
    maxScore: 100
  }
]);

// 个性化提升方案数据
const personalPlans = ref([
  {
    title: '实践演练',
    description: '课堂教学数据可视化',
    duration: '预计学习时间30分钟',
    materials: '包含2个案例+1次实操训练'
  },
  {
    title: '教学设计',
    description: '基于数据分析的教学设计',
    duration: '预计学习时间45分钟',
    materials: '包含3个案例+2次实操训练'
  },
  {
    title: '能力评测',
    description: '智能教学能力综合评估',
    duration: '预计学习时间35分钟',
    materials: '包含2个案例+3次实操训练'
  }
]);

// 学习能力趋势数据
const progressData = ref([
  { date: '2023-09', score: 72 },
  { date: '2023-10', score: 78 },
  { date: '2023-11', score: 82 },
  { date: '2023-12', score: 85 },
  { date: '2024-01', score: 89 }
]);

// 获取最新月份的学习能力数据
const latestProgress = computed(() => {
  return progressData.value[progressData.value.length - 1];
});

const feedbackSnapshot = ref({ count: 2, avgRating: 4.5 });
function onFeedbackSubmitted(payload: { rating: number }) {
  // 简单更新平均分（示例：加入一条新评分）
  const total = feedbackSnapshot.value.avgRating * feedbackSnapshot.value.count + payload.rating;
  feedbackSnapshot.value.count += 1;
  feedbackSnapshot.value.avgRating = Number((total / feedbackSnapshot.value.count).toFixed(2));
}
</script>

<template>
  <div class="mx-auto px-8 py-6 container">
    <div class="grid grid-cols-1 mb-6 gap-5 md:grid-cols-2">
      <!-- 三维能力图谱 -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center">
          <div class="mr-2 h-5 w-1 rounded bg-blue-500"></div>
          <h2 class="text-lg text-blue-600 font-bold">三维能力图像</h2>
        </div>
        <div class="mt-3">
          <RadarChart :data="radarData" :categories="radarCategories" />
        </div>
      </div>

      <!-- 核心指标分析 -->
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center">
          <div class="mr-2 h-5 w-1 rounded bg-green-500"></div>
          <h2 class="text-lg text-green-600 font-bold">核心指标分析</h2>
        </div>

        <!-- 智能工具应用区块 -->
        <div class="mb-6 p-4">
          <div class="flex items-center">
            <div class="mr-3">
              <div class="h-16 w-16 flex items-center justify-center rounded-md bg-green-100">
                <div class="h-10 w-10 flex items-center justify-center rounded-md bg-green-500 text-white">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium">智能工具应用</h3>
              <p class="text-gray-600">超过本区域82%的教师</p>
              <div class="mt-2 flex space-x-2">
                <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">学情分析专家</span>
                <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">超级达人</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 学习能力趋势区块 -->
        <div class="p-4">
          <div class="flex items-center">
            <div class="mr-3">
              <div class="h-16 w-16 flex items-center justify-center rounded-md bg-green-100">
                <div class="h-10 w-10 flex items-center justify-center rounded-md bg-green-500 text-white">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    <path d="M17 6h6v6" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium">学习能力趋势</h3>
              <p class="text-gray-600">能力提升至{{ latestProgress.score }}%</p>
              <div class="mt-2 flex space-x-2">
                <span class="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600">持续上升</span>
                <span class="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">增长迅速</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评估维度矩阵 -->
    <div class="mb-6 rounded-lg bg-white shadow-sm">
      <div class="p-4">
        <div class="mb-4 flex items-center">
          <div class="mr-2 h-5 w-1 rounded bg-purple-500"></div>
          <h2 class="text-lg text-purple-600 font-bold">评估维度矩阵</h2>
        </div>
        <AssessmentMatrix title="" :data="assessmentData" />
      </div>
    </div>

    <!-- 个性化提升方案 -->
    <div class="mb-6 rounded-lg bg-white shadow-sm">
      <div class="p-4">
        <div class="mb-4 flex items-center">
          <div class="mr-2 h-5 w-1 rounded bg-red-500"></div>
          <h2 class="text-lg text-red-600 font-bold">个性化提升方案</h2>
        </div>
        <div class="grid grid-cols-1 mt-3 gap-4 md:grid-cols-3">
          <PersonalizedPlan
            v-for="(plan, index) in personalPlans"
            :key="index"
            :title="plan.title"
            :description="plan.description"
            :duration="plan.duration"
            :materials="plan.materials"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 mb-6 gap-5 md:grid-cols-2">
      <TeacherPortrait />
      <QualityReport
        :progress="{ completion: 85, activity: latestProgress.score, score: 88 }"
        :feedback="{ count: feedbackSnapshot.count, avgRating: feedbackSnapshot.avgRating }"
      />
    </div>

    <div class="mb-6 rounded-lg bg-white shadow-sm">
      <StudentFeedback @submitted="onFeedbackSubmitted" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}

.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.p-6 {
  padding: 1.5rem;
}

.p-4 {
  padding: 1rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.items-center {
  align-items: center;
}

.gap-5 {
  gap: 1.25rem;
}

.gap-4 {
  gap: 1rem;
}

.w-1 {
  width: 0.25rem;
}

.h-5 {
  height: 1.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: bold;
}

.text-blue-600 {
  color: #2563eb;
}

.text-green-600 {
  color: #16a34a;
}

.text-purple-600 {
  color: #9333ea;
}

.text-red-600 {
  color: #dc2626;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-green-500 {
  background-color: #22c55e;
}

.bg-purple-500 {
  background-color: #a855f7;
}

.bg-red-500 {
  background-color: #ef4444;
}

.bg-white {
  background-color: #ffffff;
}

.rounded {
  border-radius: 0.25rem;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
