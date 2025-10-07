<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import { AnalyticsOutline, CameraOutline, DocumentTextOutline, SchoolOutline } from '@vicons/ionicons5';

interface AnalysisStats {
  totalPapers: number;
  completedPapers: number;
  averageScore: number;
  accuracyRate: number;
}

const stats = ref<AnalysisStats>({
  totalPapers: 45,
  completedPapers: 42,
  averageScore: 85.6,
  accuracyRate: 94.2
});

const emit = defineEmits<{
  startOCR: [];
  viewAnalysis: [];
  exportReport: [];
}>();
</script>

<template>
  <div class="header-wrapper">
    <!-- 标题区域 -->
    <div class="title-section">
      <h1 class="system-title">批改分析系统</h1>
      <p class="subtitle">智能OCR识别 · 自动评分 · 深度分析</p>
    </div>

    <!-- 统计数据卡片 -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon">
          <NIcon :component="DocumentTextOutline" size="24" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.totalPapers }}</div>
          <div class="stat-label">总试卷数</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <NIcon :component="AnalyticsOutline" size="24" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.completedPapers }}</div>
          <div class="stat-label">已批改</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <NIcon :component="SchoolOutline" size="24" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.averageScore.toFixed(1) }}</div>
          <div class="stat-label">平均分</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <NIcon :component="CameraOutline" size="24" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.accuracyRate }}%</div>
          <div class="stat-label">识别准确率</div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <NButton type="primary" size="large" class="primary-btn" @click="emit('startOCR')">
        <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
        <template #icon>
          <NIcon :component="CameraOutline" />
        </template>
        开始OCR识别
      </NButton>
      <NButton size="large" class="secondary-btn" @click="emit('viewAnalysis')">
        <!-- @vue-ignore: naive-ui 按钮图标插槽类型提示兼容 -->
        <template #icon>
          <NIcon :component="AnalyticsOutline" />
        </template>
        查看分析报告
      </NButton>
      <NButton size="large" class="outline-btn" @click="emit('exportReport')">导出报告</NButton>
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.header-wrapper:hover {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

.title-section {
  text-align: center;
  margin-bottom: 32px;
}

.system-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #111827;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
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
  flex-shrink: 0;
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

.action-section {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.primary-btn {
  background: #2b46fe !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  min-width: 160px;
  height: 48px;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 1px 2px rgba(43, 70, 254, 0.2) !important;
}

.primary-btn:hover {
  background: #1e3bfe !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.3) !important;
}

.primary-btn:focus {
  box-shadow: 0 0 0 3px rgba(43, 70, 254, 0.1) !important;
}

.secondary-btn {
  background: white !important;
  border: 2px solid #2b46fe !important;
  color: #2b46fe !important;
  font-weight: 600 !important;
  min-width: 160px;
  height: 48px;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
}

.secondary-btn:hover {
  background: #2b46fe !important;
  color: white !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.2) !important;
}

.secondary-btn:focus {
  box-shadow: 0 0 0 3px rgba(43, 70, 254, 0.1) !important;
}

.outline-btn {
  background: white !important;
  border: 1px solid #d1d5db !important;
  color: #6b7280 !important;
  font-weight: 500 !important;
  min-width: 120px;
  height: 48px;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
}

.outline-btn:hover {
  border-color: #2b46fe !important;
  color: #2b46fe !important;
  transform: translateY(-1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}

.outline-btn:focus {
  box-shadow: 0 0 0 3px rgba(43, 70, 254, 0.1) !important;
}

@media (max-width: 768px) {
  .header-wrapper {
    padding: 24px;
  }

  .system-title {
    font-size: 28px;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-card {
    padding: 20px;
  }

  .action-section {
    flex-direction: column;
    align-items: center;
  }

  .primary-btn,
  .secondary-btn,
  .outline-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
