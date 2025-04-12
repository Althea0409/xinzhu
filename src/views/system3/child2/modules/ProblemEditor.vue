<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'ProblemEditor'
});

const problemDescription = ref('');

function handleUpload() {
  // 实现上传附件逻辑
}

function handleSubmit() {
  // 实现提交问题逻辑
}
</script>

<template>
  <div class="problem-editor">
    <h3 class="mb-3 text-sm text-gray-500 font-medium">提出新问题</h3>

    <div class="mb-4">
      <textarea
        v-model="problemDescription"
        placeholder="详细描述您的教学问题..."
        class="min-h-[120px] w-full resize-none border border-gray-200 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 outline-none transition-all focus:border-[#2B46FE] focus:bg-white placeholder:text-gray-400 focus:shadow-sm"
      ></textarea>
    </div>

    <div class="flex items-center justify-between">
      <div>
        <NButton
          quaternary
          class="upload-btn flex items-center border border-gray-200 rounded-md bg-white px-4 py-2 text-gray-600 transition-all hover:bg-gray-50"
          @click="handleUpload"
        >
          <Icon icon="carbon:upload" class="mr-2 text-[#2B46FE]" />
          <span class="text-sm">添加附件</span>
        </NButton>
      </div>

      <div>
        <NButton
          type="primary"
          class="submit-btn rounded-full border-none bg-[#2B46FE] px-8 py-2 text-sm text-white font-medium shadow-sm transition-all hover:bg-[#233dd3] hover:shadow"
          @click="handleSubmit"
        >
          发布问题
        </NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea::placeholder {
  opacity: 0.7;
}

.upload-btn {
  position: relative;
  overflow: hidden;
}

.upload-btn:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(43, 70, 254, 0.05);
  border-radius: 0.375rem;
}
</style>
