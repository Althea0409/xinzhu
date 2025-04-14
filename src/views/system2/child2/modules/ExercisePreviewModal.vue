<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NDivider,
  NInput,
  NList,
  NListItem,
  NModal,
  NRadio,
  NRadioGroup,
  NSpace,
  NTabPane,
  NTabs,
  NTag
} from 'naive-ui';
import type { ExerciseQuestion, ExerciseSet } from '../types';

// 接收父组件传递的props
const props = defineProps<{
  show: boolean;
  exerciseSet?: ExerciseSet;
}>();

// 展示/隐藏模态框的状态
const emit = defineEmits<{
  'update:show': [value: boolean];
}>();

// 当前查看的题目索引
const currentQuestionIndex = ref(0);

// 模态框关闭
function closeModal() {
  emit('update:show', false);
}

// 当前查看的题目
const currentQuestion = computed(() => {
  if (!props.exerciseSet || !props.exerciseSet.questions.length) return null;
  return props.exerciseSet.questions[currentQuestionIndex.value];
});

// 显示题目导航索引
const questionNavigation = computed<Record<string, ExerciseQuestion[]>>(() => {
  if (!props.exerciseSet) return {};

  // 根据题目类型分组
  const questionTypes = ['选择题', '填空题', '判断题', '简答题', '综合题'];
  const grouped: Record<string, ExerciseQuestion[]> = {};

  // 初始化分组
  questionTypes.forEach(type => {
    grouped[type] = [];
  });

  props.exerciseSet.questions.forEach((q: ExerciseQuestion) => {
    if (grouped[q.type]) {
      grouped[q.type].push(q);
    }
  });

  return grouped;
});

// 所有题目类型
const allQuestionTypes = computed(() => {
  if (!props.exerciseSet) return [];
  const types = new Set(props.exerciseSet.questions.map((q: ExerciseQuestion) => q.type));
  return Array.from(types);
});

// 切换到指定的题目
function goToQuestion(index: number) {
  if (index >= 0 && props.exerciseSet && index < props.exerciseSet.questions.length) {
    currentQuestionIndex.value = index;
  }
}

// 获取题目在整个题集中的索引
function getQuestionIndex(type: string, typeIndex: number): number {
  if (!props.exerciseSet) return -1;

  let count = 0;
  for (const q of props.exerciseSet.questions) {
    if (q.type === type) {
      if (count === typeIndex) {
        return props.exerciseSet.questions.indexOf(q);
      }
      count += 1;
    }
  }

  return -1;
}

// 获取难度标签的类型
function getDifficultyType(difficulty: string): 'success' | 'warning' | 'error' {
  if (difficulty === '简单') return 'success';
  if (difficulty === '中等') return 'warning';
  return 'error';
}

// 是否显示答案分析
const showAnswer = ref(false);

// 切换显示答案
function toggleAnswer() {
  showAnswer.value = !showAnswer.value;
}

// 获取当前在查看的题目类型的总数
function getTypeCount(type: string): number {
  if (!props.exerciseSet) return 0;
  return props.exerciseSet.questions.filter((q: ExerciseQuestion) => q.type === type).length;
}

// 获取当前题型索引
function getCurrentTypeIndex(type: string): number {
  if (!props.exerciseSet || !currentQuestion.value) return -1;
  if (currentQuestion.value.type !== type) return -1;

  let count = 0;
  for (let i = 0; i < currentQuestionIndex.value; i += 1) {
    if (props.exerciseSet.questions[i].type === type) {
      count += 1;
    }
  }

  return count;
}
</script>

<template>
  <!-- ESLint禁用规则: 允许静态行内样式，因为这是模态框宽度的唯一控制点 -->
  <!-- eslint-disable vue/no-static-inline-styles -->
  <NModal
    :show="show"
    preset="card"
    style="width: 800px"
    title="练习题预览"
    :mask-closable="false"
    @close="closeModal"
    @update:show="emit('update:show', $event)"
  >
    <template #header>
      <div class="modal-header">
        <h3 v-if="exerciseSet">{{ exerciseSet.title }}</h3>
        <div v-if="exerciseSet" class="target-layer">
          适用层级：
          <NTag
            :type="
              exerciseSet.targetLayer === '基础层'
                ? 'success'
                : exerciseSet.targetLayer === '提高层'
                  ? 'warning'
                  : 'error'
            "
          >
            {{ exerciseSet.targetLayer }}
          </NTag>
        </div>
      </div>
    </template>
    <!-- eslint-enable vue/no-static-inline-styles -->

    <div v-if="!exerciseSet" class="empty-state">暂无练习题数据</div>

    <div v-else class="exercise-preview-container">
      <div class="exercise-navigation">
        <NTabs type="line" animated>
          <NTabPane v-for="type in allQuestionTypes" :key="type" :name="type" :tab="type">
            <NList>
              <NListItem v-for="(q, idx) in questionNavigation[type]" :key="q.id">
                <div
                  class="nav-item"
                  :class="{ active: currentQuestion && currentQuestion.id === q.id }"
                  @click="goToQuestion(getQuestionIndex(type, idx))"
                >
                  <span>{{ idx + 1 }}</span>
                  <NTag size="small" :type="getDifficultyType(q.difficulty)">{{ q.difficulty }}</NTag>
                </div>
              </NListItem>
            </NList>
          </NTabPane>
        </NTabs>
      </div>

      <NDivider />

      <div v-if="currentQuestion" class="question-display">
        <div class="question-header">
          <div class="question-type">
            <NTag>{{ currentQuestion.type }}</NTag>
            <span class="question-number">
              {{ getCurrentTypeIndex(currentQuestion.type) + 1 }}/{{ getTypeCount(currentQuestion.type) }}
            </span>
          </div>
          <NTag :type="getDifficultyType(currentQuestion.difficulty)">{{ currentQuestion.difficulty }}</NTag>
        </div>

        <div class="question-content">
          <!-- ESLint禁用规则: 允许v-html用于显示格式化的题目内容 -->
          <!-- eslint-disable vue/no-v-html -->
          <div v-html="currentQuestion.content"></div>
          <!-- eslint-enable vue/no-v-html -->

          <!-- 选择题 -->
          <NRadioGroup v-if="currentQuestion.type === '选择题' && currentQuestion.options" class="options-group">
            <div v-for="(option, index) in currentQuestion.options" :key="index" class="option-item">
              <NRadio :value="String.fromCharCode(65 + index)">
                {{ String.fromCharCode(65 + index) }}. {{ option }}
              </NRadio>
            </div>
          </NRadioGroup>

          <!-- 判断题 -->
          <div v-if="currentQuestion.type === '判断题'" class="judge-options">
            <NRadioGroup>
              <NSpace>
                <NRadio value="true">正确</NRadio>
                <NRadio value="false">错误</NRadio>
              </NSpace>
            </NRadioGroup>
          </div>

          <!-- 填空题 -->
          <div v-if="currentQuestion.type === '填空题'" class="fill-blank">
            <div v-for="i in 3" :key="i" class="blank-line">
              <NInput placeholder="请在此处填写答案" />
            </div>
          </div>
        </div>

        <div class="question-actions">
          <NButton type="primary" ghost @click="toggleAnswer">
            {{ showAnswer ? '隐藏答案' : '查看答案' }}
          </NButton>
          <NSpace>
            <NButton :disabled="currentQuestionIndex <= 0" @click="goToQuestion(currentQuestionIndex - 1)">
              上一题
            </NButton>
            <NButton
              :disabled="!exerciseSet || currentQuestionIndex >= exerciseSet.questions.length - 1"
              @click="goToQuestion(currentQuestionIndex + 1)"
            >
              下一题
            </NButton>
          </NSpace>
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

    <template #footer>
      <div class="modal-footer">
        <NButton @click="closeModal">关闭</NButton>
      </div>
    </template>
  </NModal>
</template>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.target-layer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.exercise-preview-container {
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.exercise-navigation {
  margin-bottom: 16px;
}

.nav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: rgba(65, 97, 254, 0.1);
}

.nav-item.active {
  background-color: rgba(65, 97, 254, 0.2);
}

.question-display {
  margin-top: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.question-type {
  display: flex;
  align-items: center;
  gap: 10px;
}

.question-number {
  font-size: 14px;
  color: #666;
}

.question-content {
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 1.6;
}

.options-group {
  margin-top: 16px;
}

.option-item {
  margin-bottom: 12px;
}

.judge-options {
  margin-top: 16px;
}

.fill-blank {
  margin-top: 16px;
}

.blank-line {
  margin-bottom: 12px;
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
  height: 200px;
  color: #999;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
