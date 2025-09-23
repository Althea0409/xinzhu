<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCard } from 'naive-ui';

defineOptions({
  name: 'VersionHistory'
});

interface VersionInfo {
  id: string;
  version: string;
  date: string;
  description: string;
}

const versions = ref<VersionInfo[]>([
  {
    id: '1',
    version: 'v2.1',
    date: '2024-08-20',
    description: '优化实验环节设计，增加安全提示'
  }
]);
</script>

<template>
  <NCard class="version-history mt-4">
    <h3 class="mb-4 text-gray-800 font-medium">版本历史</h3>

    <div class="version-list">
      <div v-for="version in versions" :key="version.id" class="version-item mb-4">
        <div class="mb-1 flex items-center">
          <div class="mr-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600 font-medium">
            {{ version.version }}
          </div>
          <div class="text-xs text-gray-500">{{ version.date }}</div>
        </div>
        <div class="text-sm text-gray-600">{{ version.description }}</div>
      </div>
    </div>

    <div class="mt-4 text-center">
      <NButton text class="text-sm text-blue-600">查看详细报告</NButton>
    </div>
  </NCard>
</template>

<style scoped>
.version-history {
  min-height: 150px;
}
</style>
