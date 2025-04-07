<script setup lang="ts">
import CourseForm from './modules/CourseForm.vue';
import AiChat from './modules/AiChat.vue';
</script>

<template>
  <div class="h-full w-full flex bg-white dark:bg-gray-900">
    <!-- 左侧课程计划表单 -->
    <div class="flex-1 overflow-auto p-4">
      <CourseForm />
    </div>

    <!-- 右侧智能问答 -->
    <div class="w-80 border-l border-gray-200 bg-white lg:w-96 dark:border-gray-700 dark:bg-gray-800">
      <AiChat />
    </div>
  </div>
</template>

<style scoped></style>
