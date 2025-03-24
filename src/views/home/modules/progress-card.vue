<script setup lang="ts">
import { ref } from 'vue';

// 进度数据
const progressItems = ref([
  { name: '教案撰写', color: 'purple', value: 75 },
  { name: 'PPT制作', color: 'blue', value: 50 },
  { name: '练习题设置', color: 'orange', value: 30 }
]);

// 添加新进度项
const addProgressItem = () => {
  // 实际应用中这里应该打开添加进度项的对话框
  // eslint-disable-next-line no-console
  console.log('添加新进度项');
};
</script>

<template>
  <div class="progress-card rounded-lg bg-white p-4">
    <div class="card-header mb-4 flex items-center justify-between">
      <div class="text-lg font-bold">备课进度</div>
      <NButton quaternary circle size="small" @click="addProgressItem">
        <template #icon>
          <NIcon><AddOutline /></NIcon>
        </template>
      </NButton>
    </div>

    <div class="progress-items space-y-6">
      <div v-for="(item, index) in progressItems" :key="index" class="progress-item">
        <div class="mb-2 flex items-center gap-2">
          <div
            class="color-indicator h-4 w-4 rounded"
            :style="{
              backgroundColor: item.color === 'purple' ? '#8a2be2' : item.color === 'blue' ? '#1890ff' : '#ff7a45'
            }"
          ></div>
          <div>{{ item.name }}</div>
        </div>
        <NProgress
          type="line"
          :percentage="item.value"
          :color="item.color === 'purple' ? '#8a2be2' : item.color === 'blue' ? '#1890ff' : '#ff7a45'"
          :height="6"
          :border-radius="4"
          :show-indicator="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-card {
  height: 100%;
}
</style>
