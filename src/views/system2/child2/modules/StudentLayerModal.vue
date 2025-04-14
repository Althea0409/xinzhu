<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NSelect } from 'naive-ui';
import type { StudentLayer } from '../types';

const props = defineProps<{
  show: boolean;
  studentData: StudentLayer[];
}>();

const emit = defineEmits<{
  'update:show': [value: boolean];
  save: [layers: StudentLayer[]];
}>();

// 创建一个深拷贝的学生数据，用于编辑
const localStudentData = ref<StudentLayer[]>([]);

// 分层选项
const layerOptions = [
  { label: '基础层', value: '基础层' },
  { label: '提高层', value: '提高层' },
  { label: '拓展层', value: '拓展层' }
];

// 标签选项类型
interface TagOption {
  label: string;
  value: string;
  color: string;
}

// 学习分析标签
const analysisTagOptions: Record<string, TagOption[]> = {
  基础层: [
    { label: '基础薄弱', value: '基础薄弱', color: '#8cc5ff' },
    { label: '计算需加强', value: '计算需加强', color: '#ffd591' },
    { label: '几何优势', value: '几何优势', color: '#d3adf7' }
  ],
  提高层: [
    { label: '稳定中等', value: '稳定中等', color: '#8cc5ff' },
    { label: '应用题优势', value: '应用题优势', color: '#ffd591' },
    { label: '代数需加强', value: '代数需加强', color: '#d3adf7' }
  ],
  拓展层: [
    { label: '逻辑思维强', value: '逻辑思维强', color: '#8cc5ff' },
    { label: '创新思维佳', value: '创新思维佳', color: '#ffd591' },
    { label: '全面发展', value: '全面发展', color: '#d3adf7' }
  ]
};

// 初始化组件时加载数据
if (props.show) {
  initLocalData();
}

// 初始化本地数据
function initLocalData() {
  localStudentData.value = JSON.parse(JSON.stringify(props.studentData));
}

// 关闭弹窗
function handleClose() {
  emit('update:show', false);
}

// 保存分层设置
function handleSave() {
  emit('save', localStudentData.value);
  handleClose();
  if (window.$message) {
    window.$message.success('学生分层保存成功！');
  }
}

// 当学生分层变化时，更新学习分析标签选项
function handleLayerChange(student: StudentLayer) {
  // 确保学习分析标签在新分层中存在，否则清空
  const tagsInNewLayer = analysisTagOptions[student.layer]?.map((tag: TagOption) => tag.value) || [];

  // 如果当前标签不在新分层的标签列表中，则清空
  if (student.analysisTags && !tagsInNewLayer.includes(student.analysisTags[0])) {
    student.analysisTags = [];
  }
}

// 使用 MessageProvider 中的全局声明
</script>

<template>
  <div v-if="show" class="modal-wrapper">
    <div class="student-layer-modal modal-card">
      <div class="modal-header">
        <h2 class="modal-title">学生分层管理</h2>
        <div class="student-columns">
          <div class="student-col w-20">学生姓名</div>
          <div class="student-col w-40">学习分析</div>
          <div class="student-col w-30">作业分层</div>
        </div>
      </div>

      <div class="student-list">
        <div v-for="(student, index) in localStudentData" :key="index" class="student-row">
          <div class="student-col student-name w-20">{{ student.name }}</div>

          <div class="student-col w-40">
            <div class="analysis-tags">
              <div
                v-for="tag in student.analysisTags"
                :key="tag"
                class="analysis-tag"
                :style="{
                  backgroundColor:
                    analysisTagOptions[student.layer]?.find((t: TagOption) => t.value === tag)?.color + '30',
                  color: analysisTagOptions[student.layer]
                    ?.find((t: TagOption) => t.value === tag)
                    ?.color?.replace('30', '')
                }"
              >
                {{ tag }}
              </div>
            </div>
          </div>

          <div class="student-col w-30">
            <NSelect
              v-model:value="student.layer"
              :options="layerOptions"
              size="small"
              @update:value="() => handleLayerChange(student)"
            />
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <NButton class="cancel-btn modal-btn" @click="handleClose">取消</NButton>
        <NButton class="modal-btn save-btn" type="primary" @click="handleSave">保存</NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  width: 800px;
  max-width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
}

.modal-title {
  margin: 0 0 15px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.student-layer-modal {
  width: 100%;
}

.modal-header {
  margin-bottom: 15px;
}

.student-columns {
  display: flex;
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 10px;
}

.student-row {
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.student-row:last-child {
  border-bottom: none;
}

.student-col {
  padding: 0 8px;
}

.w-20 {
  width: 20%;
}

.w-30 {
  width: 30%;
}

.w-40 {
  width: 40%;
}

.student-name {
  font-weight: 500;
}

.analysis-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.analysis-tag {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 12px;
}

:deep(.modal-btn) {
  border-radius: 4px;
  padding: 6px 16px;
  min-width: 80px;
}

:deep(.cancel-btn) {
  background-color: white;
  border: 1px solid #dcdfe6;
  color: #606266;
}

:deep(.save-btn) {
  background-color: #4161fe;
  color: white;
  border: 1px solid #4161fe;
}

:deep(.save-btn:hover) {
  background-color: #3152e0;
  border-color: #3152e0;
}

:deep(.n-select) {
  width: 100%;
}
</style>
