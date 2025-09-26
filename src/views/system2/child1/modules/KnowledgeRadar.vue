<script setup lang="ts">
import { computed, ref } from 'vue';
import { NCard, NTag } from 'naive-ui';

defineOptions({
  name: 'KnowledgeRadar'
});

interface KnowledgePoint {
  name: string;
  score: number;
  maxScore: number;
  level: 'excellent' | 'good' | 'average' | 'poor';
}

// 语文知识点数据
const knowledgeData = ref<KnowledgePoint[]>([
  { name: '阅读理解', score: 85, maxScore: 100, level: 'excellent' },
  { name: '文言文', score: 72, maxScore: 100, level: 'good' },
  { name: '现代文阅读', score: 78, maxScore: 100, level: 'good' },
  { name: '作文写作', score: 68, maxScore: 100, level: 'average' },
  { name: '基础知识', score: 88, maxScore: 100, level: 'excellent' },
  { name: '诗词鉴赏', score: 65, maxScore: 100, level: 'average' }
]);

const radarPoints = computed(() => {
  const centerX = 120;
  const centerY = 120;
  const radius = 80;
  const angleStep = (2 * Math.PI) / knowledgeData.value.length;

  return knowledgeData.value.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const ratio = item.score / item.maxScore;
    const x = centerX + radius * ratio * Math.cos(angle);
    const y = centerY + radius * ratio * Math.sin(angle);
    return { x, y, angle, ratio };
  });
});

const polygonPoints = computed(() => {
  return radarPoints.value.map(point => `${point.x},${point.y}`).join(' ');
});

const axisLines = computed(() => {
  const centerX = 120;
  const centerY = 120;
  const radius = 80;
  const angleStep = (2 * Math.PI) / knowledgeData.value.length;

  return knowledgeData.value.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x1: centerX, y1: centerY, x2: x, y2: y };
  });
});

const labelPositions = computed(() => {
  const centerX = 120;
  const centerY = 120;
  const radius = 100;
  const angleStep = (2 * Math.PI) / knowledgeData.value.length;

  return knowledgeData.value.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, name: item.name, score: item.score };
  });
});

function getLevelColor(level: string): string {
  const colors = {
    excellent: '#2B46FE',
    good: '#4C6EFF',
    average: '#FFA726',
    poor: '#EF5350'
  };
  return colors[level as keyof typeof colors] || '#9E9E9E';
}

function getLevelText(level: string): string {
  const texts = {
    excellent: '优秀',
    good: '良好',
    average: '一般',
    poor: '待提升'
  };
  return texts[level as keyof typeof texts] || '未知';
}
</script>

<template>
  <NCard title="知识点掌握雷达图" class="h-full">
    <div class="space-y-6">
      <!-- 雷达图 -->
      <div class="flex justify-center">
        <svg width="240" height="240" class="overflow-visible">
          <!-- 背景网格 -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" stroke-width="1" />
            </pattern>
          </defs>

          <!-- 同心圆 -->
          <circle cx="120" cy="120" r="20" fill="none" stroke="#e0e0e0" stroke-width="1" />
          <circle cx="120" cy="120" r="40" fill="none" stroke="#e0e0e0" stroke-width="1" />
          <circle cx="120" cy="120" r="60" fill="none" stroke="#e0e0e0" stroke-width="1" />
          <circle cx="120" cy="120" r="80" fill="none" stroke="#e0e0e0" stroke-width="1" />

          <!-- 轴线 -->
          <g v-for="line in axisLines" :key="`axis-${line.x2}-${line.y2}`">
            <line :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" stroke="#e0e0e0" stroke-width="1" />
          </g>

          <!-- 数据区域 -->
          <polygon :points="polygonPoints" fill="rgba(43, 70, 254, 0.2)" stroke="#2B46FE" stroke-width="2" />

          <!-- 数据点 -->
          <g v-for="(point, index) in radarPoints" :key="`point-${index}`">
            <circle :cx="point.x" :cy="point.y" r="4" :fill="getLevelColor(knowledgeData[index].level)" />
          </g>

          <!-- 标签 -->
          <g v-for="(label, index) in labelPositions" :key="`label-${index}`">
            <text
              :x="label.x"
              :y="label.y"
              text-anchor="middle"
              dominant-baseline="middle"
              class="fill-gray-700 text-xs font-medium"
            >
              {{ label.name }}
            </text>
            <text
              :x="label.x"
              :y="label.y + 12"
              text-anchor="middle"
              dominant-baseline="middle"
              class="fill-blue-600 text-xs font-semibold"
            >
              {{ label.score }}分
            </text>
          </g>
        </svg>
      </div>

      <!-- 知识点详情 -->
      <div class="space-y-3">
        <h4 class="text-base text-gray-800 font-medium">知识点详情</h4>
        <NGrid :cols="2" :x-gap="16" :y-gap="12">
          <NGridItem v-for="item in knowledgeData" :key="item.name">
            <div class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
              <div class="flex items-center space-x-3">
                <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: getLevelColor(item.level) }"></div>
                <span class="text-sm text-gray-700 font-medium">{{ item.name }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-900 font-semibold">{{ item.score }}分</span>
                <NTag
                  :type="
                    item.level === 'excellent'
                      ? 'success'
                      : item.level === 'good'
                        ? 'info'
                        : item.level === 'average'
                          ? 'warning'
                          : 'error'
                  "
                  size="small"
                >
                  {{ getLevelText(item.level) }}
                </NTag>
              </div>
            </div>
          </NGridItem>
        </NGrid>
      </div>

      <!-- 改进建议 -->
      <div class="improvement-suggestions">
        <div class="suggestions-header">
          <div class="header-icon">💡</div>
          <h5 class="header-title">改进建议</h5>
        </div>

        <div class="suggestions-content">
          <div class="suggestion-item">
            <div class="suggestion-icon">🎯</div>
            <span class="suggestion-text">作文写作和诗词鉴赏需要重点关注，建议增加专项练习</span>
          </div>

          <div class="suggestion-item">
            <div class="suggestion-icon">⭐</div>
            <span class="suggestion-text">阅读理解和基础知识掌握良好，可作为优势项目继续保持</span>
          </div>

          <div class="suggestion-item">
            <div class="suggestion-icon">📚</div>
            <span class="suggestion-text">文言文理解有待提升，建议加强古文背景知识学习</span>
          </div>

          <div class="suggestion-item">
            <div class="suggestion-icon">🔥</div>
            <span class="suggestion-text">现代文阅读技巧需要进一步巩固，多做题型分析</span>
          </div>
        </div>
      </div>
    </div>
  </NCard>
</template>

<style scoped>
/* 改进建议样式 */
.improvement-suggestions {
  background: linear-gradient(135deg, #fff9e6 0%, #fff4d6 100%);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #faad14;
  box-shadow: 0 2px 8px rgba(250, 173, 20, 0.1);
}

.suggestions-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(250, 173, 20, 0.2);
}

.header-icon {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #d48806;
  margin: 0;
}

.suggestions-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(250, 173, 20, 0.15);
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(250, 173, 20, 0.15);
  transform: translateY(-1px);
}

.suggestion-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  margin-top: 2px;
}

.suggestion-text {
  font-size: 14px;
  color: #8c6e1f;
  line-height: 1.5;
  font-weight: 500;
  flex: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .improvement-suggestions {
    padding: 16px;
  }

  .suggestion-item {
    padding: 10px;
  }

  .suggestion-text {
    font-size: 13px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.improvement-suggestions {
  animation: fadeInUp 0.6s ease-out;
}

.suggestion-item {
  animation: fadeInUp 0.6s ease-out;
}

.suggestion-item:nth-child(1) {
  animation-delay: 0.1s;
}
.suggestion-item:nth-child(2) {
  animation-delay: 0.2s;
}
.suggestion-item:nth-child(3) {
  animation-delay: 0.3s;
}
.suggestion-item:nth-child(4) {
  animation-delay: 0.4s;
}
</style>
