<script setup lang="ts">
interface AssessmentItem {
  primary: string;
  secondary: string;
  method: string;
  score: number;
  maxScore: number;
}

withDefaults(
  defineProps<{
    title?: string;
    data?: AssessmentItem[];
  }>(),
  {
    title: '评估维度矩阵',
    data: () => [
      {
        primary: '智能工具应用',
        secondary: '学情分析系统操作',
        method: '模拟操作评估',
        score: 85,
        maxScore: 100
      }
    ]
  }
);
</script>

<template>
  <div class="rounded-md bg-white p-4">
    <h3 v-if="title" class="mb-4 flex items-center text-lg text-purple-600 font-bold">
      {{ title }}
    </h3>

    <div class="overflow-auto">
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="px-3 py-2 text-gray-700 font-medium">一级指标</th>
            <th class="px-3 py-2 text-gray-700 font-medium">二级指标</th>
            <th class="px-3 py-2 text-gray-700 font-medium">评估方式</th>
            <th class="px-3 py-2 text-gray-700 font-medium">最近表现</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index" class="border-b border-gray-100">
            <td class="px-3 py-3 text-gray-700">{{ item.primary }}</td>
            <td class="px-3 py-3 text-gray-700">{{ item.secondary }}</td>
            <td class="px-3 py-3">
              <span
                class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700 font-medium"
              >
                {{ item.method }}
              </span>
            </td>
            <td class="px-3 py-3">
              <div class="flex items-center">
                <div class="mr-2 h-2.5 w-32 rounded-full bg-gray-200">
                  <div class="h-2.5 rounded-full bg-green-500" :style="{ width: `${item.score}%` }"></div>
                </div>
                <span class="text-sm text-gray-600">{{ item.score }}/{{ item.maxScore }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* 自定义样式 */
table {
  border-spacing: 0;
}

th {
  font-weight: 500;
  text-align: left;
  background-color: transparent;
}

tr:hover {
  background-color: #f9fafb;
}
</style>
