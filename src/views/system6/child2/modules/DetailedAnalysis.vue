<script setup lang="ts">
import { computed, ref } from 'vue';
import { NIcon, NTabPane, NTabs, NTag } from 'naive-ui';
import {
  AnalyticsOutline,
  BookOutline,
  BulbOutline,
  PeopleOutline,
  TrendingUpOutline,
  WarningOutline
} from '@vicons/ionicons5';

interface QuestionAnalysis {
  id: string;
  questionNumber: string;
  questionType: string;
  studentAnswer: string;
  correctAnswer: string;
  score: number;
  maxScore: number;
  scoringPoints: string[];
  errorType: string;
  aiAnalysis: string;
  suggestions: string[];
}

interface ErrorStatistics {
  errorType: string;
  count: number;
  percentage: number;
  examples: string[];
}

const analysisData = ref<QuestionAnalysis[]>([
  {
    id: '1',
    questionNumber: '第1题',
    questionType: '古诗文默写',
    studentAnswer: '春眠不觉晓，处处闻啼鸟',
    correctAnswer: '春眠不觉晓，处处闻啼鸟',
    score: 10,
    maxScore: 10,
    scoringPoints: ['诗句完整正确', '字迹工整', '无错别字'],
    errorType: '无错误',
    aiAnalysis: '学生对古诗文掌握良好，书写规范，理解准确。',
    suggestions: ['继续保持良好的古诗文学习习惯']
  },
  {
    id: '2',
    questionNumber: '第2题',
    questionType: '现代文阅读',
    studentAnswer: '文章表达了作者对家乡的思念之情',
    correctAnswer: '文章表达了作者对家乡深切的思念和对童年美好回忆的眷恋',
    score: 6,
    maxScore: 10,
    scoringPoints: ['理解基本情感', '缺少细节分析', '表达不够完整'],
    errorType: '理解不够深入',
    aiAnalysis: '学生能够理解文章的基本情感，但对细节的把握和深层含义的理解还需加强。',
    suggestions: ['加强文本细读能力', '注意情感表达的层次性', '多练习概括和分析题型']
  },
  {
    id: '3',
    questionNumber: '第3题',
    questionType: '作文',
    studentAnswer: '我的理想是当一名老师...',
    correctAnswer: '（作文题无标准答案）',
    score: 42,
    maxScore: 50,
    scoringPoints: ['主题明确', '结构完整', '语言流畅', '个别语法错误', '缺乏深度思考'],
    errorType: '表达深度不足',
    aiAnalysis: '作文整体结构完整，语言表达较为流畅，但在思想深度和论证逻辑方面还有提升空间。',
    suggestions: ['加强逻辑思维训练', '丰富论证材料', '提高语言表达的准确性']
  }
]);

const errorStats = ref<ErrorStatistics[]>([
  {
    errorType: '理解不够深入',
    count: 8,
    percentage: 35.2,
    examples: ['现代文阅读理解题', '古诗文鉴赏题']
  },
  {
    errorType: '表达深度不足',
    count: 6,
    percentage: 26.4,
    examples: ['作文题', '综合性学习题']
  },
  {
    errorType: '基础知识薄弱',
    count: 5,
    percentage: 22.1,
    examples: ['字词辨析', '语法运用']
  },
  {
    errorType: '审题不仔细',
    count: 4,
    percentage: 16.3,
    examples: ['阅读理解题', '语言文字运用题']
  }
]);

const totalQuestions = computed(() => analysisData.value.length);
const totalScore = computed(() => analysisData.value.reduce((sum, item) => sum + item.score, 0));
const totalMaxScore = computed(() => analysisData.value.reduce((sum, item) => sum + item.maxScore, 0));
const accuracyRate = computed(() => ((totalScore.value / totalMaxScore.value) * 100).toFixed(1));

function getScoreColor(score: number, maxScore: number) {
  const rate = score / maxScore;
  if (rate >= 0.9) return 'success';
  if (rate >= 0.7) return 'warning';
  return 'error';
}

function getErrorTypeColor(errorType: string) {
  switch (errorType) {
    case '无错误':
      return 'success';
    case '理解不够深入':
      return 'warning';
    case '表达深度不足':
      return 'info';
    case '基础知识薄弱':
      return 'error';
    default:
      return 'default';
  }
}
</script>

<template>
  <div class="analysis-container">
    <!-- 功能标题 -->
    <div class="section-header">
      <div class="header-content">
        <NIcon :component="AnalyticsOutline" size="24" class="header-icon" />
        <div>
          <h2 class="section-title">详细分析报告</h2>
          <p class="section-subtitle">深度解析答题情况，提供针对性改进建议</p>
        </div>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">总分</span>
          <span class="stat-value">{{ totalScore }}/{{ totalMaxScore }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">正确率</span>
          <span class="stat-value">{{ accuracyRate }}%</span>
        </div>
      </div>
    </div>

    <!-- 分析内容 -->
    <div class="analysis-content">
      <NTabs type="line" size="large" class="analysis-tabs">
        <!-- 逐题分析 -->
        <NTabPane name="questions" tab="逐题分析">
          <div class="tab-content">
            <div class="questions-list">
              <div v-for="item in analysisData" :key="item.id" class="question-card">
                <div class="question-header">
                  <div class="question-info">
                    <h3 class="question-title">{{ item.questionNumber }} - {{ item.questionType }}</h3>
                    <div class="question-tags">
                      <NTag :type="getScoreColor(item.score, item.maxScore)" class="score-tag">
                        {{ item.score }}/{{ item.maxScore }}
                      </NTag>
                      <NTag :type="getErrorTypeColor(item.errorType)" size="small">
                        {{ item.errorType }}
                      </NTag>
                    </div>
                  </div>
                </div>

                <div class="question-detail">
                  <div class="answer-comparison">
                    <div class="answer-section">
                      <h4 class="answer-title">学生答案</h4>
                      <div class="answer-content student-answer">{{ item.studentAnswer }}</div>
                    </div>
                    <div class="answer-section">
                      <h4 class="answer-title">参考答案</h4>
                      <div class="answer-content correct-answer">{{ item.correctAnswer }}</div>
                    </div>
                  </div>

                  <div class="scoring-points">
                    <h4 class="section-subtitle">
                      <NIcon :component="BookOutline" class="section-icon" />
                      评分要点
                    </h4>
                    <div class="points-list">
                      <NTag v-for="point in item.scoringPoints" :key="point" class="point-tag">
                        {{ point }}
                      </NTag>
                    </div>
                  </div>

                  <div class="ai-analysis">
                    <h4 class="section-subtitle">
                      <NIcon :component="BulbOutline" class="section-icon" />
                      AI智能分析
                    </h4>
                    <div class="analysis-text">{{ item.aiAnalysis }}</div>
                  </div>

                  <div class="suggestions">
                    <h4 class="section-subtitle">
                      <NIcon :component="TrendingUpOutline" class="section-icon" />
                      改进建议
                    </h4>
                    <ul class="suggestion-list">
                      <li v-for="suggestion in item.suggestions" :key="suggestion">
                        {{ suggestion }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NTabPane>

        <!-- 错误统计 -->
        <NTabPane name="errors" tab="错误统计">
          <div class="tab-content">
            <div class="error-overview">
              <h3 class="overview-title">
                <NIcon :component="WarningOutline" class="title-icon" />
                高频错误类型分析
              </h3>
              <p class="overview-subtitle">基于本次批改结果的错误类型统计与分析</p>
            </div>

            <div class="error-grid">
              <div v-for="error in errorStats" :key="error.errorType" class="error-card">
                <div class="error-header">
                  <div class="error-info">
                    <h4 class="error-type">{{ error.errorType }}</h4>
                    <div class="error-count">
                      <span class="count">{{ error.count }}</span>
                      <span class="unit">次</span>
                    </div>
                  </div>
                  <div class="error-percentage">{{ error.percentage }}%</div>
                </div>

                <NProgress
                  :percentage="error.percentage"
                  :show-indicator="false"
                  :color="error.percentage > 30 ? '#ff4d4f' : error.percentage > 20 ? '#faad14' : '#52c41a'"
                  class="error-progress"
                />

                <div class="error-examples">
                  <span class="examples-label">常见题型：</span>
                  <div class="example-tags">
                    <NTag v-for="example in error.examples" :key="example" size="small" type="info">
                      {{ example }}
                    </NTag>
                  </div>
                </div>
              </div>
            </div>

            <div class="improvement-suggestions">
              <NAlert type="info" title="整体改进建议" class="improvement-alert">
                <ul class="improvement-list">
                  <li>针对"理解不够深入"问题，建议加强文本细读训练，提高学生的分析能力</li>
                  <li>对于"表达深度不足"，可通过写作训练和思维导图等方式提升表达能力</li>
                  <li>"基础知识薄弱"需要系统性复习，建立知识体系</li>
                  <li>"审题不仔细"可通过专项训练提高学生的审题意识</li>
                </ul>
              </NAlert>
            </div>
          </div>
        </NTabPane>

        <!-- 班级汇总 -->
        <NTabPane name="class" tab="班级汇总">
          <div class="tab-content">
            <div class="class-overview">
              <h3 class="overview-title">
                <NIcon :component="PeopleOutline" class="title-icon" />
                班级整体表现
              </h3>
              <div class="stats-grid">
                <div class="stat-card">
                  <NIcon :component="TrendingUpOutline" class="stat-icon" />
                  <div class="stat-content">
                    <div class="stat-value">{{ (totalScore / totalQuestions).toFixed(1) }}</div>
                    <div class="stat-label">平均分</div>
                  </div>
                </div>
                <div class="stat-card">
                  <NIcon :component="BookOutline" class="stat-icon" />
                  <div class="stat-content">
                    <div class="stat-value">{{ Math.max(...analysisData.map(item => item.score)) }}</div>
                    <div class="stat-label">最高分</div>
                  </div>
                </div>
                <div class="stat-card">
                  <NIcon :component="AnalyticsOutline" class="stat-icon" />
                  <div class="stat-content">
                    <div class="stat-value">{{ Math.min(...analysisData.map(item => item.score)) }}</div>
                    <div class="stat-label">最低分</div>
                  </div>
                </div>
                <div class="stat-card">
                  <NIcon :component="PeopleOutline" class="stat-icon" />
                  <div class="stat-content">
                    <div class="stat-value">85.7%</div>
                    <div class="stat-label">及格率</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="teaching-recommendations">
              <h3 class="overview-title">教学建议</h3>
              <div class="recommendation-grid">
                <div class="recommendation-card">
                  <h4 class="recommendation-title">重点关注领域</h4>
                  <p class="recommendation-text">现代文阅读理解和作文表达是学生的薄弱环节，需要重点加强训练。</p>
                </div>
                <div class="recommendation-card">
                  <h4 class="recommendation-title">教学策略调整</h4>
                  <p class="recommendation-text">建议增加文本分析的深度训练，培养学生的批判性思维和表达能力。</p>
                </div>
                <div class="recommendation-card">
                  <h4 class="recommendation-title">个性化辅导</h4>
                  <p class="recommendation-text">对于基础薄弱的学生，建议进行一对一辅导，巩固基础知识。</p>
                </div>
              </div>
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </div>
  </div>
</template>

<style scoped>
.analysis-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-header {
  background: white;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.section-header:hover {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  color: #2b46fe;
  background: rgba(43, 70, 254, 0.1);
  padding: 12px;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #111827;
}

.section-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #2b46fe;
}

.analysis-content {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}

.analysis-tabs {
  padding: 0;
}

.analysis-tabs :deep(.n-tabs-nav) {
  padding: 0 24px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.analysis-tabs :deep(.n-tabs-tab) {
  font-weight: 500;
  font-size: 16px;
}

.analysis-tabs :deep(.n-tabs-tab--active) {
  color: #2b46fe;
}

.analysis-tabs :deep(.n-tabs-tab-pad) {
  background: transparent;
}

.tab-content {
  padding: 24px;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.question-card:hover {
  background: #f3f4f6;
  border-color: #2b46fe;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.question-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.question-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.question-tags {
  display: flex;
  gap: 8px;
}

.score-tag {
  font-weight: 600;
}

.question-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.answer-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.answer-section {
  background: white;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.answer-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #111827;
}

.answer-content {
  font-size: 14px;
  line-height: 1.6;
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid;
}

.student-answer {
  background: #fef2f2;
  border-left-color: #ef4444;
  color: #111827;
}

.correct-answer {
  background: #f0fdf4;
  border-left-color: #22c55e;
  color: #111827;
}

.scoring-points,
.ai-analysis,
.suggestions {
  background: white;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.section-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #111827;
}

.section-icon {
  color: #2b46fe;
}

.points-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.point-tag {
  background: #2b46fe;
  color: white;
  border: none;
}

.analysis-text {
  font-size: 14px;
  line-height: 1.6;
  color: #111827;
}

.suggestion-list {
  margin: 0;
  padding-left: 20px;
}

.suggestion-list li {
  font-size: 14px;
  line-height: 1.6;
  color: #111827;
  margin-bottom: 4px;
}

.error-overview {
  text-align: center;
  margin-bottom: 32px;
}

.overview-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #111827;
}

.title-icon {
  color: #2b46fe;
}

.overview-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.error-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.error-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.error-card:hover {
  background: #f3f4f6;
  border-color: #2b46fe;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.1);
}

.error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.error-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-type {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.error-count {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.count {
  font-size: 20px;
  font-weight: 700;
  color: #2b46fe;
}

.unit {
  font-size: 12px;
  color: #6b7280;
}

.error-percentage {
  font-size: 24px;
  font-weight: 700;
  color: #ef4444;
}

.error-progress {
  margin-bottom: 16px;
}

.error-examples {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.examples-label {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.improvement-suggestions {
  margin-top: 24px;
}

.improvement-alert {
  border-radius: 8px;
}

.improvement-list {
  margin: 0;
  padding-left: 20px;
}

.improvement-list li {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
}

.class-overview {
  margin-bottom: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  background: #f3f4f6;
  border-color: #2b46fe;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: #2b46fe;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.teaching-recommendations {
  margin-top: 32px;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.recommendation-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.recommendation-card:hover {
  background: #f3f4f6;
  border-color: #2b46fe;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.1);
}

.recommendation-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #2b46fe;
}

.recommendation-text {
  font-size: 14px;
  line-height: 1.6;
  color: #111827;
  margin: 0;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-stats {
    align-self: stretch;
    justify-content: space-around;
  }

  .answer-comparison {
    grid-template-columns: 1fr;
  }

  .stats-grid,
  .error-grid,
  .recommendation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
