<script setup lang="ts">
import { ref } from 'vue';
import { AddOutline } from '@vicons/ionicons5';

// 进度数据
const progressItems = ref([
  { name: '古诗教学设计（静夜思）', color: 'purple', value: 80 },
  { name: '识字与写字教案撰写', color: 'blue', value: 60 },
  { name: '阅读训练课件制作', color: 'orange', value: 40 },
  { name: '单元复习资料准备', color: 'purple', value: 30 }
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
      <div class="text-lg font-bold">语文备课进度</div>
      <NButton quaternary circle size="small" @click="addProgressItem">
        <NIcon><AddOutline /></NIcon>
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
