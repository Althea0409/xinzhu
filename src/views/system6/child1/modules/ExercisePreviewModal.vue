<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NButton, NCollapse, NCollapseItem, NModal, NSelect, NSpace, NTag } from 'naive-ui';
import type { ExerciseSet } from '../types';

// 接收从父组件传递的props
const props = defineProps<{
  show: boolean;
  exerciseSet: ExerciseSet | null;
}>();

// 发送事件到父组件
const emit = defineEmits<{
  // 关闭模态框事件
  (e: 'update:show', value: boolean): void;
}>();

// 本地状态
const activeQuestionIndex = ref(0);
const showAnswer = ref(false);
const selectedType = ref<string | null>(null);

// 计算属性：根据选中的题型过滤题目
const filteredQuestions = computed(() => {
  if (!props.exerciseSet) return [];
  if (!selectedType.value) return props.exerciseSet.questions;
  return props.exerciseSet.questions.filter(q => q.type === selectedType.value);
});

// 当前选中的题目
const currentQuestion = computed(() => {
  return filteredQuestions.value[activeQuestionIndex.value] || null;
});

// 获取去重后的题型列表
const questionTypes = computed(() => {
  if (!props.exerciseSet) return [];
  const types = new Set(props.exerciseSet.questions.map(q => q.type));
  return Array.from(types);
});

// 重置状态
const resetState = () => {
  activeQuestionIndex.value = 0;
  showAnswer.value = false;
  selectedType.value = null;
};

// 导航到下一题
const nextQuestion = () => {
  if (activeQuestionIndex.value < filteredQuestions.value.length - 1) {
    activeQuestionIndex.value += 1;
  }
};

// 导航到上一题
const prevQuestion = () => {
  if (activeQuestionIndex.value > 0) {
    activeQuestionIndex.value -= 1;
  }
};

// 切换显示答案
const toggleAnswer = () => {
  showAnswer.value = !showAnswer.value;
};

// 选择题型变化时，重置当前题目索引
watch(selectedType, () => {
  activeQuestionIndex.value = 0;
});

// 关闭模态框
const closeModal = () => {
  resetState();
  emit('update:show', false);
};

// 监听show属性变化
watch(
  () => props.show,
  newVal => {
    if (!newVal) {
      resetState();
    }
  }
);

// 格式化题目编号，根据题型添加前缀
const formatQuestionNumber = (index: number) => {
  return `Q${index + 1}`;
};

// 获取题型标签颜色 - 全部改为primary
const getTypeColor = () => {
  return 'primary';
};

// 获取难度标签颜色
const getDifficultyColor = (difficulty: string) => {
  const difficultyColorMap: Record<string, string> = {
    简单: 'success',
    中等: 'warning',
    困难: 'error'
  };
  return difficultyColorMap[difficulty] || 'default';
};
</script>

<template>
  <!-- ESLint禁用规则: 允许静态行内样式，因为这是模态框宽度的唯一控制点 -->
  <!-- eslint-disable vue/no-static-inline-styles -->
  <NModal
    :show="show"
    preset="card"
    style="width: 800px; --n-title-font-size: 0"
    :title="null"
    :mask-closable="false"
    :closable="true"
    @close="closeModal"
    @update:show="emit('update:show', $event)"
  >
    <template #header>
      <div class="modal-header">
        <h2 class="preview-title text-[#2b46fe]">练习题预览</h2>
      </div>
    </template>
    <!-- eslint-enable vue/no-static-inline-styles -->

    <div v-if="!exerciseSet" class="empty-state">暂无练习题数据</div>

    <div v-else class="exercise-preview-container">
      <div class="pagination-container">
        <div v-if="filteredQuestions.length > 0" class="pagination-info">
          {{ activeQuestionIndex + 1 }} / {{ filteredQuestions.length }}
        </div>
      </div>

      <div class="exercise-filter">
        <div class="filter-row w-1">
          <NSelect
            v-model:value="selectedType"
            clearable
            size="small"
            placeholder="筛选题型"
            :options="
              questionTypes.map(type => ({
                label: type,
                value: type
              }))
            "
            class="type-select"
          />
        </div>
      </div>

      <div v-if="filteredQuestions.length === 0" class="empty-state">没有符合筛选条件的题目</div>

      <div v-else-if="currentQuestion" class="question-display">
        <div class="question-content">
          <div class="question-header">
            <div class="question-type">
              <NTag :type="getTypeColor()">{{ currentQuestion.type }}</NTag>
              <NTag :type="getDifficultyColor(currentQuestion.difficulty)">{{ currentQuestion.difficulty }}</NTag>
            </div>
          </div>

          <div class="flex-content">
            <div class="flex items-baseline">
              <div class="question-number">{{ formatQuestionNumber(activeQuestionIndex) }}.</div>
              <div>{{ currentQuestion.content }}</div>
            </div>

            <div v-if="currentQuestion.type === '选择题'" class="options-grid mt-4">
              <div v-for="(option, index) in currentQuestion.options" :key="index" class="option-item">
                <div class="flex">
                  <div class="option-label mr-2">{{ String.fromCharCode(65 + index) }}.</div>
                  <div>{{ option }}</div>
                </div>
              </div>
            </div>

            <div v-else-if="currentQuestion.type === '判断题'" class="judge-options mt-4">
              <NSpace>
                <NTag type="primary">对</NTag>
                <NTag type="primary">错</NTag>
              </NSpace>
            </div>

            <div v-else-if="currentQuestion.type === '填空题'" class="fill-blank mt-4">
              <div v-for="(_, index) in currentQuestion.content.match(/___/g) || []" :key="index" class="blank-line">
                <div class="flex items-center">
                  <div class="blank-number mr-2">空{{ index + 1 }}:</div>
                  <div class="blank-placeholder h-6 w-32 rounded bg-gray-100"></div>
                </div>
              </div>
            </div>

            <div
              v-if="currentQuestion.knowledgePoints && currentQuestion.knowledgePoints.length > 0"
              class="knowledge-points mt-4"
            >
              <div class="mb-1 text-sm text-gray-500">知识点:</div>
              <NSpace>
                <NTag
                  v-for="(point, index) in currentQuestion.knowledgePoints"
                  :key="index"
                  size="small"
                  type="primary"
                >
                  {{ point }}
                </NTag>
              </NSpace>
            </div>
          </div>
        </div>

        <div class="question-actions">
          <NSpace>
            <NButton size="small" :disabled="activeQuestionIndex === 0" @click="prevQuestion">上一题</NButton>
            <NButton
              size="small"
              :disabled="activeQuestionIndex === filteredQuestions.length - 1"
              @click="nextQuestion"
            >
              下一题
            </NButton>
          </NSpace>
          <NButton size="small" type="primary" @click="toggleAnswer">
            {{ showAnswer ? '隐藏答案' : '查看答案' }}
          </NButton>
        </div>

        <NCollapse v-if="showAnswer">
          <NCollapseItem title="答案与解析" name="answer">
            <div class="answer-section">
              <div class="answer-title">标准答案:</div>
              <div class="answer-content">{{ currentQuestion.answer }}</div>

              <div v-if="currentQuestion.analysis" class="analysis-section">
                <div class="analysis-title">解析:</div>
                <!-- ESLint禁用规则: 允许v-html用于显示格式化的解析内容 -->
                <!-- eslint-disable vue/no-v-html -->
                <div class="analysis-content" v-html="currentQuestion.analysis"></div>
                <!-- eslint-enable vue/no-v-html -->
              </div>
            </div>
          </NCollapseItem>
        </NCollapse>
      </div>
    </div>
  </NModal>
</template>

<style scoped>
.preview-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #2b46fe;
}

.exercise-preview-container {
  display: flex;
  flex-direction: column;
  min-height: 400px;
  padding: 0;
  position: relative;
}

.pagination-container {
  position: absolute;
  top: 6px;
  right: 10px;
  z-index: 10;
}

.pagination-info {
  font-size: 14px;
  font-weight: 500;
  color: #4161fe;
  background-color: #f5f7ff;
  padding: 4px 16px;
  border-radius: 20px;
  border: 1px solid #e8eeff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(65, 97, 254, 0.1);
}

.exercise-filter {
  margin-bottom: 0;
  padding-top: 1px;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  margin-bottom: 8px;
  position: relative;
}

.question-display {
  padding: 0;
  position: relative;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.question-type {
  display: flex;
  align-items: center;
  gap: 10px;
}

.question-number {
  color: #4161fe;
  font-weight: bold;
  font-size: 16px;
  min-width: 35px;
}

.question-content {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  background-color: #fdfdfd;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.option-item {
  padding: 8px 12px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.option-label {
  font-weight: 500;
  color: #666;
}

.question-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 16px;
}

.answer-section {
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.answer-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: #4161fe;
}

.answer-content {
  margin-bottom: 16px;
}

.analysis-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: #28c76f;
}

.analysis-content {
  line-height: 1.6;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #999;
  font-size: 14px;
}

/* 移动关闭按钮样式 */
:deep(.n-card__action) {
  display: none;
}

/* UnoCSS 工具类兼容 */
.mb-4 {
  margin-bottom: 0 !important;
}

.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}

.mr-2 {
  margin-right: 8px;
}

.flex {
  display: flex;
}

.flex-content {
  margin-top: 8px;
}

.items-baseline {
  align-items: baseline;
}

.font-bold {
  font-weight: bold;
}

.text-primary {
  color: #4161fe;
}

.text-sm {
  font-size: 14px;
}

.text-gray-500 {
  color: #718096;
}

.w-32 {
  width: 128px;
}

.h-6 {
  height: 24px;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.rounded {
  border-radius: 4px;
}

:deep(.n-card__content) {
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.n-modal-body-wrapper) {
  margin-top: 0 !important;
}

:deep(.n-divider) {
  display: none;
}

:deep(.n-card-header) {
  padding: 6px 16px;
  border-bottom: 1px solid #eaeaea;
}

:deep(.n-card-header__main) {
  width: 100%;
}

:deep(.n-select) {
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.type-select {
  min-width: 200px;
  margin-top: 5px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
}

:deep(.n-modal-close) {
  top: 14px;
  right: 14px;
  width: 24px;
  height: 24px;
  font-size: 18px;
  color: #666;
  transition: all 0.2s;
  z-index: 100;
}

:deep(.n-modal-close:hover) {
  color: #f44336;
  transform: scale(1.1);
}
</style>
