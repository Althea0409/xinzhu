<script setup lang="ts">
import { computed, ref } from 'vue';
import { NIcon, NTag } from 'naive-ui';
import {
  BookOutline,
  BulbOutline,
  CheckmarkCircleOutline,
  StarOutline,
  TimeOutline,
  TrendingUpOutline
} from '@vicons/ionicons5';

interface Exercise {
  id: string;
  title: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  description: string;
  completed: boolean;
}

interface StudyPlan {
  totalDays: number;
  dailyTime: number;
  phases: Array<{
    phase: string;
    duration: string;
    focus: string;
    goals: string[];
  }>;
}

interface LearningRecommendation {
  id: string;
  studentName: string;
  weaknessArea: string;
  currentLevel: string;
  targetLevel: string;
  exercises: Exercise[];
  studyPlan: StudyPlan;
  learningTips: string[];
  personalizedTips: string[];
}

const recommendations = ref<LearningRecommendation[]>([
  {
    id: '1',
    studentName: '张小明',
    weaknessArea: '现代文阅读理解',
    currentLevel: '基础层',
    targetLevel: '提高层',
    exercises: [
      {
        id: 'ex1',
        title: '记叙文阅读理解基础训练',
        type: '阅读理解',
        difficulty: 'easy',
        estimatedTime: 30,
        description: '通过经典记叙文片段，训练基本的理解和概括能力',
        completed: false
      },
      {
        id: 'ex2',
        title: '说明文阅读技巧专练',
        type: '阅读理解',
        difficulty: 'medium',
        estimatedTime: 45,
        description: '掌握说明文的结构特点和阅读方法',
        completed: false
      },
      {
        id: 'ex3',
        title: '议论文论证方法识别',
        type: '阅读理解',
        difficulty: 'medium',
        estimatedTime: 40,
        description: '学习识别和分析议论文的论证方法',
        completed: false
      }
    ],
    studyPlan: {
      totalDays: 14,
      dailyTime: 45,
      phases: [
        {
          phase: '第一阶段',
          duration: '1-5天',
          focus: '基础巩固',
          goals: ['掌握基本阅读方法', '提高文本理解能力', '学会抓住关键信息']
        },
        {
          phase: '第二阶段',
          duration: '6-10天',
          focus: '技能提升',
          goals: ['学习答题技巧', '提高分析能力', '掌握不同文体特点']
        },
        {
          phase: '第三阶段',
          duration: '11-14天',
          focus: '综合应用',
          goals: ['综合运用所学技能', '提高答题准确率', '形成稳定的解题思路']
        }
      ]
    },
    personalizedTips: [
      '建议每天坚持阅读30分钟课外文章，培养语感',
      '做题时要先通读全文，把握文章主旨',
      '注意积累常见的阅读理解题型和答题模板',
      '可以尝试用思维导图整理文章结构'
    ],
    learningTips: []
  },
  {
    id: '2',
    studentName: '李小红',
    weaknessArea: '作文表达',
    currentLevel: '提高层',
    targetLevel: '拓展层',
    exercises: [
      {
        id: 'ex4',
        title: '议论文写作结构训练',
        type: '写作训练',
        difficulty: 'medium',
        estimatedTime: 60,
        description: '学习议论文的基本结构和论证方法',
        completed: true
      },
      {
        id: 'ex5',
        title: '素材积累与运用',
        type: '写作训练',
        difficulty: 'medium',
        estimatedTime: 45,
        description: '学会收集和运用写作素材，丰富文章内容',
        completed: false
      },
      {
        id: 'ex6',
        title: '语言表达优化训练',
        type: '写作训练',
        difficulty: 'hard',
        estimatedTime: 50,
        description: '提升语言表达的准确性和生动性',
        completed: false
      }
    ],
    studyPlan: {
      totalDays: 21,
      dailyTime: 50,
      phases: [
        {
          phase: '第一阶段',
          duration: '1-7天',
          focus: '结构梳理',
          goals: ['掌握各类文体结构', '学会列提纲', '明确写作思路']
        },
        {
          phase: '第二阶段',
          duration: '8-14天',
          focus: '内容充实',
          goals: ['积累写作素材', '学会论证方法', '提高表达深度']
        },
        {
          phase: '第三阶段',
          duration: '15-21天',
          focus: '语言优化',
          goals: ['提升语言表达', '增强文采', '形成个人风格']
        }
      ]
    },
    personalizedTips: [
      '建议每周写一篇完整作文，并请老师点评',
      '多读优秀范文，学习表达技巧和写作手法',
      '建立素材库，分类整理各种写作素材',
      '注意语言的准确性，避免语法错误'
    ],
    learningTips: []
  }
]);

const selectedStudent = ref<string>('');

const currentRecommendation = computed(() => {
  if (!selectedStudent.value) return null;
  return recommendations.value.find(r => r.id === selectedStudent.value);
});

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'error';
    default:
      return 'default';
  }
}

function getDifficultyText(difficulty: string) {
  switch (difficulty) {
    case 'easy':
      return '基础';
    case 'medium':
      return '中等';
    case 'hard':
      return '困难';
    default:
      return '未知';
  }
}

function toggleExerciseComplete(exerciseId: string) {
  if (!currentRecommendation.value) return;
  const exercise = currentRecommendation.value.exercises.find(ex => ex.id === exerciseId);
  if (exercise) {
    exercise.completed = !exercise.completed;
  }
}

function getCompletionRate(exercises: Exercise[]) {
  const completed = exercises.filter(ex => ex.completed).length;
  return ((completed / exercises.length) * 100).toFixed(0);
}
</script>

<template>
  <div class="recommendation-container">
    <!-- 功能标题 -->
    <div class="section-header">
      <div class="header-content">
        <NIcon :component="BulbOutline" size="24" class="header-icon" />
        <div>
          <h2 class="section-title">智能推荐系统</h2>
          <p class="section-subtitle">基于学习数据分析，提供个性化学习方案</p>
        </div>
      </div>
      <NTag type="info" class="feature-tag">个性化学习方案</NTag>
    </div>

    <!-- 学生选择 -->
    <div class="student-selector">
      <h3 class="selector-title">
        <NIcon :component="StarOutline" class="title-icon" />
        选择学生
      </h3>
      <div class="student-buttons">
        <button
          v-for="rec in recommendations"
          :key="rec.id"
          class="student-btn"
          :class="[{ active: selectedStudent === rec.id }]"
          @click="selectedStudent = rec.id"
        >
          {{ rec.studentName }}
        </button>
      </div>
    </div>

    <!-- 推荐内容 -->
    <div v-if="currentRecommendation" class="recommendation-content">
      <!-- 学生概况 -->
      <div class="overview-card">
        <div class="card-header">
          <h3 class="card-title">
            <NIcon :component="StarOutline" class="card-icon" />
            学生概况
          </h3>
        </div>
        <div class="overview-grid">
          <div class="overview-item">
            <span class="item-label">姓名</span>
            <span class="item-value">{{ currentRecommendation.studentName }}</span>
          </div>
          <div class="overview-item">
            <span class="item-label">薄弱领域</span>
            <span class="item-tag weakness">{{ currentRecommendation.weaknessArea }}</span>
          </div>
          <div class="overview-item">
            <span class="item-label">当前水平</span>
            <span class="item-tag current">{{ currentRecommendation.currentLevel }}</span>
          </div>
          <div class="overview-item">
            <span class="item-label">目标水平</span>
            <span class="item-tag target">{{ currentRecommendation.targetLevel }}</span>
          </div>
        </div>
      </div>

      <!-- 补救练习方案 -->
      <div class="exercises-card">
        <div class="card-header">
          <h3 class="card-title">
            <NIcon :component="BookOutline" class="card-icon" />
            补救练习方案
          </h3>
          <div class="completion-info">
            <span class="completion-text">完成度</span>
            <div class="completion-progress">
              <NProgress
                :percentage="Number(getCompletionRate(currentRecommendation.exercises))"
                :show-indicator="false"
                color="#2B46FE"
                class="progress-bar"
              />
              <span class="completion-rate">{{ getCompletionRate(currentRecommendation.exercises) }}%</span>
            </div>
          </div>
        </div>

        <div class="exercises-list">
          <div
            v-for="exercise in currentRecommendation.exercises"
            :key="exercise.id"
            class="exercise-item"
            :class="[{ completed: exercise.completed }]"
          >
            <div class="exercise-header">
              <div class="exercise-info">
                <h4 class="exercise-title">{{ exercise.title }}</h4>
                <div class="exercise-meta">
                  <span class="exercise-type">{{ exercise.type }}</span>
                  <span class="exercise-difficulty" :class="[getDifficultyColor(exercise.difficulty)]">
                    {{ getDifficultyText(exercise.difficulty) }}
                  </span>
                  <span class="exercise-time">
                    <NIcon :component="TimeOutline" />
                    {{ exercise.estimatedTime }}分钟
                  </span>
                </div>
              </div>
              <button
                class="complete-btn"
                :class="[{ completed: exercise.completed }]"
                @click="toggleExerciseComplete(exercise.id)"
              >
                <NIcon :component="CheckmarkCircleOutline" />
                {{ exercise.completed ? '已完成' : '标记完成' }}
              </button>
            </div>
            <p class="exercise-description">{{ exercise.description }}</p>
          </div>
        </div>
      </div>

      <!-- 学习计划 -->
      <div class="study-plan-card">
        <div class="card-header">
          <h3 class="card-title">
            <NIcon :component="TrendingUpOutline" class="card-icon" />
            个性化学习计划
          </h3>
          <div class="plan-stats">
            <div class="stat-item">
              <span class="stat-value">{{ currentRecommendation.studyPlan.totalDays }}</span>
              <span class="stat-label">天</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ currentRecommendation.studyPlan.dailyTime }}</span>
              <span class="stat-label">分钟/日</span>
            </div>
          </div>
        </div>

        <div class="plan-phases">
          <div v-for="(phase, index) in currentRecommendation.studyPlan.phases" :key="index" class="phase-item">
            <div class="phase-header">
              <span class="phase-number">{{ index + 1 }}</span>
              <div class="phase-info">
                <h5 class="phase-title">{{ phase.phase }}</h5>
                <span class="phase-duration">{{ phase.duration }}</span>
              </div>
            </div>
            <div class="phase-content">
              <div class="phase-focus">
                <span class="focus-label">学习重点：</span>
                <span class="focus-text">{{ phase.focus }}</span>
              </div>
              <div class="phase-goals">
                <span class="goals-label">学习目标：</span>
                <ul class="goals-list">
                  <li v-for="goal in phase.goals" :key="goal" class="goal-item">{{ goal }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 个性化建议 -->
      <div class="tips-card">
        <div class="card-header">
          <h3 class="card-title">
            <NIcon :component="BulbOutline" class="card-icon" />
            个性化学习建议
          </h3>
        </div>
        <div class="tips-content">
          <div class="tips-header">
            <NIcon :component="StarOutline" class="tips-icon" />
            <span class="tips-title">专属学习建议</span>
          </div>
          <ul class="tips-list">
            <li v-for="(tip, index) in currentRecommendation.personalizedTips" :key="index" class="tip-item">
              <NIcon :component="StarOutline" class="tip-icon" />
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 未选择学生时的提示 -->
    <div v-else class="no-selection">
      <div class="empty-state">
        <NIcon :component="StarOutline" size="48" class="empty-icon" />
        <h3 class="empty-title">请选择学生</h3>
        <div class="empty-description">请在上方选择一个学生，查看为其定制的个性化学习推荐方案</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommendation-container {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

/* 功能标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: #2b46fe;
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 16px rgba(43, 70, 254, 0.15);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  color: #ffffff;
}

.section-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.section-subtitle {
  margin: 4px 0 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.feature-tag {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}

/* 学生选择 */
.student-selector {
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.selector-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
}

.title-icon {
  color: #2b46fe;
}

.student-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.student-btn {
  padding: 12px 24px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #4a5568;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.student-btn:hover {
  border-color: #2b46fe;
  color: #2b46fe;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(43, 70, 254, 0.2);
}

.student-btn.active {
  background: #2b46fe;
  border-color: #2b46fe;
  color: white;
  box-shadow: 0 4px 16px rgba(43, 70, 254, 0.3);
}

/* 推荐内容 */
.recommendation-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 通用卡片样式 */
.overview-card,
.exercises-card,
.study-plan-card,
.tips-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
}

.card-icon {
  color: #2b46fe;
}

/* 学生概况 */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 24px;
}

.overview-item {
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.item-label {
  display: block;
  font-size: 14px;
  color: #718096;
  margin-bottom: 8px;
  font-weight: 500;
}

.item-value {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.item-tag {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.item-tag.weakness {
  background: #fed7d7;
  color: #c53030;
}

.item-tag.current {
  background: #bee3f8;
  color: #2b6cb0;
}

.item-tag.target {
  background: #c6f6d5;
  color: #2f855a;
}

/* 补救练习 */
.completion-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.completion-text {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

.completion-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  width: 100px;
}

.completion-rate {
  font-size: 14px;
  font-weight: 600;
  color: #2b46fe;
}

.exercises-list {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exercise-item {
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
}

.exercise-item:hover {
  border-color: #2b46fe;
  box-shadow: 0 4px 12px rgba(43, 70, 254, 0.1);
}

.exercise-item.completed {
  background: #f0fff4;
  border-color: #68d391;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.exercise-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.exercise-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.exercise-type {
  padding: 4px 8px;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.exercise-difficulty {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.exercise-difficulty.success {
  background: #c6f6d5;
  color: #2f855a;
}

.exercise-difficulty.warning {
  background: #faf089;
  color: #d69e2e;
}

.exercise-difficulty.error {
  background: #fed7d7;
  color: #c53030;
}

.exercise-time {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #718096;
}

.complete-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 2px solid #2b46fe;
  border-radius: 8px;
  background: white;
  color: #2b46fe;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.complete-btn:hover {
  background: #2b46fe;
  color: white;
}

.complete-btn.completed {
  background: #48bb78;
  border-color: #48bb78;
  color: white;
}

.exercise-description {
  margin: 0;
  color: #718096;
  line-height: 1.6;
  font-size: 14px;
}

/* 学习计划 */
.plan-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #2b46fe;
}

.stat-label {
  font-size: 12px;
  color: #718096;
}

.plan-phases {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.phase-item {
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #2b46fe;
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.phase-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #2b46fe;
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
}

.phase-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

.phase-duration {
  padding: 4px 8px;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.phase-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.phase-focus {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.focus-label {
  font-weight: 600;
  color: #1a202c;
  min-width: 80px;
}

.focus-text {
  color: #4a5568;
  line-height: 1.5;
}

.phase-goals {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.goals-label {
  font-weight: 600;
  color: #1a202c;
}

.goals-list {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.goal-item {
  color: #4a5568;
  line-height: 1.5;
}

/* 个性化建议 */
.tips-content {
  padding: 24px;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #fff7ed;
  border-radius: 12px;
  border: 1px solid #fed7aa;
}

.tips-icon {
  color: #ea580c;
}

.tips-title {
  font-size: 16px;
  font-weight: 600;
  color: #ea580c;
}

.tips-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #2b46fe;
}

.tip-icon {
  color: #2b46fe;
  margin-top: 2px;
  flex-shrink: 0;
}

/* 空状态 */
.no-selection {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.empty-state {
  text-align: center;
}

.empty-icon {
  color: #cbd5e0;
  margin-bottom: 16px;
}

.empty-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
}

.empty-description {
  margin: 0;
  color: #718096;
  font-size: 16px;
  line-height: 1.5;
}
</style>
