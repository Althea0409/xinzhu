<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCard } from 'naive-ui';

defineOptions({
  name: 'AiAssistant'
});

const suggestions = ref([
  {
    id: '1',
    text: '建议过渡语句："下下来我们将通过一个实验案例..."'
  }
]);
</script>

<template>
  <NCard class="ai-assistant">
    <div class="mb-4 flex items-center">
      <div class="mr-2 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100">
        <div class="text-xs text-blue-600 font-bold">A</div>
      </div>
      <h3 class="text-gray-800 font-medium">AI教学助手</h3>
    </div>

    <div class="mb-4 rounded-lg bg-blue-50 p-4">
      <div class="border-l-2 border-blue-400 pl-3">
        <p class="text-sm text-gray-700">{{ suggestions[0].text }}</p>
      </div>
    </div>

    <NButton class="w-full bg-blue-50 text-center text-blue-600 hover:bg-blue-100" @click="() => {}">
      生成课堂活动
    </NButton>
  </NCard>
</template>

<style scoped>
.ai-assistant {
  min-height: 200px;
}
</style>
