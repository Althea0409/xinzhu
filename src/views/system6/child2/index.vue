<script setup lang="ts">
import { ref } from 'vue';
import OCRRecognition from './modules/OCRRecognition.vue';
import DetailedAnalysis from './modules/DetailedAnalysis.vue';
import RecommendationSystem from './modules/RecommendationSystem.vue';

// 当前激活的功能区域
const activeSection = ref('ocr');

// 获取当前区域标题
function getSectionTitle() {
  switch (activeSection.value) {
    case 'ocr':
      return 'OCR识别与自动评分';
    case 'analysis':
      return '详细分析与统计';
    case 'recommendation':
      return '智能推荐系统';
    default:
      return 'OCR识别与自动评分';
  }
}
</script>

<template>
  <div class="correction-analysis-system">
    <!-- 左右分栏布局 -->
    <div class="layout-container">
      <!-- 左侧边栏 -->
      <div class="left-sidebar">
        <div class="sidebar-header">
          <h2 class="system-title">批改分析系统</h2>
          <p class="system-subtitle">智能作业批改与学习分析</p>
        </div>

        <!-- 快速统计卡片 -->
        <div class="quick-stats">
          <div class="stat-item">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-number">156</div>
              <div class="stat-label">总试卷数</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <div class="stat-number">142</div>
              <div class="stat-label">已批改</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📈</div>
            <div class="stat-content">
              <div class="stat-number">85.6</div>
              <div class="stat-label">平均分</div>
            </div>
          </div>
        </div>

        <!-- 导航菜单 -->
        <div class="navigation-menu">
          <div class="menu-section">
            <h3 class="menu-title">功能导航</h3>
            <div class="menu-items">
              <div class="menu-item" :class="[{ active: activeSection === 'ocr' }]" @click="activeSection = 'ocr'">
                <div class="menu-icon">🔍</div>
                <span>OCR识别</span>
              </div>
              <div
                class="menu-item"
                :class="[{ active: activeSection === 'analysis' }]"
                @click="activeSection = 'analysis'"
              >
                <div class="menu-icon">📋</div>
                <span>详细分析</span>
              </div>
              <div
                class="menu-item"
                :class="[{ active: activeSection === 'recommendation' }]"
                @click="activeSection = 'recommendation'"
              >
                <div class="menu-icon">💡</div>
                <span>智能推荐</span>
              </div>
            </div>
          </div>

          <div class="menu-section">
            <h3 class="menu-title">快捷操作</h3>
            <div class="action-buttons">
              <button class="action-btn primary">
                <span class="btn-icon">📤</span>
                导出报告
              </button>
              <button class="action-btn secondary">
                <span class="btn-icon">⚙️</span>
                系统设置
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧主内容区域 -->
      <div class="right-content">
        <div class="content-header">
          <div class="breadcrumb">
            <span class="breadcrumb-item">批改分析</span>
            <span class="breadcrumb-separator">></span>
            <span class="breadcrumb-item current">{{ getSectionTitle() }}</span>
          </div>
        </div>

        <div class="content-body">
          <!-- OCR识别和自动评分 -->
          <div v-show="activeSection === 'ocr'" class="content-section">
            <OCRRecognition />
          </div>

          <!-- 详细分析 -->
          <div v-show="activeSection === 'analysis'" class="content-section">
            <DetailedAnalysis />
          </div>

          <!-- 智能推荐系统 -->
          <div v-show="activeSection === 'recommendation'" class="content-section">
            <RecommendationSystem />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主容器样式 */
.correction-analysis-system {
  min-height: 100vh;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* 布局容器 */
.layout-container {
  display: flex;
  min-height: 100vh;
}

/* 左侧边栏样式 */
.left-sidebar {
  width: 320px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  border-radius: 16px 16px 16px 16px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
}

/* 边栏头部 */
.sidebar-header {
  padding: 32px 24px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #2b46fe;
  color: white;
}

.system-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.system-subtitle {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
  font-weight: 400;
}

/* 快速统计 */
.quick-stats {
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f8fafc;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-icon {
  font-size: 24px;
  margin-right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 12px;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

/* 导航菜单 */
.navigation-menu {
  flex: 1;
  padding: 24px;
}

.menu-section {
  margin-bottom: 32px;
}

.menu-section:last-child {
  margin-bottom: 0;
}

.menu-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  background: #f8fafc;
}

.menu-item:hover {
  background: #f1f5f9;
  color: #374151;
}

.menu-item.active {
  background: #e9ecff;
  color: #2b46fe;
  font-weight: 600;
}

.menu-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 快捷操作按钮 */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.action-btn.primary {
  background: #2b46fe;
  color: white;
}

.action-btn.primary:hover {
  background: #1e3bfe;
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: #f8fafc;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.action-btn.secondary:hover {
  background: #f1f5f9;
  color: #374151;
}

.btn-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* 右侧内容区域 */
.right-content {
  flex: 1;
  margin-left: 320px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 内容头部 */
.content-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 20px 32px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.breadcrumb-item {
  color: #6b7280;
  font-weight: 500;
}

.breadcrumb-item.current {
  color: #2b46fe;
  font-weight: 600;
}

.breadcrumb-separator {
  margin: 0 12px;
  color: #d1d5db;
}

/* 内容主体 */
.content-body {
  flex: 1;
  padding: 32px;
  background: #f8fafc;
}

.content-section {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .left-sidebar {
    width: 280px;
  }

  .right-content {
    margin-left: 280px;
  }

  .content-body {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .left-sidebar {
    width: 100%;
    position: relative;
    height: auto;
  }

  .right-content {
    margin-left: 0;
  }

  .layout-container {
    flex-direction: column;
  }

  .content-body {
    padding: 16px;
  }

  .sidebar-header {
    padding: 24px;
  }

  .system-title {
    font-size: 20px;
  }
}

/* 全局样式覆盖 */
:deep(.n-card) {
  border-radius: 12px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  background: white;
  transition: all 0.2s ease;
}

:deep(.n-card:hover) {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

:deep(.n-card-header) {
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-weight: 600;
  color: #1f2937;
  font-size: 16px;
}

:deep(.n-card__content) {
  padding: 24px;
}

:deep(.n-button--primary-type) {
  background-color: #2b46fe;
  border-color: #2b46fe;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(43, 70, 254, 0.2);
  transition: all 0.2s ease;
}

:deep(.n-button--primary-type:hover) {
  background-color: #1e3bfe;
  border-color: #1e3bfe;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(43, 70, 254, 0.3);
}

:deep(.n-button--primary-type:focus) {
  background-color: #1e3bfe;
  border-color: #1e3bfe;
  box-shadow: 0 0 0 3px rgba(43, 70, 254, 0.1);
}

:deep(.n-button--secondary-type) {
  background-color: #f8fafc;
  border-color: #e5e7eb;
  color: #6b7280;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

:deep(.n-button--secondary-type:hover) {
  background-color: #f1f5f9;
  border-color: #d1d5db;
  color: #374151;
}

:deep(.n-tabs .n-tabs-tab--active) {
  color: #2b46fe;
  font-weight: 600;
}

:deep(.n-tabs .n-tabs-bar) {
  background-color: #2b46fe;
}

:deep(.n-progress .n-progress-graph .n-progress-graph-line-fill) {
  background-color: #2b46fe;
}

:deep(.n-tag--primary-type) {
  background-color: rgba(43, 70, 254, 0.1);
  color: #2b46fe;
  border-color: rgba(43, 70, 254, 0.2);
  font-weight: 600;
  border-radius: 6px;
}

:deep(.n-tag--success-type) {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.2);
  font-weight: 600;
  border-radius: 6px;
}

:deep(.n-tag--warning-type) {
  background-color: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.2);
  font-weight: 600;
  border-radius: 6px;
}

:deep(.n-tag--error-type) {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.2);
  font-weight: 600;
  border-radius: 6px;
}

/* 滚动条样式 */
.left-sidebar::-webkit-scrollbar {
  width: 6px;
}

.left-sidebar::-webkit-scrollbar-track {
  background: #f8fafc;
}

.left-sidebar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.left-sidebar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
