<!-- eslint-disable no-console -->
<!-- eslint-disable vue/no-unused-properties -->
<script setup lang="ts">
import { NButton } from 'naive-ui';

// 定义组件的属性
const props = defineProps<{
  levelType: 'basic' | 'improve' | 'extension'; // 层级类型
  levelName: string; // 层级名称
  labelText: string; // 标签文本（必做/选做）
  count: number; // 题目数量
}>();

// 每个层级对应的颜色类
const levelColorClass = {
  basic: 'basic-level',
  improve: 'improve-level',
  extension: 'extension-level'
};

// 每种题型的示例数据
const questionTypes = {
  basic: [
    { id: 1, name: '知识点巩固题（系统自动配置得分点）' },
    { id: 2, name: '错题强化（含教学生错题本）' },
    { id: 3, name: '基础&样例解答（自动生成表达式）' }
  ],
  improve: [
    { id: 1, name: '跨知识点综合题' },
    { id: 2, name: '思维导图式应用题' },
    { id: 3, name: '合作探究型题目（可用加小组任务）' }
  ],
  extension: [
    { id: 1, name: '真实情境项目题' },
    { id: 2, name: '学科交叉创新题' },
    { id: 3, name: '学术前沿类题目' }
  ]
};

// 添加按钮处理函数
const handleAdd = () => {
  console.log(`添加 ${props.levelName} 题目`);
};
</script>

<template>
  <div class="level-group">
    <!-- 标题栏 -->
    <div class="level-header" :class="levelColorClass[levelType]">
      <div class="level-title-wrapper">
        <span class="level-title">{{ levelName }}</span>
        <span class="level-label">({{ labelText }})</span>
      </div>
      <NButton class="add-btn" :class="`add-btn-${levelType}`" @click="handleAdd">添加</NButton>
    </div>

    <!-- 选择列表 -->
    <div class="question-list">
      <div class="section-title">选择题</div>

      <div
        v-for="question in questionTypes[levelType]"
        :key="question.id"
        class="question-item"
        :class="`${levelColorClass[levelType]}-bg`"
      >
        <div :class="`custom-checkbox ${levelType}-checkbox`">
          <input :id="`${levelType}-${question.id}`" type="checkbox" class="question-checkbox" />
          <span class="checkmark"></span>
        </div>
        <label :for="`${levelType}-${question.id}`" class="question-label">{{ question.name }}</label>
      </div>

      <div class="section-title">填空题</div>
      <div
        v-for="question in questionTypes[levelType]"
        :key="`fill-${question.id}`"
        class="question-item"
        :class="`${levelColorClass[levelType]}-bg`"
      >
        <div :class="`custom-checkbox ${levelType}-checkbox`">
          <input :id="`${levelType}-fill-${question.id}`" type="checkbox" class="question-checkbox" />
          <span class="checkmark"></span>
        </div>
        <label :for="`${levelType}-fill-${question.id}`" class="question-label">{{ question.name }}</label>
      </div>

      <div class="section-title">判断题</div>
      <div
        v-for="question in questionTypes[levelType]"
        :key="`judge-${question.id}`"
        class="question-item"
        :class="`${levelColorClass[levelType]}-bg`"
      >
        <div :class="`custom-checkbox ${levelType}-checkbox`">
          <input :id="`${levelType}-judge-${question.id}`" type="checkbox" class="question-checkbox" />
          <span class="checkmark"></span>
        </div>
        <label :for="`${levelType}-judge-${question.id}`" class="question-label">{{ question.name }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.level-group {
  flex: 1;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.level-title-wrapper {
  display: flex;
  align-items: center;
}

.level-title {
  font-weight: 700;
  font-size: 17px;
  margin-right: 6px;
}

.level-label {
  font-weight: 600;
  font-size: 15px;
}

.basic-level {
  background-color: #edf1ff;
  color: #444;
}

.improve-level {
  background-color: #fff6e9;
  color: #444;
}

.extension-level {
  background-color: #edfbef;
  color: #444;
}

:deep(.add-btn) {
  background-color: white;
  border: 1px solid;
  border-radius: 4px;
  padding: 2px 12px;
  font-size: 12px;
  cursor: pointer;
  min-width: 60px;
  height: auto;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  transition: all 0.2s;
}

:deep(.add-btn-basic) {
  color: #4161fe;
  border-color: #4161fe;
}

:deep(.add-btn-basic:hover) {
  background-color: #f0f3ff;
}

:deep(.add-btn-basic:active) {
  background-color: white;
  border-color: #3051e0;
  color: #3051e0;
  transform: scale(0.98);
  box-shadow: 0 0 0 2px rgba(65, 97, 254, 0.2);
}

:deep(.add-btn-improve) {
  color: #ff9f43;
  border-color: #ff9f43;
}

:deep(.add-btn-improve:hover) {
  background-color: #fff8ee;
}

:deep(.add-btn-improve:active) {
  background-color: white;
  border-color: #e88a2e;
  color: #e88a2e;
  transform: scale(0.98);
  box-shadow: 0 0 0 2px rgba(255, 159, 67, 0.2);
}

:deep(.add-btn-extension) {
  color: #28c76f;
  border-color: #28c76f;
}

:deep(.add-btn-extension:hover) {
  background-color: #f0fbf5;
}

:deep(.add-btn-extension:active) {
  background-color: white;
  border-color: #1eaa5a;
  color: #1eaa5a;
  transform: scale(0.98);
  box-shadow: 0 0 0 2px rgba(40, 199, 111, 0.2);
}

.question-list {
  padding: 12px 15px;
}

.section-title {
  font-weight: 600;
  margin: 12px 0 8px;
  font-size: 13.5px;
  color: #555;
}

.question-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 6px;
}

.basic-level-bg {
  background-color: #edf1ff;
}

.improve-level-bg {
  background-color: #fff6e9;
}

.extension-level-bg {
  background-color: #edfbef;
}

/* 自定义复选框样式 */
.custom-checkbox {
  position: relative;
  display: inline-block;
  height: 18px;
  width: 18px;
  margin-right: 10px;
  margin-top: 2px;
}

.question-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.question-checkbox:checked ~ .checkmark {
  border-width: 0;
}

.question-checkbox:checked ~ .checkmark:after {
  content: '';
  position: absolute;
  display: block;
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 基础层级复选框样式 */
.basic-checkbox .checkmark {
  border-color: #4161fe;
}

.basic-checkbox .question-checkbox:checked ~ .checkmark {
  background-color: #4161fe;
}

/* 提高层级复选框样式 */
.improve-checkbox .checkmark {
  border-color: #ff9f43;
}

.improve-checkbox .question-checkbox:checked ~ .checkmark {
  background-color: #ff9f43;
}

/* 拓展层级复选框样式 */
.extension-checkbox .checkmark {
  border-color: #28c76f;
}

.extension-checkbox .question-checkbox:checked ~ .checkmark {
  background-color: #28c76f;
}

.question-label {
  font-size: 13px;
  color: #444;
  line-height: 1.5;
}
</style>
