<script setup lang="ts">
import { computed } from 'vue';
import { NCard, NTag } from 'naive-ui';

interface ProgressData {
  completion: number; // 0-100
  activity: number; // 0-100
  score: number; // 0-100
}

interface FeedbackSnapshot {
  count: number;
  avgRating: number; // 1-5
}

const props = defineProps<{ progress: ProgressData; feedback: FeedbackSnapshot }>();

const qualityIndex = computed(() => {
  const { completion, activity, score } = props.progress;
  const feedbackFactor = props.feedback.avgRating / 5; // 0-1
  const base = completion * 0.3 + activity * 0.3 + score * 0.4; // 0-100
  return Math.round(base * (0.8 + 0.2 * feedbackFactor));
});

const recommendations = computed(() => {
  const recs: string[] = [];
  if (props.progress.activity < 75) recs.push('提升课堂互动，加入随堂问答与小组讨论');
  if (props.progress.completion < 80) recs.push('加强作业过程性督导，明确提交规范');
  if (props.progress.score < 85) recs.push('针对薄弱知识点进行复盘与强化练习');
  if (props.feedback.avgRating < 4.2) recs.push('收集更多学生意见，优化讲解节奏与案例');
  if (!recs.length) recs.push('总体表现优异，保持当前教学策略并持续跟踪数据');
  return recs;
});
</script>

<template>
  <div class="rounded-lg bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center">
      <div class="mr-2 h-5 w-1 rounded bg-orange-500"></div>
      <h2 class="text-lg text-orange-600 font-bold">授课质量报告</h2>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <NCard size="small">
        <template #header>综合质量指数</template>
        <div class="space-y-3">
          <NProgress type="line" :percentage="qualityIndex" status="success" :height="10" />
          <div class="text-gray-600">
            综合指数：
            <span class="text-2xl text-gray-900 font-bold">{{ qualityIndex }}</span>
            / 100
          </div>
          <div class="text-sm text-gray-500">指标来源：进度、活跃、成绩 + 学生反馈</div>
        </div>
      </NCard>

      <NCard size="small">
        <template #header>数据快照</template>
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded bg-blue-50 p-3">
            <div class="text-xs text-gray-600">学习进度</div>
            <div class="text-2xl text-blue-600 font-bold">{{ props.progress.completion }}%</div>
          </div>
          <div class="rounded bg-green-50 p-3">
            <div class="text-xs text-gray-600">课堂活跃</div>
            <div class="text-2xl text-green-600 font-bold">{{ props.progress.activity }}%</div>
          </div>
          <div class="rounded bg-purple-50 p-3">
            <div class="text-xs text-gray-600">平均成绩</div>
            <div class="text-2xl text-purple-600 font-bold">{{ props.progress.score }}%</div>
          </div>
        </div>
      </NCard>
    </div>

    <NCard size="small" class="mt-4">
      <template #header>智能建议（可执行）</template>
      <div class="flex flex-wrap gap-2">
        <NTag v-for="(r, i) in recommendations" :key="i" type="info" round size="small">{{ r }}</NTag>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
</style>
