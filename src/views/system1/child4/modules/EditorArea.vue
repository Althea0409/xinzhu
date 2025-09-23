<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'EditorArea'
});

const currentTeachers = ref('正在协作：李老师（编辑中）、王老师（查看中）');
const editorContent = ref('');
</script>

<template>
  <div class="editor-area border border-gray-100 rounded-lg bg-white">
    <!-- 编辑状态栏 -->
    <div class="border-b border-gray-200 px-5 py-3">
      <div class="text-sm text-gray-500">{{ currentTeachers }}</div>
    </div>

    <!-- 编辑区域 -->
    <div class="p-5">
      <textarea
        v-model="editorContent"
        placeholder="在此输入教案内容..."
        class="min-h-[500px] w-full resize-none text-gray-800 outline-none"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
textarea::placeholder {
  color: #9ca3af;
}
</style>
