<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'IntelligentFeedback'
});

const feedbackItems = ref([
  { id: '1', icon: 'carbon:notification-new', content: '您主注的《差异化教学》新增8个讨论' },
  { id: '2', icon: 'carbon:growth', content: '推荐提升：课堂互动技巧' }
]);

function handleCreateEvaluationForm() {
  // 实现创建评估表的逻辑
}
</script>

<template>
  <div class="intelligent-feedback mt-5 rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center">
        <Icon icon="carbon:analytics" class="mr-2 text-xl text-[#2B46FE]" />
        <h3 class="text-base text-gray-800 font-medium">智能简报</h3>
      </div>
      <div class="text-xs text-gray-400">今日更新</div>
    </div>

    <div class="space-y-4">
      <div
        v-for="item in feedbackItems"
        :key="item.id"
        class="feedback-item rounded-lg bg-gray-50 p-3 transition-all hover:bg-[#2B46FE0D]"
      >
        <div class="flex items-start">
          <div class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-[#2B46FE1A] text-[#2B46FE]">
            <Icon :icon="item.icon" />
          </div>
          <div>
            <p class="text-sm text-gray-700 leading-snug">{{ item.content }}</p>
            <div class="mt-1.5 cursor-pointer text-xs text-[#2B46FE] hover:underline">查看详情</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <NButton
        class="w-full border border-[#2B46FE] rounded-full bg-transparent py-1.5 text-sm text-[#2B46FE] font-medium transition-all hover:bg-[#2B46FE0D]"
        @click="handleCreateEvaluationForm"
      >
        <Icon icon="carbon:add" class="mr-1" />
        创建评估表
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.feedback-item {
  position: relative;
  overflow: hidden;
}

.feedback-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, #2b46fe, #828fff);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.feedback-item:hover::before {
  opacity: 1;
}
</style>
