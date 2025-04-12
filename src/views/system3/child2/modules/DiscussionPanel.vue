<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'DiscussionPanel'
});

interface DiscussionGroup {
  id: string;
  name: string;
  count: number;
  active?: boolean;
}

const discussions = ref<DiscussionGroup[]>([
  { id: '1', name: '初中数学组', count: 4, active: true },
  { id: '2', name: '课堂管理技巧', count: 2 }
]);
</script>

<template>
  <div class="discussion-panel rounded-lg bg-white p-5 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-base text-gray-800 font-medium">进行中的研讨</h3>
      <Icon icon="carbon:overflow-menu-horizontal" class="cursor-pointer text-lg text-gray-400 hover:text-gray-600" />
    </div>

    <div class="space-y-3">
      <div
        v-for="discussion in discussions"
        :key="discussion.id"
        class="discussion-item group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-lg p-3 transition-all hover:bg-gray-50"
        :class="{ 'bg-[#2B46FE0D] hover:bg-[#2B46FE0D]': discussion.active }"
      >
        <div class="flex items-center">
          <div class="h-8 w-8 flex items-center justify-center rounded-full bg-[#2B46FE1A] text-[#2B46FE]">
            <Icon icon="carbon:group" />
          </div>
          <span class="ml-3 text-sm font-medium" :class="discussion.active ? 'text-[#2B46FE]' : 'text-gray-700'">
            {{ discussion.name }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{{ discussion.count }}人</span>
          <Icon
            icon="carbon:chevron-right"
            class="text-sm text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600"
          />
        </div>

        <div v-if="discussion.active" class="absolute left-0 top-0 h-full w-1 bg-[#2B46FE]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discussion-panel {
  transition: box-shadow 0.2s ease;
}

.discussion-panel:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.discussion-item {
  transition: all 0.2s ease;
}
</style>
