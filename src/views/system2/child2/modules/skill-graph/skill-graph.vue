<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SkillNode, StudentInfo } from '../types';

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

// 技能图谱数据
const skillGraphData = ref<SkillNode[]>([
  {
    id: 'math-basic',
    name: '数学基础',
    level: 1,
    mastery: 85,
    category: '基础技能',
    prerequisites: [],
    children: [
      {
        id: 'math-algebra',
        name: '代数运算',
        level: 2,
        mastery: 78,
        category: '数学',
        prerequisites: ['math-basic']
      },
      {
        id: 'math-geometry',
        name: '几何图形',
        level: 2,
        mastery: 82,
        category: '数学',
        prerequisites: ['math-basic']
      }
    ]
  },
  {
    id: 'language-basic',
    name: '语言基础',
    level: 1,
    mastery: 90,
    category: '基础技能',
    prerequisites: [],
    children: [
      {
        id: 'language-reading',
        name: '阅读理解',
        level: 2,
        mastery: 88,
        category: '语文',
        prerequisites: ['language-basic']
      },
      {
        id: 'language-writing',
        name: '写作表达',
        level: 2,
        mastery: 75,
        category: '语文',
        prerequisites: ['language-basic']
      }
    ]
  },
  {
    id: 'science-basic',
    name: '科学基础',
    level: 1,
    mastery: 80,
    category: '基础技能',
    prerequisites: [],
    children: [
      {
        id: 'science-physics',
        name: '物理概念',
        level: 2,
        mastery: 72,
        category: '科学',
        prerequisites: ['science-basic']
      },
      {
        id: 'science-chemistry',
        name: '化学原理',
        level: 2,
        mastery: 68,
        category: '科学',
        prerequisites: ['science-basic']
      }
    ]
  }
]);

// 获取技能掌握程度的颜色
function getMasteryColor(mastery: number): string {
  if (mastery >= 90) return 'bg-green-500';
  if (mastery >= 80) return 'bg-blue-500';
  if (mastery >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
}

// 获取技能掌握程度的文本颜色
function getMasteryTextColor(mastery: number): string {
  if (mastery >= 90) return 'text-green-600';
  if (mastery >= 80) return 'text-blue-600';
  if (mastery >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

// 获取技能掌握程度的描述
function getMasteryDescription(mastery: number): string {
  if (mastery >= 90) return '精通';
  if (mastery >= 80) return '熟练';
  if (mastery >= 70) return '一般';
  return '待提升';
}

function handleClose() {
  showModal.value = false;
}
</script>

<template>
  <NModal
    v-model:show="showModal"
    :mask-closable="false"
    preset="card"
    class="max-w-6xl w-full"
    title=""
    size="huge"
    :bordered="false"
    :segmented="false"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-lg text-gray-800 font-semibold">{{ props.student?.name }} - 技能图谱分析</h2>
        <NButton quaternary circle @click="handleClose">
          <template #icon>
            <div class="i-carbon-close text-lg" />
          </template>
        </NButton>
      </div>
    </template>

    <div class="space-y-6">
      <!-- 技能概览 -->
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="mb-4 text-base text-gray-800 font-semibold">技能掌握概览</h3>
        <div class="grid grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl text-green-600 font-bold">3</div>
            <div class="text-sm text-gray-600">精通技能</div>
          </div>
          <div class="text-center">
            <div class="text-2xl text-blue-600 font-bold">2</div>
            <div class="text-sm text-gray-600">熟练技能</div>
          </div>
          <div class="text-center">
            <div class="text-2xl text-yellow-600 font-bold">1</div>
            <div class="text-sm text-gray-600">一般技能</div>
          </div>
          <div class="text-center">
            <div class="text-2xl text-red-600 font-bold">2</div>
            <div class="text-sm text-gray-600">待提升技能</div>
          </div>
        </div>
      </div>

      <!-- 技能树图谱 -->
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="mb-6 text-base text-gray-800 font-semibold">技能发展路径</h3>

        <div class="space-y-8">
          <div v-for="skillCategory in skillGraphData" :key="skillCategory.id" class="relative">
            <!-- 主技能节点 -->
            <div class="flex items-center space-x-4">
              <div class="relative">
                <div
                  class="h-16 w-16 flex items-center justify-center border-4 border-white rounded-full shadow-lg"
                  :class="[getMasteryColor(skillCategory.mastery)]"
                >
                  <div class="text-center">
                    <div class="text-xs text-white font-bold">{{ skillCategory.mastery }}%</div>
                  </div>
                </div>
                <div
                  class="absolute h-6 w-6 flex items-center justify-center rounded-full bg-white shadow -bottom-1 -right-1"
                >
                  <div class="text-xs text-gray-600 font-bold">L{{ skillCategory.level }}</div>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-gray-800 font-semibold">{{ skillCategory.name }}</h4>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">{{ skillCategory.category }}</span>
                  <span class="text-sm font-medium" :class="[getMasteryTextColor(skillCategory.mastery)]">
                    {{ getMasteryDescription(skillCategory.mastery) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 子技能节点 -->
            <div v-if="skillCategory.children && skillCategory.children.length > 0" class="ml-8 mt-4">
              <div class="relative">
                <!-- 连接线 -->
                <div class="absolute left-4 top-0 h-full w-px bg-gray-300" />

                <div class="space-y-4">
                  <div
                    v-for="childSkill in skillCategory.children"
                    :key="childSkill.id"
                    class="relative flex items-center space-x-4"
                  >
                    <!-- 连接线 -->
                    <div class="absolute left-4 top-6 h-px w-4 bg-gray-300" />

                    <!-- 子技能节点 -->
                    <div class="relative">
                      <div
                        class="h-12 w-12 flex items-center justify-center border-4 border-white rounded-full shadow-md"
                        :class="[getMasteryColor(childSkill.mastery)]"
                      >
                        <div class="text-xs text-white font-bold">{{ childSkill.mastery }}%</div>
                      </div>
                      <div
                        class="absolute h-5 w-5 flex items-center justify-center rounded-full bg-white shadow -bottom-1 -right-1"
                      >
                        <div class="text-xs text-gray-600 font-bold">L{{ childSkill.level }}</div>
                      </div>
                    </div>

                    <div class="flex-1">
                      <h5 class="text-gray-700 font-medium">{{ childSkill.name }}</h5>
                      <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500">{{ childSkill.category }}</span>
                        <span class="text-sm font-medium" :class="[getMasteryTextColor(childSkill.mastery)]">
                          {{ getMasteryDescription(childSkill.mastery) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能发展建议 -->
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="mb-4 text-base text-gray-800 font-semibold">技能发展建议</h3>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h4 class="text-blue-800 font-medium">优先提升技能</h4>
            <p class="mt-1 text-sm text-blue-700">
              建议重点关注化学原理和写作表达技能的提升，这些技能对整体学习能力有重要影响。
            </p>
          </div>
          <div class="border-l-4 border-green-500 bg-green-50 p-4">
            <h4 class="text-green-800 font-medium">强化优势技能</h4>
            <p class="mt-1 text-sm text-green-700">
              继续保持语言基础和阅读理解的优势，可以作为其他技能学习的基础支撑。
            </p>
          </div>
          <div class="border-l-4 border-yellow-500 bg-yellow-50 p-4">
            <h4 class="text-yellow-800 font-medium">技能发展路径</h4>
            <p class="mt-1 text-sm text-yellow-700">
              建议按照基础技能 → 专业技能 → 应用技能的路径进行系统性学习和提升。
            </p>
          </div>
        </div>
      </div>

      <!-- 技能统计 -->
      <div class="border border-gray-200 rounded-lg p-6">
        <h3 class="mb-4 text-base text-gray-800 font-semibold">技能统计分析</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="mb-3 text-gray-700 font-medium">各类别技能分布</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">基础技能</span>
                <div class="flex items-center space-x-2">
                  <div class="h-2 w-20 rounded-full bg-gray-200">
                    <div class="h-2 w-full rounded-full bg-blue-500" />
                  </div>
                  <span class="text-sm font-medium">100%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">专业技能</span>
                <div class="flex items-center space-x-2">
                  <div class="h-2 w-20 rounded-full bg-gray-200">
                    <div class="h-2 w-4/5 rounded-full bg-green-500" />
                  </div>
                  <span class="text-sm font-medium">80%</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">应用技能</span>
                <div class="flex items-center space-x-2">
                  <div class="h-2 w-20 rounded-full bg-gray-200">
                    <div class="h-2 w-3/5 rounded-full bg-yellow-500" />
                  </div>
                  <span class="text-sm font-medium">60%</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="mb-3 text-gray-700 font-medium">技能发展趋势</h4>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 rounded-full bg-green-500" />
                <span class="text-sm text-gray-600">上升趋势：5个技能</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 rounded-full bg-blue-500" />
                <span class="text-sm text-gray-600">稳定状态：2个技能</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 rounded-full bg-yellow-500" />
                <span class="text-sm text-gray-600">需要关注：1个技能</span>
              </div>
            </div>
          </div>
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
