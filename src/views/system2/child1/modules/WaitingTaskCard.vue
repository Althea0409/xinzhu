<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'WaitingTaskCard'
});

interface TaskItem {
  /** 任务ID */
  id: string;
  /** 任务类型 */
  type: string;
  /** 任务状态 */
  status: string;
  /** 提交时间 */
  submitTime: string;
}

// 模拟待办任务数据
const waitingTasks = ref<TaskItem[]>([
  {
    id: '1',
    type: '作业批改',
    status: '未批改',
    submitTime: '2024/3/12 20:30'
  },
  {
    id: '2',
    type: '作业批改',
    status: '未批改',
    submitTime: '2024/3/12 20:19'
  },
  {
    id: '3',
    type: '作业批改',
    status: '已批改',
    submitTime: '2024/3/12 20:19'
  },
  {
    id: '4',
    type: '作业批改',
    status: '已批改',
    submitTime: '2024/3/12 20:19'
  }
]);

/** 活跃任务类型选择 */
const activeTabRef = ref<'waiting' | 'processed'>('waiting');
</script>

<template>
  <div class="rounded-md bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="h-4 w-4 rounded-full bg-blue-500"></div>
        <h3 class="font-bold">待办事项</h3>
      </div>
      <div class="flex items-center space-x-3">
        <div
          :class="{
            'text-blue-500 font-medium': activeTabRef === 'waiting',
            'text-gray-400': activeTabRef !== 'waiting'
          }"
          class="cursor-pointer text-sm"
          @click="activeTabRef = 'waiting'"
        >
          待办事项
        </div>
        <div
          :class="{
            'text-blue-500 font-medium': activeTabRef === 'processed',
            'text-gray-400': activeTabRef !== 'processed'
          }"
          class="cursor-pointer text-sm"
          @click="activeTabRef = 'processed'"
        >
          已办事项
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="task in waitingTasks"
        :key="task.id"
        class="flex items-center justify-between border-l-4 border-blue-500 rounded-r-md bg-blue-50 p-3"
      >
        <div>
          <div class="flex items-center">
            <div class="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
            <div class="font-medium">{{ task.type }}</div>
          </div>
          <div class="mt-1 text-xs text-gray-500">状态：{{ task.status }}</div>
        </div>
        <div class="text-right">
          <div class="text-xs text-gray-500">提交时间：{{ task.submitTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使用UnoCSS的方式，无需额外CSS */
</style>
