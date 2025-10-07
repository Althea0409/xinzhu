<script setup lang="ts">
import { computed, ref } from 'vue';
import { NCard, NTag } from 'naive-ui';

interface FeedbackItem {
  id: number;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// 教师视角：仅展示数据概览与近期反馈，不提供提交入口
const feedbacks = ref<FeedbackItem[]>([
  { id: 2001, rating: 5, comment: '老师这次案例讲解特别接地气，听完就能上手，感谢！', createdAt: '2025-09-29 09:10' },
  { id: 2002, rating: 4, comment: '能不能下课前留5分钟做复盘，我感觉这样印象更深。', createdAt: '2025-09-29 09:45' },
  { id: 2003, rating: 3, comment: 'PPT字有点多，讲的时候容易跟不上，建议多一些图示。', createdAt: '2025-09-29 10:20' },
  {
    id: 2005,
    rating: 2,
    comment: '课堂互动环节我还不太敢发言，能不能先小组讨论再分享？',
    createdAt: '2025-09-29 11:30'
  },
  { id: 2007, rating: 4, comment: '老师语速稍快，尤其新概念那里，可以慢一点。', createdAt: '2025-09-29 12:40' },
  { id: 2008, rating: 5, comment: '课后答疑很耐心，问题都解决了，谢谢老师！', createdAt: '2025-09-29 13:15' },
  { id: 2009, rating: 3, comment: '希望能把课堂使用的软件快捷键整理一下发给我们。', createdAt: '2025-09-29 13:50' },
  {
    id: 2010,
    rating: 4,
    comment: '项目作业很有挑战，我建议增加一次中期检查，避免方向跑偏。',
    createdAt: '2025-09-29 14:20'
  },
  { id: 2011, rating: 5, comment: '这节课氛围很好，大家都愿意动手试，我很有收获。', createdAt: '2025-09-29 14:45' }
]);
const count = computed(() => feedbacks.value.length);
const avg = computed(() =>
  (feedbacks.value.reduce((s, f) => s + f.rating, 0) / Math.max(1, feedbacks.value.length)).toFixed(1)
);
const positiveRate = computed(() => {
  const pos = feedbacks.value.filter(f => f.rating >= 4).length;
  return Math.round((pos / Math.max(1, feedbacks.value.length)) * 100);
});

// 评分分布
const distribution = computed(() => {
  const dist = [0, 0, 0, 0, 0];
  feedbacks.value.forEach(f => {
    dist[f.rating - 1] += 1;
  });
  const total = Math.max(1, feedbacks.value.length);
  return dist.map(n => Math.round((n / total) * 100)); // 百分比
});
</script>

<template>
  <div class="rounded-lg bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center">
      <div class="mr-2 h-5 w-1 rounded bg-emerald-500"></div>
      <h2 class="text-lg text-emerald-600 font-bold">学生反馈</h2>
    </div>

    <!-- 概览与分布 -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <NCard size="small" class="lg:col-span-2">
        <!-- @vue-ignore: naive-ui 卡片头部插槽类型提示兼容 -->
        <template #header>反馈概览</template>
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded bg-blue-50 p-3">
            <div class="text-xs text-gray-600">反馈条数</div>
            <div class="text-2xl text-blue-600 font-bold">{{ count }}</div>
          </div>
          <div class="rounded bg-yellow-50 p-3">
            <div class="text-xs text-gray-600">平均评分</div>
            <div class="text-2xl text-yellow-600 font-bold">{{ avg }}</div>
          </div>
          <div class="rounded bg-green-50 p-3">
            <div class="text-xs text-gray-600">正面比例(≥4星)</div>
            <div class="text-2xl text-green-600 font-bold">{{ positiveRate }}%</div>
          </div>
        </div>
      </NCard>

      <NCard size="small" class="lg:col-span-1">
        <!-- @vue-ignore: naive-ui 卡片头部插槽类型提示兼容 -->
        <template #header>评分分布</template>
        <div class="space-y-2">
          <div v-for="n in 5" :key="n" class="flex items-center">
            <div class="w-16 text-sm text-gray-700">{{ 6 - n }} 星</div>
            <div class="flex-1">
              <div class="h-2 rounded-full bg-gray-200">
                <div class="h-2 rounded-full bg-green-500" :style="{ width: distribution[5 - n] + '%' }"></div>
              </div>
            </div>
            <div class="ml-3 w-10 text-right text-sm text-gray-600">{{ distribution[5 - n] }}%</div>
          </div>
        </div>
      </NCard>
    </div>

    <!-- 近期反馈列表 -->
    <NCard size="small" class="mt-4">
      <!-- @vue-ignore: naive-ui 卡片头部插槽类型提示兼容 -->
      <template #header>近期反馈</template>
      <div class="divide-y divide-gray-100">
        <div v-for="f in feedbacks" :key="f.id" class="py-3">
          <div class="mb-1 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <span v-for="i in 5" :key="i" class="text-yellow-400">
                  {{ i <= f.rating ? '★' : '☆' }}
                </span>
              </div>
              <NTag size="small" type="success" round>{{ f.createdAt }}</NTag>
            </div>
          </div>
          <p class="text-gray-800">{{ f.comment || '（无文字建议）' }}</p>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
</style>
