<script setup lang="ts">
import { reactive, ref } from 'vue';
import ControlButtons from './modules/ControlButtons.vue';
import LevelGroup from './modules/LevelGroup.vue';
import TaskHeader from './modules/TaskHeader.vue';

// 学生分层数据
const studentLayers = ref({
  basic: 20, // 基础层
  improve: 15, // 提高层
  extension: 10 // 拓展层
});

// 各区域题目数量
const questionCounts = ref({
  basic: 5,
  improve: 4,
  extension: 5,
  comprehensive: 4
});

// 下拉选项
const countOptions = [
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 }
];

// 题目生成算法参数
const generationParams = reactive({
  coverageRate: 85, // 知识点覆盖率
  difficultyDistribution: {
    basic: { easy: 60, medium: 30, hard: 10 }, // 基础层题目难度分布
    improve: { easy: 30, medium: 50, hard: 20 }, // 提高层题目难度分布
    extension: { easy: 10, medium: 40, hard: 50 } // 拓展层题目难度分布
  },
  questionTypes: {
    choice: '选择题', // 选择题
    fill: '填空题', // 填空题
    judge: '判断题', // 判断题
    comprehensive: '综合题' // 综合题
  },
  algorithms: {
    basic: '基于核心知识点分布自动生成',
    improve: '基于学生易错点和关联知识点生成',
    extension: '基于知识应用和创新能力生成'
  }
});

// 生成的题目分析数据
const analysisData = reactive({
  knowledgePoints: {
    covered: 42, // 已覆盖知识点
    total: 50, // 总知识点
    distribution: [
      { name: '数与代数', value: 35 },
      { name: '几何与测量', value: 30 },
      { name: '统计与概率', value: 20 },
      { name: '综合应用', value: 15 }
    ]
  },
  difficulty: {
    average: 3.6, // 平均难度 (1-5)
    distribution: [
      { name: '容易', value: 30 },
      { name: '适中', value: 45 },
      { name: '困难', value: 25 }
    ]
  },
  cognitive: {
    distribution: [
      { name: '知识记忆', value: 20 },
      { name: '理解应用', value: 45 },
      { name: '分析综合', value: 25 },
      { name: '评价创造', value: 10 }
    ]
  }
});

// 显示/隐藏分析面板
const showAnalysis = ref(false);

// 切换分析面板显示状态
const toggleAnalysis = () => {
  showAnalysis.value = !showAnalysis.value;
};

// 获取图表条形图的颜色
function getBarColor(index: number) {
  const colors = ['#4161fe', '#ff9f43', '#28c76f', '#7367f0'];
  return colors[index % colors.length];
}
</script>

<template>
  <div class="task-layout-container">
    <!-- 页面标题和操作区 -->
    <TaskHeader :student-layers="studentLayers" />

    <!-- 题型组合区域 -->
    <div class="question-group-section">
      <div class="group-title-wrapper">
        <div class="title-indicator"></div>
        <h3 class="group-title">题型组合</h3>
        <div class="algorithm-info" @click="toggleAnalysis">
          <i class="algorithm-icon">i</i>
          <span>智能推荐</span>
        </div>
      </div>

      <div class="question-selectors">
        <div class="question-type">
          <div class="type-name">选择</div>
          <NSelect v-model:value="questionCounts.basic" :options="countOptions" />
        </div>

        <div class="question-type">
          <div class="type-name">填空</div>
          <NSelect v-model:value="questionCounts.improve" :options="countOptions" />
        </div>

        <div class="question-type">
          <div class="type-name">判断</div>
          <NSelect v-model:value="questionCounts.extension" :options="countOptions" />
        </div>

        <div class="question-type">
          <div class="type-name">综合题</div>
          <NSelect v-model:value="questionCounts.comprehensive" :options="countOptions" />
        </div>
      </div>

      <!-- 算法分析面板 -->
      <div v-if="showAnalysis" class="analysis-panel">
        <div class="analysis-header">
          <h4>智能题目生成分析</h4>
          <span class="analysis-close" @click="toggleAnalysis">×</span>
        </div>

        <div class="analysis-content">
          <div class="analysis-section">
            <h5>知识点覆盖分析</h5>
            <div class="coverage-info">
              <div class="coverage-progress">
                <div
                  class="progress-bar"
                  :style="{
                    width: `${(analysisData.knowledgePoints.covered / analysisData.knowledgePoints.total) * 100}%`
                  }"
                ></div>
              </div>
              <div class="coverage-text">
                覆盖率:
                {{ Math.round((analysisData.knowledgePoints.covered / analysisData.knowledgePoints.total) * 100) }}%
              </div>
            </div>

            <div class="distribution-chart">
              <div v-for="(item, index) in analysisData.knowledgePoints.distribution" :key="index" class="chart-bar">
                <div class="bar-label">{{ item.name }}</div>
                <div class="bar-container">
                  <div class="bar-fill" :style="{ width: `${item.value}%`, backgroundColor: getBarColor(index) }"></div>
                </div>
                <div class="bar-value">{{ item.value }}%</div>
              </div>
            </div>
          </div>

          <div class="analysis-section">
            <h5>难度分布</h5>
            <div class="difficulty-info">
              <div class="difficulty-levels">
                <div v-for="(level, index) in ['基础层', '提高层', '拓展层']" :key="index" class="difficulty-level">
                  <div class="level-name">{{ level }}</div>
                  <div class="level-bars">
                    <div
                      class="level-bar easy"
                      :style="{
                        width: `${generationParams.difficultyDistribution[index === 0 ? 'basic' : index === 1 ? 'improve' : 'extension'].easy}%`
                      }"
                    ></div>
                    <div
                      class="level-bar medium"
                      :style="{
                        width: `${generationParams.difficultyDistribution[index === 0 ? 'basic' : index === 1 ? 'improve' : 'extension'].medium}%`
                      }"
                    ></div>
                    <div
                      class="level-bar hard"
                      :style="{
                        width: `${generationParams.difficultyDistribution[index === 0 ? 'basic' : index === 1 ? 'improve' : 'extension'].hard}%`
                      }"
                    ></div>
                  </div>
                  <div class="level-legend">
                    <span>
                      <i class="easy color-dot"></i>
                      易
                    </span>
                    <span>
                      <i class="color-dot medium"></i>
                      中
                    </span>
                    <span>
                      <i class="color-dot hard"></i>
                      难
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="analysis-section algorithm-section">
            <h5>智能生成算法</h5>
            <div class="algorithm-items">
              <div class="algorithm-item">
                <div class="algorithm-title">基础层题目</div>
                <div class="algorithm-desc">{{ generationParams.algorithms.basic }}</div>
              </div>
              <div class="algorithm-item">
                <div class="algorithm-title">提高层题目</div>
                <div class="algorithm-desc">{{ generationParams.algorithms.improve }}</div>
              </div>
              <div class="algorithm-item">
                <div class="algorithm-title">拓展层题目</div>
                <div class="algorithm-desc">{{ generationParams.algorithms.extension }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分层题目区域 -->
    <div class="level-questions-container">
      <LevelGroup level-type="basic" level-name="基础层" label-text="必做" :count="questionCounts.basic" />

      <LevelGroup level-type="improve" level-name="提高层" label-text="选做" :count="questionCounts.improve" />

      <LevelGroup level-type="extension" level-name="拓展层" label-text="选做" :count="questionCounts.extension" />
    </div>

    <!-- 底部控制按钮 -->
    <ControlButtons />
  </div>
</template>

<style scoped>
.task-layout-container {
  padding: 20px 40px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.question-group-section {
  margin: 20px 0 30px;
  background-color: white;
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  max-width: 600px;
  position: relative;
}

.group-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title-indicator {
  width: 3px;
  height: 18px;
  background-color: #4161fe;
  border-radius: 3px;
  margin-right: 8px;
}

.group-title {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin: 0;
}

.algorithm-info {
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: #4161fe;
  transition: all 0.2s;
  padding: 4px 8px;
  border-radius: 4px;
}

.algorithm-info:hover {
  background-color: #f0f3ff;
}

.algorithm-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #4161fe;
  color: white;
  font-size: 11px;
  font-style: normal;
  margin-right: 5px;
  font-weight: bold;
}

.question-selectors {
  display: flex;
  gap: 12px;
  padding: 5px 0;
  flex-wrap: wrap;
}

.question-type {
  display: flex;
  flex-direction: column;
  width: calc(25% - 9px);
}

.type-name {
  background-color: #4161fe;
  color: white;
  font-size: 14px;
  padding: 8px 0;
  border-radius: 6px;
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
  font-weight: 500;
}

/* 分析面板样式 */
.analysis-panel {
  margin-top: 15px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fafbfd;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f5f7ff;
  border-bottom: 1px solid #eaeaea;
}

.analysis-header h4 {
  margin: 0;
  font-size: 15px;
  color: #4161fe;
}

.analysis-close {
  font-size: 20px;
  line-height: 1;
  color: #aaa;
  cursor: pointer;
  padding: 0 5px;
}

.analysis-close:hover {
  color: #666;
}

.analysis-content {
  padding: 15px;
}

.analysis-section {
  margin-bottom: 20px;
}

.analysis-section h5 {
  margin: 0 0 10px;
  font-size: 14px;
  color: #555;
  font-weight: 600;
}

.coverage-info {
  margin-bottom: 15px;
}

.coverage-progress {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
}

.coverage-text {
  font-size: 13px;
  color: #555;
  text-align: right;
}

.distribution-chart {
  margin-top: 10px;
}

.chart-bar {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.bar-label {
  width: 100px;
  font-size: 13px;
  color: #555;
}

.bar-container {
  flex: 1;
  height: 12px;
  background-color: #eee;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 10px;
}

.bar-fill {
  height: 100%;
  border-radius: 6px;
}

.bar-value {
  width: 40px;
  font-size: 13px;
  color: #555;
  text-align: right;
}

.difficulty-levels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.difficulty-level {
  display: flex;
  flex-direction: column;
}

.level-name {
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
}

.level-bars {
  height: 14px;
  display: flex;
  border-radius: 7px;
  overflow: hidden;
}

.level-bar {
  height: 100%;
}

.level-bar.easy {
  background-color: #4caf50;
}

.level-bar.medium {
  background-color: #ffc107;
}

.level-bar.hard {
  background-color: #f44336;
}

.level-legend {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 5px;
  font-size: 12px;
  color: #777;
}

.color-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
}

.color-dot.easy {
  background-color: #4caf50;
}

.color-dot.medium {
  background-color: #ffc107;
}

.color-dot.hard {
  background-color: #f44336;
}

.algorithm-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.algorithm-item {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;
}

.algorithm-title {
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-bottom: 5px;
}

.algorithm-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

/* NSelect数字居中样式 */
:deep(.n-select) {
  width: 100%;
}

:deep(.n-base-selection) {
  padding: 0 8px;
  border-radius: 6px !important;
  border: 1px solid #e0e0e0 !important;
  transition: all 0.2s !important;
  height: 36px !important;
}

:deep(.n-base-selection:hover) {
  border-color: #4161fe !important;
}

:deep(.n-base-selection-input) {
  text-align: center;
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #444 !important;
}

:deep(.n-base-selection-placeholder) {
  text-align: center;
  left: 0;
  right: 0;
  color: #999 !important;
}

:deep(.n-base-selection-tags) {
  justify-content: center;
}

:deep(.n-select-menu) {
  border-radius: 6px !important;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1) !important;
  padding: 4px !important;
}

:deep(.n-select-menu .n-base-select-option) {
  text-align: center;
  justify-content: center;
  border-radius: 4px !important;
  margin: 2px 0 !important;
  font-size: 14px !important;
  color: #444 !important;
}

:deep(.n-select-menu .n-base-select-option:hover) {
  background-color: #f5f7ff !important;
}

:deep(.n-select-menu .n-base-select-option--selected) {
  color: #4161fe !important;
  background-color: #edf1ff !important;
  font-weight: 500 !important;
}

.level-questions-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

/* 覆盖LevelGroup组件中的标题样式以确保一致性 */
:deep(.level-title) {
  font-weight: 700 !important;
  font-size: 17px !important;
}

:deep(.level-header) {
  padding: 12px 15px !important;
}

@media (max-width: 768px) {
  .task-layout-container {
    padding: 15px;
  }

  .question-selectors {
    flex-wrap: wrap;
  }

  .level-questions-container {
    flex-direction: column;
  }
}
</style>
