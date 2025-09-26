<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { NButton, NModal } from 'naive-ui';
import type { KnowledgeNode, StudentInfo } from '../types';

interface Props {
  show: boolean;
  student: StudentInfo | null;
}

interface Emits {
  (e: 'update:show', value: boolean): void;
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => {
    emit('update:show', value);
    if (!value) {
      emit('close');
    }
  }
});

// 知识图谱数据
const knowledgeGraphData = ref<KnowledgeNode[]>([
  {
    id: 'algebra-basic',
    name: '代数基础',
    type: 'concept',
    mastery: 85,
    difficulty: 3,
    connections: ['equation-solving', 'function-basic'],
    position: { x: 200, y: 100 }
  },
  {
    id: 'equation-solving',
    name: '方程求解',
    type: 'skill',
    mastery: 78,
    difficulty: 4,
    connections: ['algebra-basic', 'linear-equation'],
    position: { x: 400, y: 150 }
  },
  {
    id: 'function-basic',
    name: '函数基础',
    type: 'concept',
    mastery: 82,
    difficulty: 4,
    connections: ['algebra-basic', 'function-graph'],
    position: { x: 200, y: 250 }
  },
  {
    id: 'linear-equation',
    name: '线性方程',
    type: 'application',
    mastery: 75,
    difficulty: 5,
    connections: ['equation-solving'],
    position: { x: 600, y: 100 }
  },
  {
    id: 'function-graph',
    name: '函数图像',
    type: 'application',
    mastery: 70,
    difficulty: 5,
    connections: ['function-basic'],
    position: { x: 400, y: 300 }
  },
  {
    id: 'geometry-basic',
    name: '几何基础',
    type: 'concept',
    mastery: 88,
    difficulty: 3,
    connections: ['triangle-properties', 'circle-properties'],
    position: { x: 200, y: 400 }
  },
  {
    id: 'triangle-properties',
    name: '三角形性质',
    type: 'skill',
    mastery: 80,
    difficulty: 4,
    connections: ['geometry-basic'],
    position: { x: 400, y: 450 }
  },
  {
    id: 'circle-properties',
    name: '圆的性质',
    type: 'skill',
    mastery: 72,
    difficulty: 4,
    connections: ['geometry-basic'],
    position: { x: 400, y: 350 }
  }
]);

// 选中的知识点
const selectedNode = ref<KnowledgeNode | null>(null);

// 获取知识点类型的颜色
function getNodeTypeColor(type: string): string {
  switch (type) {
    case 'concept':
      return 'bg-blue-500';
    case 'skill':
      return 'bg-green-500';
    case 'application':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
}

// 获取知识点类型的文本颜色
function getNodeTypeTextColor(type: string): string {
  switch (type) {
    case 'concept':
      return 'text-blue-600';
    case 'skill':
      return 'text-green-600';
    case 'application':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
}

// 获取知识点类型的描述
function getNodeTypeDescription(type: string): string {
  switch (type) {
    case 'concept':
      return '概念';
    case 'skill':
      return '技能';
    case 'application':
      return '应用';
    default:
      return '未知';
  }
}

// 获取掌握程度的颜色
function getMasteryColor(mastery: number): string {
  if (mastery >= 85) return 'text-green-600';
  if (mastery >= 75) return 'text-blue-600';
  if (mastery >= 65) return 'text-yellow-600';
  return 'text-red-600';
}

// 获取难度星级
function getDifficultyStars(difficulty: number): string {
  return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
}

// 选择知识点
function selectNode(node: KnowledgeNode) {
  selectedNode.value = node;
}

// 获取连接的知识点
function getConnectedNodes(nodeId: string): KnowledgeNode[] {
  const node = knowledgeGraphData.value.find(n => n.id === nodeId);
  if (!node) return [];

  return knowledgeGraphData.value.filter(n => node.connections.includes(n.id) || n.connections.includes(nodeId));
}

function handleClose() {
  showModal.value = false;
}

onMounted(() => {
  // 默认选择第一个知识点
  if (knowledgeGraphData.value.length > 0) {
    selectedNode.value = knowledgeGraphData.value[0];
  }
});
</script>

<template>
  <NModal
    v-model:show="showModal"
    :mask-closable="false"
    preset="card"
    class="max-w-7xl w-full"
    title=""
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-lg text-gray-800 font-semibold">{{ props.student?.name }} - 知识图谱分析</h2>
        <NButton quaternary circle @click="handleClose">
          <template #icon>
            <div class="i-carbon-close text-lg" />
          </template>
        </NButton>
      </div>
    </template>

    <div class="grid grid-cols-3 gap-6">
      <!-- 知识图谱可视化 -->
      <div class="col-span-2">
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">知识关系图谱</h3>

          <!-- 图谱容器 -->
          <div class="relative h-96 overflow-hidden rounded-lg bg-gray-50">
            <!-- 连接线 -->
            <svg class="absolute inset-0 h-full w-full">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                </marker>
              </defs>

              <g v-for="node in knowledgeGraphData" :key="`connections-${node.id}`">
                <line
                  v-for="connectionId in node.connections"
                  :key="`${node.id}-${connectionId}`"
                  :x1="node.position.x + 30"
                  :y1="node.position.y + 30"
                  :x2="(knowledgeGraphData.find(n => n.id === connectionId)?.position.x || 0) + 30"
                  :y2="(knowledgeGraphData.find(n => n.id === connectionId)?.position.y || 0) + 30"
                  stroke="#9CA3AF"
                  stroke-width="2"
                  marker-end="url(#arrowhead)"
                />
              </g>
            </svg>

            <!-- 知识点节点 -->
            <div
              v-for="node in knowledgeGraphData"
              :key="node.id"
              :style="{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`
              }"
              class="absolute cursor-pointer transition-all duration-200 hover:scale-110"
              :class="[selectedNode?.id === node.id ? 'z-10 scale-110' : 'z-0']"
              @click="selectNode(node)"
            >
              <div
                class="h-16 w-16 flex items-center justify-center border-4 border-white rounded-full shadow-lg"
                :class="[getNodeTypeColor(node.type), selectedNode?.id === node.id ? 'ring-4 ring-blue-300' : '']"
              >
                <div class="text-center">
                  <div class="text-xs text-white font-bold">{{ node.mastery }}%</div>
                </div>
              </div>
              <div class="mt-1 text-center">
                <div class="text-xs text-gray-700 font-medium">{{ node.name }}</div>
              </div>
            </div>
          </div>

          <!-- 图例 -->
          <div class="mt-4 flex items-center justify-center space-x-6">
            <div class="flex items-center space-x-2">
              <div class="h-4 w-4 rounded-full bg-blue-500" />
              <span class="text-sm text-gray-600">概念</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="h-4 w-4 rounded-full bg-green-500" />
              <span class="text-sm text-gray-600">技能</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="h-4 w-4 rounded-full bg-purple-500" />
              <span class="text-sm text-gray-600">应用</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 知识点详情 -->
      <div class="space-y-6">
        <!-- 选中知识点信息 -->
        <div v-if="selectedNode" class="border border-gray-200 rounded-lg p-4">
          <h3 class="mb-3 text-base text-gray-800 font-semibold">知识点详情</h3>
          <div class="space-y-3">
            <div>
              <div class="text-sm text-gray-600">名称</div>
              <div class="font-medium">{{ selectedNode.name }}</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">类型</div>
              <div class="font-medium" :class="[getNodeTypeTextColor(selectedNode.type)]">
                {{ getNodeTypeDescription(selectedNode.type) }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-600">掌握程度</div>
              <div class="font-medium" :class="[getMasteryColor(selectedNode.mastery)]">
                {{ selectedNode.mastery }}%
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-600">难度等级</div>
              <div class="text-yellow-600 font-medium">
                {{ getDifficultyStars(selectedNode.difficulty) }}
              </div>
            </div>
          </div>
        </div>

        <!-- 关联知识点 -->
        <div v-if="selectedNode" class="border border-gray-200 rounded-lg p-4">
          <h3 class="mb-3 text-base text-gray-800 font-semibold">关联知识点</h3>
          <div class="space-y-2">
            <div
              v-for="connectedNode in getConnectedNodes(selectedNode.id)"
              :key="connectedNode.id"
              class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
              @click="selectNode(connectedNode)"
            >
              <div class="flex items-center space-x-2">
                <div class="h-3 w-3 rounded-full" :class="[getNodeTypeColor(connectedNode.type)]" />
                <span class="text-sm font-medium">{{ connectedNode.name }}</span>
              </div>
              <span class="text-xs" :class="[getMasteryColor(connectedNode.mastery)]">
                {{ connectedNode.mastery }}%
              </span>
            </div>
          </div>
        </div>

        <!-- 学习建议 -->
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="mb-3 text-base text-gray-800 font-semibold">学习建议</h3>
          <div class="space-y-3">
            <div class="rounded-lg bg-blue-50 p-3">
              <h4 class="text-sm text-blue-800 font-medium">优先学习</h4>
              <p class="mt-1 text-xs text-blue-700">建议先巩固基础概念，再学习相关技能</p>
            </div>
            <div class="rounded-lg bg-green-50 p-3">
              <h4 class="text-sm text-green-800 font-medium">强化练习</h4>
              <p class="mt-1 text-xs text-green-700">通过应用题目加深对知识点的理解</p>
            </div>
            <div class="rounded-lg bg-yellow-50 p-3">
              <h4 class="text-sm text-yellow-800 font-medium">关联学习</h4>
              <p class="mt-1 text-xs text-yellow-700">注意知识点之间的联系和应用</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 知识掌握统计 -->
    <div class="mt-6 border border-gray-200 rounded-lg p-6">
      <h3 class="mb-4 text-base text-gray-800 font-semibold">知识掌握统计</h3>
      <div class="grid grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl text-blue-600 font-bold">3</div>
          <div class="text-sm text-gray-600">概念知识</div>
        </div>
        <div class="text-center">
          <div class="text-2xl text-green-600 font-bold">3</div>
          <div class="text-sm text-gray-600">技能知识</div>
        </div>
        <div class="text-center">
          <div class="text-2xl text-purple-600 font-bold">2</div>
          <div class="text-sm text-gray-600">应用知识</div>
        </div>
        <div class="text-center">
          <div class="text-2xl text-gray-600 font-bold">78%</div>
          <div class="text-sm text-gray-600">平均掌握度</div>
        </div>
      </div>
    </div>
  </NModal>
</template>

<style scoped>
:deep(.n-card-header) {
  padding: 20px 24px 0;
}

:deep(.n-card__content) {
  padding: 20px 24px 24px;
}
</style>
