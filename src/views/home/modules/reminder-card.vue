<script setup lang="ts">
import { ref } from 'vue';
import { NotificationsOutline } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';

// 初始化路由和消息提示
const router = useRouter();
const message = useMessage();

// 当前提醒
const currentReminder = ref({
  date: '明天 (03.27)',
  time: '10:00-10:45',
  course: '数学加减法',
  status: '教案未准备！'
});

// 按钮加载状态
const loading = ref(false);

// 前往准备
const goToPrepare = () => {
  // 设置加载状态
  loading.value = true;

  // 显示提示信息
  message.success('正在跳转到AI教案生成器...');

  // 短暂延迟后跳转，模拟加载过程
  setTimeout(() => {
    // 跳转到AI教案生成器页面
    router.push('/system1/child1');
    loading.value = false;
  }, 500);
};
</script>

<template>
  <div class="reminder-card rounded-lg bg-blue-50 p-4">
    <div class="card-header mb-4 flex items-center gap-2">
      <div class="icon-wrapper rounded bg-blue-500 p-1 text-white">
        <NIcon size="20"><NotificationsOutline /></NIcon>
      </div>
      <div class="text-blue-500 font-bold">紧急待办</div>
    </div>

    <div class="reminder-content flex items-center gap-4">
      <div class="icon-wrapper flex-shrink-0">
        <div class="relative">
          <img src="/src/assets/images/clipboard.png" alt="Clipboard" class="h-32 w-32" />
          <div class="absolute h-4 w-4 rounded-full bg-blue-500 -right-1 -top-1"></div>
        </div>
      </div>
      <div class="flex-grow">
        <div class="text-lg font-bold">{{ currentReminder.date }}</div>
        <div class="text-blue-500">{{ currentReminder.time }}</div>
        <div class="text-blue-500">{{ currentReminder.course }}</div>
        <br />
        <div class="text-red-500">{{ currentReminder.status }}</div>
      </div>
      <div class="flex-shrink-0">
        <NButton type="primary" size="small" class="mt-26 rounded-full" :loading="loading" @click="goToPrepare">
          去准备
        </NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reminder-card {
  height: 100%;
}
</style>
