<script setup lang="ts">
import { computed, ref } from 'vue';
import { NCard } from 'naive-ui';

defineOptions({
  name: 'GradeDistribution'
});

interface GradeRange {
  range: string;
  count: number;
  percentage: number;
  color: string;
}

// 模拟班级语文成绩分布数据
const gradeData = ref<GradeRange[]>([
  { range: '90-100分', count: 8, percentage: 16, color: '#2B46FE' },
  { range: '80-89分', count: 14, percentage: 28, color: '#4C6EFF' },
  { range: '70-79分', count: 18, percentage: 36, color: '#7B9AFF' },
  { range: '60-69分', count: 6, percentage: 12, color: '#A8C5FF' },
  { range: '60分以下', count: 4, percentage: 8, color: '#D4E4FF' }
]);

const totalStudents = computed(() => gradeData.value.reduce((sum, item) => sum + item.count, 0));
// 如需展示平均分/通过率/优秀率，可在此添加相应计算
/*
const averageScore = ref(78.5);
const passRate = computed(() => {
  const passCount = gradeData.value.slice(0, 4).reduce((sum, item) => sum + item.count, 0);
  return ((passCount / totalStudents.value) * 100).toFixed(1);
});

const excellentRate = computed(() => {
  const excellentCount = gradeData.value[0].count;
  return ((excellentCount / totalStudents.value) * 100).toFixed(1);
});
*/
</script>

<template>
  <NCard class="h-full overflow-hidden">
    <!-- @vue-ignore: naive-ui header 插槽类型提示兼容 -->
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-6 w-1 rounded-full from-blue-500 to-blue-600 bg-gradient-to-b"></div>
          <h3 class="text-lg text-gray-800 font-bold">班级成绩分布</h3>
        </div>
        <div class="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-500">
          <span class="h-2 w-2 rounded-full bg-blue-500"></span>
          <span>总人数: {{ totalStudents }}人</span>
        </div>
      </div>
    </template>

    <div class="space-y-8">
      <!-- 学习情况总览 -->
      <div class="grid grid-cols-2 gap-6">
        <div
          class="relative border border-blue-100 rounded-2xl from-blue-50 via-blue-100 to-blue-50 bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div class="absolute right-4 top-4 h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10">
            <span class="text-lg text-blue-600">📊</span>
          </div>
          <div class="space-y-4">
            <h4 class="text-base text-blue-900 font-semibold">学习进度分析</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-blue-700 font-medium">课程完成度</span>
                <span class="text-lg text-blue-800 font-bold">85%</span>
              </div>
              <div class="relative h-3 w-full overflow-hidden rounded-full bg-blue-200/50">
                <div
                  class="absolute inset-0 rounded-full from-blue-400 to-blue-500 bg-gradient-to-r transition-all duration-700 ease-out"
                  style="width: 85%"
                ></div>
                <div class="absolute inset-0 rounded-full from-transparent to-white/20 bg-gradient-to-r"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative border border-green-100 rounded-2xl from-green-50 via-green-100 to-green-50 bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div class="absolute right-4 top-4 h-10 w-10 flex items-center justify-center rounded-xl bg-green-500/10">
            <span class="text-lg text-green-600">🎯</span>
          </div>
          <div class="space-y-4">
            <h4 class="text-base text-green-900 font-semibold">知识掌握情况</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-green-700 font-medium">掌握程度</span>
                <span class="text-lg text-green-800 font-bold">良好</span>
              </div>
              <div class="flex space-x-2">
                <div class="h-4 w-4 rounded-full from-green-400 to-green-500 bg-gradient-to-br shadow-sm"></div>
                <div class="h-4 w-4 rounded-full from-green-300 to-green-400 bg-gradient-to-br shadow-sm"></div>
                <div class="h-4 w-4 rounded-full from-green-200 to-green-300 bg-gradient-to-br shadow-sm"></div>
                <div class="h-4 w-4 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 成绩分布图 -->
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <h4 class="flex items-center gap-2 text-lg text-gray-800 font-semibold">
            <div class="h-2 w-2 rounded-full bg-blue-500"></div>
            成绩分布详情
          </h4>
          <div class="border rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-500">
            总人数: {{ totalStudents }}人
          </div>
        </div>
        <div class="space-y-4">
          <div
            v-for="item in gradeData"
            :key="item.range"
            class="group flex items-center rounded-xl p-3 transition-all duration-200 space-x-6 hover:bg-gray-50/50"
          >
            <div class="w-24 flex-shrink-0 text-sm text-gray-700 font-semibold">
              {{ item.range }}
            </div>
            <div class="relative flex-1">
              <div class="h-6 overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                <div
                  class="relative h-full flex items-center justify-end overflow-hidden rounded-xl pr-3 transition-all duration-700 ease-out"
                  :style="{
                    width: `${item.percentage}%`,
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                  }"
                >
                  <div class="absolute inset-0 from-transparent to-white/10 bg-gradient-to-r"></div>
                  <span class="relative z-10 text-sm text-white font-semibold">{{ item.count }}人</span>
                </div>
              </div>
            </div>
            <div class="w-16 flex-shrink-0 text-right text-sm text-gray-600 font-semibold">{{ item.percentage }}%</div>
          </div>
        </div>
      </div>

      <!-- 学习建议与指导 -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          class="border border-blue-200/50 rounded-2xl from-blue-50 to-indigo-50 bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <h5 class="mb-4 flex items-center gap-2 text-base text-blue-900 font-semibold">
            <span class="text-xl">💡</span>
            个性化学习建议
          </h5>
          <div class="space-y-3">
            <div class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/50">
              <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
              <span class="text-sm text-blue-800 leading-relaxed">针对70-79分段学生，加强基础知识巩固</span>
            </div>
            <div class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/50">
              <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
              <span class="text-sm text-blue-800 leading-relaxed">为80-89分段学生提供拓展练习</span>
            </div>
            <div class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/50">
              <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
              <span class="text-sm text-blue-800 leading-relaxed">优秀学生可参与同伴辅导活动</span>
            </div>
          </div>
        </div>

        <div
          class="border border-orange-200/50 rounded-2xl from-orange-50 to-red-50 bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <h5 class="mb-4 flex items-center gap-2 text-base text-orange-900 font-semibold">
            <span class="text-xl">📈</span>
            提升策略
          </h5>
          <div class="space-y-3">
            <div class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/50">
              <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
              <span class="text-sm text-orange-800 leading-relaxed">实施分层教学，因材施教</span>
            </div>
            <div class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/50">
              <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
              <span class="text-sm text-orange-800 leading-relaxed">增加互动式教学环节</span>
            </div>
            <div class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/50">
              <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
              <span class="text-sm text-orange-800 leading-relaxed">定期进行学习效果评估</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 教学资源与工具 -->

      <!-- 学习数据分析 -->
    </div>
  </NCard>
</template>

<style scoped>
.n-statistic {
  --n-value-font-size: 24px;
  --n-label-font-size: 14px;
}
</style>
