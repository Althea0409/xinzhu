<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCard, NIcon, NTag } from 'naive-ui';
import { AlertCircleOutline, BookOutline, TrendingUpOutline } from '@vicons/ionicons5';

defineOptions({
  name: 'ErrorTop10'
});

interface ErrorItem {
  id: number;
  question: string;
  errorType: string;
  errorCount: number;
  totalAttempts: number;
  errorRate: number;
  knowledgePoint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestion: string;
}

const errorData = ref<ErrorItem[]>([
  {
    id: 1,
    question: '《春》朱自清 - 文章主旨理解',
    errorType: '主旨概括',
    errorCount: 28,
    totalAttempts: 50,
    errorRate: 56,
    knowledgePoint: '现代文阅读',
    difficulty: 'medium',
    suggestion: '加强文章整体把握能力，注意关键词句分析'
  },
  {
    id: 2,
    question: '《陋室铭》刘禹锡 - 文言实词理解',
    errorType: '实词理解',
    errorCount: 25,
    totalAttempts: 50,
    errorRate: 50,
    knowledgePoint: '文言文',
    difficulty: 'hard',
    suggestion: '重点掌握常见文言实词，建立词汇积累本'
  },
  {
    id: 3,
    question: '作文 - 议论文论证结构',
    errorType: '结构安排',
    errorCount: 23,
    totalAttempts: 50,
    errorRate: 46,
    knowledgePoint: '作文写作',
    difficulty: 'medium',
    suggestion: '学习议论文基本结构，多练习提纲写作'
  },
  {
    id: 4,
    question: '《观沧海》曹操 - 诗歌意境分析',
    errorType: '意境理解',
    errorCount: 22,
    totalAttempts: 50,
    errorRate: 44,
    knowledgePoint: '诗词鉴赏',
    difficulty: 'medium',
    suggestion: '培养诗歌想象力，理解诗人情感表达'
  },
  {
    id: 5,
    question: '病句修改 - 语序不当',
    errorType: '语法错误',
    errorCount: 20,
    totalAttempts: 50,
    errorRate: 40,
    knowledgePoint: '基础知识',
    difficulty: 'easy',
    suggestion: '掌握基本语法规则，多做病句修改练习'
  },
  {
    id: 6,
    question: '《背影》朱自清 - 细节描写作用',
    errorType: '写作手法',
    errorCount: 19,
    totalAttempts: 50,
    errorRate: 38,
    knowledgePoint: '现代文阅读',
    difficulty: 'medium',
    suggestion: '学习各种写作手法及其表达效果'
  },
  {
    id: 7,
    question: '标点符号使用 - 引号用法',
    errorType: '标点错误',
    errorCount: 18,
    totalAttempts: 50,
    errorRate: 36,
    knowledgePoint: '基础知识',
    difficulty: 'easy',
    suggestion: '系统学习标点符号用法规则'
  },
  {
    id: 8,
    question: '《桃花源记》陶渊明 - 文言句式',
    errorType: '句式理解',
    errorCount: 17,
    totalAttempts: 50,
    errorRate: 34,
    knowledgePoint: '文言文',
    difficulty: 'hard',
    suggestion: '掌握常见文言句式特点和翻译方法'
  },
  {
    id: 9,
    question: '说明文 - 说明方法及作用',
    errorType: '说明方法',
    errorCount: 16,
    totalAttempts: 50,
    errorRate: 32,
    knowledgePoint: '现代文阅读',
    difficulty: 'medium',
    suggestion: '熟记各种说明方法的特点和作用'
  },
  {
    id: 10,
    question: '作文 - 记叙文情感表达',
    errorType: '情感表达',
    errorCount: 15,
    totalAttempts: 50,
    errorRate: 30,
    knowledgePoint: '作文写作',
    difficulty: 'medium',
    suggestion: '加强情感体验，学会通过细节表达真情实感'
  }
]);

function getDifficultyColor(difficulty: string): string {
  const colors = {
    easy: '#52C41A',
    medium: '#FFA726',
    hard: '#EF5350'
  };
  return colors[difficulty as keyof typeof colors] || '#9E9E9E';
}

function getDifficultyText(difficulty: string): string {
  const texts = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  };
  return texts[difficulty as keyof typeof texts] || '未知';
}

function getErrorRateColor(rate: number): string {
  if (rate >= 50) return '#EF5350';
  if (rate >= 35) return '#FFA726';
  return '#52C41A';
}
</script>

<template>
  <NCard title="错题Top10分析" class="error-analysis-card h-full">
    <!-- @vue-ignore: naive-ui header-extra 插槽类型提示兼容 -->
    <template #header-extra>
      <NButton size="small" type="primary" style="background-color: #2b46fe; border-color: #2b46fe; color: white">
        <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
        <template #icon>
          <NIcon><TrendingUpOutline /></NIcon>
        </template>
        查看详细报告
      </NButton>
    </template>

    <div class="error-content">
      <!-- 统计概览 -->
      <div class="stats-overview">
        <div class="stat-item">
          <div class="stat-value error-rate">{{ errorData[0]?.errorRate }}%</div>
          <div class="stat-label">最高错误率</div>
        </div>
        <div class="stat-item">
          <div class="stat-value avg-rate">
            {{ Math.round(errorData.reduce((sum, item) => sum + item.errorRate, 0) / errorData.length) }}%
          </div>
          <div class="stat-label">平均错误率</div>
        </div>
        <div class="stat-item">
          <div class="stat-value improve-count">{{ errorData.filter(item => item.errorRate < 35).length }}</div>
          <div class="stat-label">待改进题目</div>
        </div>
      </div>

      <!-- 错题列表 -->
      <div class="error-list-container">
        <div class="error-list">
          <div v-for="(item, index) in errorData" :key="item.id" class="error-item">
            <!-- 题目信息 -->
            <div class="error-header">
              <div class="error-info">
                <div class="error-rank">{{ index + 1 }}</div>
                <div class="error-details">
                  <h4 class="error-title">{{ item.question }}</h4>
                  <div class="error-tags">
                    <NTag size="small" :color="{ color: getDifficultyColor(item.difficulty), textColor: '#fff' }">
                      {{ getDifficultyText(item.difficulty) }}
                    </NTag>
                    <NTag size="small" type="info">{{ item.knowledgePoint }}</NTag>
                    <NTag size="small" type="warning">{{ item.errorType }}</NTag>
                  </div>
                </div>
              </div>
              <div class="error-stats">
                <div class="error-percentage" :style="{ color: getErrorRateColor(item.errorRate) }">
                  {{ item.errorRate }}%
                </div>
                <div class="error-count">{{ item.errorCount }}/{{ item.totalAttempts }}人</div>
              </div>
            </div>

            <!-- 错误率进度条 -->
            <div class="progress-container">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{
                    width: `${item.errorRate}%`,
                    backgroundColor: getErrorRateColor(item.errorRate)
                  }"
                ></div>
              </div>
            </div>

            <!-- 改进建议 -->
            <div class="suggestion-box">
              <NIcon class="suggestion-icon">
                <AlertCircleOutline />
              </NIcon>
              <div class="suggestion-text">
                <span class="suggestion-label">改进建议：</span>
                {{ item.suggestion }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 整体建议 -->
      <div class="overall-suggestions">
        <div class="suggestions-header">
          <NIcon class="suggestions-icon">
            <BookOutline />
          </NIcon>
          <h5 class="suggestions-title">整体改进策略</h5>
        </div>
        <div class="suggestions-content">
          <p>• 现代文阅读理解能力需要重点提升，建议增加阅读量</p>
          <p>• 文言文基础薄弱，需要系统性学习和积累</p>
          <p>• 作文写作技巧有待加强，多练习不同文体写作</p>
          <p>• 基础知识掌握不够扎实，需要专项训练</p>
        </div>
      </div>
    </div>
  </NCard>
</template>

<style scoped>
.error-analysis-card {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.error-content {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 统计概览 */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  flex-shrink: 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-value.error-rate {
  color: #ef5350;
}

.stat-value.avg-rate {
  color: #2196f3;
}

.stat-value.improve-count {
  color: #4caf50;
}

.stat-label {
  font-size: 12px;
  color: #666;
  line-height: 1.2;
}

/* 错题列表容器 */
.error-list-container {
  flex: 1;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.error-list {
  height: 100%;
  overflow-y: auto;
  padding: 8px;
}

.error-item {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  background: white;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

/* 错题头部 */
.error-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.error-info {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
}

.error-rank {
  width: 24px;
  height: 24px;
  background: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #1976d2;
  flex-shrink: 0;
}

.error-details {
  flex: 1;
  min-width: 0;
}

.error-title {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.error-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.error-stats {
  text-align: right;
  flex-shrink: 0;
}

.error-percentage {
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
}

.error-count {
  font-size: 11px;
  color: #666;
  line-height: 1.2;
  margin-top: 2px;
}

/* 进度条 */
.progress-container {
  margin: 8px 0;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 3px;
}

/* 建议框 */
.suggestion-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  background: #f3f8ff;
  border-radius: 6px;
  margin-top: 8px;
}

.suggestion-icon {
  color: #1976d2;
  margin-top: 1px;
  flex-shrink: 0;
}

.suggestion-text {
  font-size: 12px;
  color: #1565c0;
  line-height: 1.4;
}

.suggestion-label {
  font-weight: 500;
}

/* 整体建议 */
.overall-suggestions {
  background: linear-gradient(135deg, #f3f8ff 0%, #e8f4fd 100%);
  border-radius: 8px;
  padding: 12px;
  flex-shrink: 0;
}

.suggestions-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.suggestions-icon {
  color: #1976d2;
}

.suggestions-title {
  font-size: 13px;
  font-weight: 500;
  color: #1565c0;
  margin: 0;
}

.suggestions-content {
  font-size: 12px;
  color: #1565c0;
  line-height: 1.5;
}

.suggestions-content p {
  margin: 2px 0;
}

/* 滚动条样式 */
.error-list::-webkit-scrollbar {
  width: 6px;
}

.error-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.error-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.error-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 8px;
  }

  .error-header {
    flex-direction: column;
    gap: 8px;
  }

  .error-stats {
    text-align: left;
  }

  .error-tags {
    gap: 2px;
  }
}
</style>
