<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'NotificationList'
});

interface NotificationItem {
  /** 通知ID */
  id: string;
  /** 通知类型 */
  type: string;
  /** 通知内容 */
  content: string;
  /** 通知日期 */
  date: string;
}

// 模拟通知数据
const notifications = ref<NotificationItem[]>([
  {
    id: '1',
    type: '系统通知',
    content: '您的课程报告已经生成，快来看看吧！',
    date: '2024-3-12'
  },
  {
    id: '2',
    type: '系统通知',
    content: '您的课程报告已经生成，快来看看吧！',
    date: '2024-3-11'
  },
  {
    id: '3',
    type: '系统通知',
    content: '您的课程报告已经生成，快来看看吧！',
    date: '2024-3-10'
  },
  {
    id: '4',
    type: '系统通知',
    content: '您的课程报告已经生成，快来看看吧！',
    date: '2024-3-7'
  }
]);

/** 活跃通知类型选择 */
const activeTabRef = ref<'system' | 'published' | 'student'>('system');
</script>

<template>
  <div class="rounded-md bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center">
      <div class="h-4 w-4 rounded-full bg-blue-500"></div>
      <h3 class="ml-2 font-bold">通知公告</h3>
    </div>

    <div class="mb-4 flex border-b border-gray-200 pb-2 space-x-4">
      <div
        :class="{
          'text-blue-500 font-medium border-blue-500 border-b-2 -mb-2.5': activeTabRef === 'system',
          'text-gray-500': activeTabRef !== 'system'
        }"
        class="cursor-pointer pb-2"
        @click="activeTabRef = 'system'"
      >
        系统通知
      </div>
      <div
        :class="{
          'text-blue-500 font-medium border-blue-500 border-b-2 -mb-2.5': activeTabRef === 'published',
          'text-gray-500': activeTabRef !== 'published'
        }"
        class="cursor-pointer pb-2"
        @click="activeTabRef = 'published'"
      >
        我发布的
      </div>
      <div
        :class="{
          'text-blue-500 font-medium border-blue-500 border-b-2 -mb-2.5': activeTabRef === 'student',
          'text-gray-500': activeTabRef !== 'student'
        }"
        class="cursor-pointer pb-2"
        @click="activeTabRef = 'student'"
      >
        学生动态
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="notice in notifications" :key="notice.id" class="flex justify-between border-b border-gray-100 py-2">
        <div class="text-sm text-gray-700">{{ notice.content }}</div>
        <div class="text-xs text-gray-500">{{ notice.date }}</div>
      </div>
    </div>

    <div class="mt-3 text-center text-xs text-gray-400">以上是全部消息</div>
  </div>
</template>

<style scoped>
/* 使用UnoCSS的方式，无需额外CSS */
</style>
