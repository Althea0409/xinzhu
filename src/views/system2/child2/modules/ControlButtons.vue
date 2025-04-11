<!-- eslint-disable no-console -->
<script setup lang="ts">
import { NButton } from 'naive-ui';

// 按钮点击事件处理
const handleGenerate = () => {
  console.log('生成题目');
};

const handlePublish = () => {
  console.log('发布题目');
};

const handlePreview = () => {
  console.log('学生视角预览');
};
</script>

<template>
  <div class="control-buttons">
    <NButton class="control-btn generate-btn" @click="handleGenerate">生成题目</NButton>

    <NButton class="control-btn publish-btn" @click="handlePublish">发布题目</NButton>

    <NButton class="control-btn preview-btn" @click="handlePreview">学生视角预览</NButton>
  </div>
</template>

<style scoped>
.control-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding-bottom: 30px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}

:deep(.control-btn) {
  border-radius: 25px;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  min-width: 110px;
  transition: all 0.2s;
  height: auto;
  line-height: 1.5;
  background-color: white;
  color: #4161fe;
  border: 1px solid #4161fe;
  padding: 8px 16px;
}

:deep(.control-btn:hover) {
  background-color: #f0f3ff;
}

:deep(.control-btn:active) {
  background-color: white;
  border-color: #3051e0;
  color: #3051e0;
  transform: scale(0.98);
  box-shadow: 0 0 0 2px rgba(65, 97, 254, 0.2);
}

:deep(.n-button__content) {
  white-space: nowrap;
}
</style>
