<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NConfigProvider, NMessageProvider, NNotificationProvider, useMessage } from 'naive-ui';

// 创建消息引用
const messageApi = ref<ReturnType<typeof useMessage> | null>(null);

// 在全局提供消息服务
onMounted(() => {
  if (messageApi.value) {
    window.$message = messageApi.value;
  }
});

// 初始化消息服务
function initMessage(instance: ReturnType<typeof useMessage>) {
  messageApi.value = instance;
  window.$message = instance;
}

// window.$message 全局类型已在 src/typings/global.d.ts 中定义
</script>

<template>
  <NConfigProvider>
    <NMessageProvider>
      <NNotificationProvider>
        <div @mounted="initMessage(useMessage())">
          <slot></slot>
        </div>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
/* 无需额外样式 */
</style>
