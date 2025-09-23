<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NButton, NSelect, NTag } from 'naive-ui';
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
  bgColor: string;
}

// 学习分析标签
const analysisTagOptions: Record<string, TagOption[]> = {
  基础层: [
    { label: '基础薄弱', value: '基础薄弱', color: '#4161fe', bgColor: '#edf1ff' },
    { label: '计算需加强', value: '计算需加强', color: '#ff9f43', bgColor: '#fff8ee' },
    { label: '几何优势', value: '几何优势', color: '#a259ff', bgColor: '#f7f0ff' }
  ],
  提高层: [
    { label: '稳定中等', value: '稳定中等', color: '#4161fe', bgColor: '#edf1ff' },
    { label: '应用题优势', value: '应用题优势', color: '#ff9f43', bgColor: '#fff8ee' },
    { label: '代数需加强', value: '代数需加强', color: '#a259ff', bgColor: '#f7f0ff' }
  ],
  拓展层: [
    { label: '逻辑思维强', value: '逻辑思维强', color: '#4161fe', bgColor: '#edf1ff' },
    { label: '创新思维佳', value: '创新思维佳', color: '#ff9f43', bgColor: '#fff8ee' },
    { label: '全面发展', value: '全面发展', color: '#a259ff', bgColor: '#f7f0ff' }
  ]
};

// 分层统计数据
const layerStats = computed(() => {
  const stats = {
    基础层: 0,
    提高层: 0,
    拓展层: 0
  };

  localStudentData.value.forEach(student => {
    if (student.layer in stats) {
      stats[student.layer as keyof typeof stats] = stats[student.layer as keyof typeof stats] + 1;
    }
  });

  return stats;
});

// 监听show属性变化，初始化数据
watch(
  () => props.show,
  newVal => {
    if (newVal) {
      initLocalData();
    }
  },
  { immediate: true }
);

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

  // 保留新分层中有效的标签
  student.analysisTags = student.analysisTags.filter(tag => tagsInNewLayer.includes(tag));
}

// 处理分析标签点击
function toggleAnalysisTag(student: StudentLayer, tagValue: string) {
  const index = student.analysisTags.indexOf(tagValue);
  if (index !== -1) {
    // 移除标签
    student.analysisTags.splice(index, 1);
  } else {
    // 添加标签 (允许多选)
    student.analysisTags.push(tagValue);
  }
}

// 检查标签是否被选中
function isTagSelected(student: StudentLayer, tagValue: string) {
  return student.analysisTags.includes(tagValue);
}
</script>

<template>
  <div v-if="show" class="modal-wrapper">
    <div class="student-layer-modal modal-card">
      <div class="modal-header">
        <h2 class="modal-title">学生分层管理</h2>
        <div class="layer-stats">
          <div class="stat-item">
            <div class="stat-label">基础层</div>
            <div class="stat-badge basic">{{ layerStats.基础层 }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">提高层</div>
            <div class="stat-badge improve">{{ layerStats.提高层 }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">拓展层</div>
            <div class="stat-badge extension">{{ layerStats.拓展层 }}</div>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="student-columns">
          <div class="student-col w-20">学生姓名</div>
          <div class="student-col w-40">学习分析</div>
          <div class="student-col w-30">作业分层</div>
        </div>

        <div class="student-list">
          <div v-for="(student, index) in localStudentData" :key="index" class="student-row">
            <div class="student-col student-name w-20">
              <span class="student-index">{{ index + 1 }}</span>
              {{ student.name }}
              <span class="student-class">{{ student.className }}</span>
            </div>

            <div class="student-col w-40">
              <div class="analysis-tags">
                <NTag
                  v-for="tagOption in analysisTagOptions[student.layer]"
                  :key="tagOption.value"
                  class="analysis-tag"
                  :class="[isTagSelected(student, tagOption.value) ? 'analysis-tag-selected' : 'analysis-tag-default']"
                  :style="{
                    color: isTagSelected(student, tagOption.value) ? tagOption.color : '#666',
                    backgroundColor: isTagSelected(student, tagOption.value) ? tagOption.bgColor : '#f0f0f0'
                  }"
                  :bordered="false"
                  round
                  size="small"
                  @click="toggleAnalysisTag(student, tagOption.value)"
                >
                  {{ tagOption.label }}
                </NTag>
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
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
  text-align: center;
}

.layer-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.basic {
  background-color: #4161fe;
}

.improve {
  background-color: #ff9f43;
}

.extension {
  background-color: #28c76f;
}

.student-layer-modal {
  width: 100%;
}

.modal-header {
  margin-bottom: 20px;
  position: relative;
}

.table-container {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
}

.student-columns {
  display: flex;
  background-color: #f5f7ff;
  padding: 12px 15px;
  font-weight: 600;
  border-bottom: 1px solid #eaeaea;
  color: #333;
}

.student-list {
  max-height: 400px;
  overflow-y: auto;
}

.student-row {
  display: flex;
  padding: 14px 15px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  transition: all 0.2s;
}

.student-row:hover {
  background-color: #f9f9f9;
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
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-index {
  width: 22px;
  height: 22px;
  background-color: #f0f3ff;
  color: #4161fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.student-class {
  font-size: 12px;
  color: #999;
  font-weight: normal;
  margin-left: 6px;
}

.analysis-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.analysis-tag) {
  cursor: pointer;
  transition: all 0.2s;
  padding: 2px 10px;
  border-radius: 12px;
  height: auto;
  line-height: 1.5;
}

:deep(.analysis-tag:hover) {
  opacity: 0.85;
  transform: translateY(-1px);
}

:deep(.analysis-tag-selected) {
  font-weight: 500;
}

:deep(.analysis-tag-default) {
  color: #666;
  background-color: #f0f0f0;
}

.modal-footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 16px;
}

:deep(.modal-btn) {
  border-radius: 4px;
  padding: 8px 20px;
  min-width: 100px;
  font-size: 14px;
  transition: all 0.2s;
}

:deep(.cancel-btn) {
  background-color: white;
  border: 1px solid #dcdfe6;
  color: #606266;
}

:deep(.cancel-btn:hover) {
  border-color: #c0c4cc;
  color: #333;
}

:deep(.save-btn) {
  background-color: #4161fe;
  color: white;
  border: 1px solid #4161fe;
}

:deep(.save-btn:hover) {
  background-color: #3152e0;
  border-color: #3152e0;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(65, 97, 254, 0.3);
}

:deep(.n-select) {
  width: 100%;
}

:deep(.n-base-selection) {
  box-shadow: none !important;
  border-color: #dcdfe6 !important;
}

:deep(.n-base-selection:hover) {
  border-color: #4161fe !important;
}

:deep(.n-base-selection-placeholder) {
  color: #999;
}
</style>
