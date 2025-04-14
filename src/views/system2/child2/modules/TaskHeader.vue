<!-- eslint-disable no-console -->
<script setup lang="ts">
import { NButton } from 'naive-ui';

defineProps<{
  studentLayers: {
    basic: number; // 基础层
    improve: number; // 提高层
    extension: number; // 挑战层
  };
}>();

const emit = defineEmits<{
  adjust: [];
}>();

// 处理上传题库点击事件
const handleUpload = () => {
  console.log('上传题库');
};

// 处理选择题库点击事件
const handleSelect = () => {
  console.log('选择题库');
};

// 处理调整分层点击事件
const handleAdjust = () => {
  emit('adjust');
};
</script>

<template>
  <div class="task-header">
    <div class="header-left">
      <h1 class="page-title">分层作业分发</h1>
      <div class="student-layer-info">
        <div class="layer-card">
          <div class="layer-title">学生分层管理</div>
          <div class="layer-content">
            <div class="layer-counts">
              <span>基础层：{{ studentLayers.basic }}人</span>
              |
              <span></span>
              <span>提高层：{{ studentLayers.improve }}人</span>
              |
              <span></span>
              <span>挑战层：{{ studentLayers.extension }}人</span>
            </div>
            <NButton class="quiz-btn adjust-btn primary-btn" @click="handleAdjust">调整分层</NButton>
          </div>
        </div>
      </div>
    </div>

    <div class="header-right">
      <NButton class="quiz-btn primary-btn" @click="handleUpload">上传题库</NButton>
      <NButton class="quiz-btn primary-btn" @click="handleSelect">选择题库</NButton>
    </div>
  </div>
</template>

<style scoped>
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 10px;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.student-layer-info {
  margin-top: 10px;
}

.layer-card {
  background-color: #3a62ff;
  color: white;
  border-radius: 8px;
  padding: 14px 20px;
  width: 100%;
  max-width: 600px;
}

.layer-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.layer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layer-counts {
  font-size: 13px;
  display: flex;
  align-items: center;
}

.layer-counts span {
  margin-right: 8px;
}

.header-right {
  display: flex;
  gap: 12px;
  margin-top: 5px;
}

:deep(.quiz-btn) {
  border-radius: 4px;
  font-size: 14px;
  padding: 8px 16px;
  height: auto;
  line-height: 1.2;
  transition: all 0.2s;
  border-radius: 25px;
  min-width: 80px;
  text-align: center;
}

:deep(.outline-btn) {
  background-color: white;
  border: 1px solid #dcdfe6;
  color: #333;
}

:deep(.outline-btn:hover) {
  border-color: #4161fe;
  color: #4161fe;
}

:deep(.primary-btn) {
  background-color: white;
  color: #4161fe;
  border: 1px solid #4161fe;
}

:deep(.primary-btn:hover) {
  background-color: #f0f3ff;
}

:deep(.primary-btn:active) {
  background-color: white;
  border-color: #3051e0;
  color: #3051e0;
  transform: scale(0.98);
  box-shadow: 0 0 0 2px rgba(65, 97, 254, 0.2);
}

:deep(.adjust-btn) {
  margin-left: 10px;
  flex-shrink: 0;
  padding: 5px 12px;
  font-size: 13px;
  min-width: 70px;
}

/* 添加下拉框样式，模仿图片中显示的样式 */
:deep(.n-select .n-base-selection) {
  border-radius: 4px;
  height: auto;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  transition: all 0.2s;
  padding: 6px 10px;
  box-shadow: none;
}

:deep(.n-select .n-base-selection-label) {
  font-size: 14px;
  color: #333;
}

:deep(.n-select:hover .n-base-selection) {
  border-color: #4161fe;
}

:deep(.n-select:focus-within .n-base-selection),
:deep(.n-select.n-select--focus .n-base-selection) {
  border-color: #4161fe;
  box-shadow: 0 0 0 2px rgba(65, 97, 254, 0.2);
}

:deep(.n-select-menu) {
  border-radius: 4px;
  padding: 0;
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.n-select-menu .n-base-select-option) {
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

:deep(.n-select-menu .n-base-select-option--selected) {
  color: #4161fe;
  font-weight: 500;
  background-color: #f0f3ff;
}

:deep(.n-select-menu .n-base-select-option:hover) {
  background-color: #f5f7ff;
}

:deep(.n-select-menu .n-base-select-option__check) {
  color: #4161fe;
}

:deep(.n-base-select-option__check svg) {
  fill: #4161fe;
}
</style>
