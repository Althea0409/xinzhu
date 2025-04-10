<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NCard, NEmpty, NModal, NProgress, NTabPane, NTabs, NTag } from 'naive-ui';
import type { StudentInfo } from '../types';

interface Props {
  /** 是否显示弹窗 */
  show: boolean;
  /** 学生信息 */
  student: StudentInfo;
  /** 标题 */
  title?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  /** 关闭弹窗事件 */
  (e: 'close'): void;
  /** 更新show状态事件 */
  (e: 'update:show', value: boolean): void;
}>();

/** 雷达图数据 */
interface RadarData {
  /** 能力指标名称 */
  name: string;
  /** 能力指标值 */
  value: number;
}

/** 学生能力指标数据 */
const radarData = ref<RadarData[]>([
  { name: '知识', value: 80 },
  { name: '思维', value: 75 },
  { name: '探究', value: 70 },
  { name: '表达', value: 65 }
]);

// 学生学习行为数据
const learningBehaviors = ref([
  { name: '课堂参与度', value: 85 },
  { name: '作业完成率', value: 92 },
  { name: '在线学习时长', value: 78 },
  { name: '知识掌握度', value: 80 }
]);

// 个性化资源推荐
interface LearningResource {
  id: string;
  title: string;
  type: '视频' | '文档' | '习题' | '实验';
  tags: string[];
  difficulty: '基础' | '提高' | '挑战';
  duration: string;
  matchScore: number;
  link: string;
}

const recommendedResources = ref<LearningResource[]>([
  {
    id: 'res001',
    title: '数学概念深度理解',
    type: '视频',
    tags: ['数学', '概念学习'],
    difficulty: '基础',
    duration: '15分钟',
    matchScore: 95,
    link: '#'
  },
  {
    id: 'res002',
    title: '数学应用能力训练',
    type: '习题',
    tags: ['数学', '应用题'],
    difficulty: '提高',
    matchScore: 90,
    duration: '30分钟',
    link: '#'
  },
  {
    id: 'res003',
    title: '空间想象力培养',
    type: '实验',
    tags: ['数学', '几何'],
    difficulty: '挑战',
    matchScore: 85,
    duration: '45分钟',
    link: '#'
  }
]);

// 学习问题与改进建议
const learningIssues = ref([
  {
    issue: '数学应用能力有待提高',
    suggestion: '多做与实际生活相关的应用题，增强知识与实际问题的联系'
  },
  {
    issue: '抽象思维能力强但表达不够清晰',
    suggestion: '加强数学语言表达训练，学会用准确的语言描述解题思路'
  }
]);

/** 处理关闭事件 */
function handleClose() {
  emit('update:show', false);
  emit('close');
}

/** 计算雷达图顶点坐标 */
function calculateRadarPoint(value: number, index: number, total: number) {
  const radius = 35;
  const centerX = 50;
  const centerY = 50;
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const ratio = value / 100;

  return {
    x: centerX + radius * ratio * Math.cos(angle),
    y: centerY + radius * ratio * Math.sin(angle)
  };
}

/** 获取雷达图多边形顶点坐标字符串 */
function getPolygonPoints() {
  return radarData.value
    .map((item, index) => {
      const point = calculateRadarPoint(item.value, index, radarData.value.length);
      return `${point.x},${point.y}`;
    })
    .join(' ');
}

/** 雷达图多边形顶点坐标 */
const radarPoints = ref(getPolygonPoints());

/** 绘制雷达图 */
function drawRadarChart() {
  radarPoints.value = getPolygonPoints();
}

/** 获取标签位置样式 */
function getLabelPosition(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = 50;
  const centerX = 50;
  const centerY = 50;

  // 计算标签位置
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return {
    '--top': `${y}%`,
    '--left': `${x}%`
  };
}

/** 可用于显示的标签 */
const labels = ['知识', '思\n维', '探究', '表\n达'];

// 激活的标签页
const activeTab = ref('analysis');

// 根据匹配度获取颜色
function getMatchColor(score: number): 'success' | 'info' | 'warning' | 'primary' | 'default' | 'error' {
  if (score >= 90) return 'success';
  if (score >= 75) return 'info';
  return 'warning';
}

// 打开资源
function openResource(resource: LearningResource) {
  // 这里可以根据实际需求实现资源打开逻辑
  //   console.log('打开资源', resource);
  window.open(resource.link, '_blank');
}

onMounted(() => {
  drawRadarChart();
});
</script>

<template>
  <NModal :show="props.show" preset="card" class="max-w-[90vw] w-[800px]" @update:show="handleClose">
    <NCard
      :bordered="false"
      size="huge"
      :title="props.title || `${props.student.name} - 智能学情分析 & 个性化资源推荐`"
      class="overflow-hidden"
    >
      <NTabs v-model:value="activeTab" type="line" animated>
        <NTabPane name="analysis" tab="学情分析">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- 左侧：基本信息和学习特征 -->
            <div class="space-y-6">
              <!-- 基本信息 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">基本信息</h3>
                <div class="text-sm text-gray-600 space-y-2">
                  <div class="flex items-center">
                    <span class="w-20">班级:</span>
                    <span>{{ props.student.className }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-20">学号:</span>
                    <span>{{ props.student.id }}</span>
                  </div>
                </div>
              </section>

              <!-- 学习特征 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">学习行为数据</h3>
                <div class="space-y-3">
                  <div v-for="item in learningBehaviors" :key="item.name">
                    <div class="mb-1 flex items-center justify-between">
                      <span class="text-sm text-gray-600">{{ item.name }}</span>
                      <span class="text-sm font-medium">{{ item.value }}%</span>
                    </div>
                    <NProgress
                      type="line"
                      :percentage="item.value"
                      :height="8"
                      :border-radius="4"
                      :color="item.value > 85 ? '#18a058' : item.value > 70 ? '#2080f0' : '#f0a020'"
                    />
                  </div>
                </div>
              </section>

              <!-- 学习问题与改进建议 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">问题分析与改进建议</h3>
                <div class="space-y-4">
                  <div
                    v-for="(item, index) in learningIssues"
                    :key="index"
                    class="border-l-4 border-blue-500 rounded bg-white p-3"
                  >
                    <div class="mb-1 text-sm text-gray-700 font-medium">{{ item.issue }}</div>
                    <div class="text-xs text-gray-600">{{ item.suggestion }}</div>
                  </div>
                </div>
              </section>
            </div>

            <!-- 右侧：能力雷达图 -->
            <div class="space-y-6">
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">能力雷达图</h3>
                <div class="relative h-64 w-full">
                  <div class="radar-chart-container">
                    <!-- 雷达环 -->
                    <div
                      v-for="(_, index) in 3"
                      :key="index"
                      class="radar-circle"
                      :class="`radar-scale-${(index + 1) * 33}`"
                    ></div>

                    <!-- 雷达轴 -->
                    <div
                      v-for="(_, index) in 5"
                      :key="index"
                      class="radar-axis"
                      :class="`radar-angle-${index * 72}`"
                    ></div>

                    <!-- 雷达标签 -->
                    <div
                      v-for="(label, index) in labels"
                      :key="index"
                      class="radar-label"
                      :style="getLabelPosition(index, labels.length)"
                    >
                      {{ label }}
                    </div>

                    <!-- 数据图形 -->
                    <svg class="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
                      <!-- 填充区域 -->
                      <polygon
                        :points="radarPoints"
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="#3b82f6"
                        stroke-width="2"
                      ></polygon>

                      <!-- 数据点 -->
                      <template v-for="(item, index) in radarData" :key="index">
                        <circle
                          :cx="calculateRadarPoint(item.value, index, radarData.length).x"
                          :cy="calculateRadarPoint(item.value, index, radarData.length).y"
                          r="3"
                          fill="#3b82f6"
                        ></circle>
                      </template>
                    </svg>
                  </div>
                </div>
              </section>

              <!-- 学科成绩概览 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">学科表现</h3>
                <div class="space-y-3">
                  <!-- 数学 -->
                  <div>
                    <div class="mb-1 flex items-center justify-between">
                      <span class="text-sm text-gray-600">数学</span>
                      <div class="flex items-center">
                        <span class="text-sm font-medium">92分</span>
                        <span class="ml-2 text-xs text-gray-500">班级排名: 5</span>
                      </div>
                    </div>
                    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div class="h-full w-[92%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <!-- 语文 -->
                  <div>
                    <div class="mb-1 flex items-center justify-between">
                      <span class="text-sm text-gray-600">语文</span>
                      <div class="flex items-center">
                        <span class="text-sm font-medium">88分</span>
                        <span class="ml-2 text-xs text-gray-500">班级排名: 10</span>
                      </div>
                    </div>
                    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div class="h-full w-[88%] rounded-full bg-blue-500"></div>
                    </div>
                  </div>

                  <!-- 英语 -->
                  <div>
                    <div class="mb-1 flex items-center justify-between">
                      <span class="text-sm text-gray-600">英语</span>
                      <div class="flex items-center">
                        <span class="text-sm font-medium">85分</span>
                        <span class="ml-2 text-xs text-gray-500">班级排名: 15</span>
                      </div>
                    </div>
                    <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div class="h-full w-[85%] rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </NTabPane>

        <!-- 个性化资源推荐 -->
        <NTabPane name="resources" tab="资源推荐">
          <div class="p-4">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-base text-gray-700 font-medium">个性化学习资源推荐</h3>
              <NTag type="info">根据学生学习数据智能推荐</NTag>
            </div>

            <div class="space-y-4">
              <div v-if="recommendedResources.length === 0" class="py-8">
                <NEmpty description="暂无推荐资源" />
              </div>

              <div
                v-for="resource in recommendedResources"
                :key="resource.id"
                class="cursor-pointer border border-gray-100 rounded-lg bg-white p-4 transition-shadow hover:shadow-md"
                @click="openResource(resource)"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="mb-1 text-base text-gray-800 font-medium">{{ resource.title }}</h4>
                    <div class="mb-2 flex items-center gap-2">
                      <NTag
                        size="small"
                        :type="resource.type === '视频' ? 'success' : resource.type === '习题' ? 'warning' : 'info'"
                      >
                        {{ resource.type }}
                      </NTag>
                      <span class="text-xs text-gray-500">{{ resource.duration }}</span>
                      <span class="text-xs text-gray-500">难度: {{ resource.difficulty }}</span>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <NTag v-for="tag in resource.tags" :key="tag" size="small" type="default">{{ tag }}</NTag>
                    </div>
                  </div>
                  <NTag :type="getMatchColor(resource.matchScore)">匹配度 {{ resource.matchScore }}%</NTag>
                </div>
              </div>
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </NModal>
</template>

<style scoped>
.radar-chart-container {
  --uno: absolute inset-0 flex items-center justify-center;
  perspective: 1000px;
}

.radar-circle {
  --uno: absolute border border-gray-200 rounded-full;
}

.radar-scale-33 {
  width: calc(100% * 0.33);
  height: calc(100% * 0.33);
  top: calc(50% - 50% * 0.33);
  left: calc(50% - 50% * 0.33);
}

.radar-scale-66 {
  width: calc(100% * 0.66);
  height: calc(100% * 0.66);
  top: calc(50% - 50% * 0.66);
  left: calc(50% - 50% * 0.66);
}

.radar-scale-99 {
  width: calc(100% * 0.99);
  height: calc(100% * 0.99);
  top: calc(50% - 50% * 0.99);
  left: calc(50% - 50% * 0.99);
}

.radar-axis {
  --uno: absolute top-1/2 left-0 w-full border-t border-gray-200;
  transform-origin: center;
}

.radar-angle-0 {
  transform: rotate(0deg);
}

.radar-angle-72 {
  transform: rotate(72deg);
}

.radar-angle-144 {
  transform: rotate(144deg);
}

.radar-angle-216 {
  transform: rotate(216deg);
}

.radar-angle-288 {
  transform: rotate(288deg);
}

.radar-label {
  --uno: absolute text-xs font-medium text-gray-500;
  top: var(--top);
  left: var(--left);
  transform: translate(-50%, -50%);
  white-space: pre-line;
  text-align: center;
}

.radar-label:nth-child(1) {
  transform: translate(-50%, -100%);
}

.radar-label:nth-child(2) {
  transform: translate(-50%, 0);
}

.radar-label:nth-child(3) {
  transform: translate(-100%, -50%);
}

.radar-label:nth-child(4) {
  transform: translate(0, -50%);
}
</style>
