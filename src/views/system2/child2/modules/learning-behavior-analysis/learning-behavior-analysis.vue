<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NModal, NTag } from 'naive-ui';
import type { StudentInfo } from '../types';

interface Props {
  /** 是否显示弹窗 */
  show: boolean;
  /** 学生信息 */
  student?: StudentInfo;
}

interface Emits {
  /** 关闭弹窗 */
  (e: 'close'): void;
  /** 更新显示状态 */
  (e: 'update:show', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const activeTab = ref('analysis');

// 资源推荐相关类型定义
type LearningResource = {
  id: string;
  title: string;
  type: string;
  tags: string[];
  difficulty: string;
  duration: string;
  matchScore: number;
  link: string;
  reason: string;
};

// 资源类型筛选
const resourceTabValue = ref('all');
const resourceTypes = [
  { label: '全部', value: 'all' },
  { label: '视频', value: '视频' },
  { label: '习题', value: '习题' },
  { label: 'AI辅导', value: 'AI辅导' },
  { label: '互动课件', value: '互动课件' },
  { label: '文档', value: '文档' },
  { label: '讨论', value: '讨论' }
];

// 根据学生ID生成个性化的资源推荐
const recommendedResources = computed<LearningResource[]>(() => {
  const studentId = props.student?.id?.toString() || '';

  if (studentId.includes('01')) {
    return [
      {
        id: 'res100',
        title: 'AI个性化语文辅导',
        type: 'AI辅导',
        tags: ['语文', '一对一', '适应性学习'],
        difficulty: '提高',
        duration: '按需',
        matchScore: 97,
        link: '#',
        reason: '基于该生学习特点的智能辅导，针对性解决薄弱环节'
      },
      {
        id: 'res101',
        title: '现代文阅读技巧视频课程',
        type: '视频',
        tags: ['现代文阅读', '阅读技巧', '理解能力'],
        difficulty: '提高',
        duration: '35分钟',
        matchScore: 94,
        link: '#',
        reason: '通过视频讲解阅读理解方法，提升文本分析能力'
      },
      {
        id: 'res102',
        title: '古诗词鉴赏方法与案例分析',
        type: '视频',
        tags: ['诗歌鉴赏', '古诗词', '文学鉴赏'],
        difficulty: '提高',
        duration: '28分钟',
        matchScore: 92,
        link: '#',
        reason: '通过经典案例分析古诗词鉴赏的方法和技巧'
      },
      {
        id: 'res103',
        title: '作文写作能力强化练习',
        type: '习题',
        tags: ['作文写作', '写作技法', '表达能力'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 93,
        link: '#',
        reason: '针对写作能力不足设计的专项练习，提升表达水平'
      },
      {
        id: 'res104',
        title: '文言文翻译技巧互动课件',
        type: '互动课件',
        tags: ['文言文', '翻译技巧', '古文理解'],
        difficulty: '提高',
        duration: '40分钟',
        matchScore: 90,
        link: '#',
        reason: '互动式学习文言文翻译方法，提高古文理解能力'
      }
    ];
  } else if (studentId.includes('02')) {
    return [
      {
        id: 'res105',
        title: '语法基础知识系统梳理',
        type: '文档',
        tags: ['语法基础', '知识梳理', '基础巩固'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 95,
        link: '#',
        reason: '系统梳理语法知识点，帮助建立完整的语法体系'
      },
      {
        id: 'res106',
        title: '字词积累专项训练',
        type: '习题',
        tags: ['字词积累', '词汇运用', '语言基础'],
        difficulty: '基础',
        duration: '20分钟',
        matchScore: 93,
        link: '#',
        reason: '针对字词掌握薄弱环节的专项训练'
      },
      {
        id: 'res107',
        title: '语言表达能力提升讨论',
        type: '讨论',
        tags: ['语言表达', '口语交际', '沟通能力'],
        difficulty: '提高',
        duration: '45分钟',
        matchScore: 91,
        link: '#',
        reason: '通过讨论交流提升语言表达和沟通能力'
      }
    ];
  }

  // 默认推荐资源
  return [
    {
      id: 'res018',
      title: '个性化学习策略指导',
      type: 'AI辅导',
      tags: ['学习方法', '个性化', '能力提升'],
      difficulty: '提高',
      duration: '按需',
      matchScore: 93,
      link: '#',
      reason: '根据学生特点提供定制化学习建议和方法指导'
    },
    {
      id: 'res019',
      title: '学科知识图谱构建',
      type: '互动课件',
      tags: ['知识体系', '思维导图', '学科关联'],
      difficulty: '提高',
      duration: '45分钟',
      matchScore: 91,
      link: '#',
      reason: '帮助学生建立知识体系，理解知识点之间的联系'
    },
    {
      id: 'res020',
      title: '语文阅读技能提升',
      type: '文档',
      tags: ['阅读能力', '语言学习', '理解力'],
      difficulty: '基础',
      duration: '30分钟',
      matchScore: 88,
      link: '#',
      reason: '提高阅读理解能力，增强语言表达和理解能力'
    }
  ];
});

// 筛选后的资源列表
const filteredResources = computed(() => {
  if (resourceTabValue.value === 'all') {
    return recommendedResources.value;
  }
  const typeMap = {
    视频: '视频',
    习题: '习题',
    AI辅导: 'AI辅导',
    互动课件: '互动课件',
    文档: '文档',
    讨论: '讨论'
  };
  return recommendedResources.value.filter(
    resource => resource.type === typeMap[resourceTabValue.value as keyof typeof typeMap]
  );
});

// 获取资源预计提升的能力点
function getImprovementAreas(resource: LearningResource): string[] {
  // 基于资源标签推断能力提升点
  const areaMap: Record<string, string[]> = {
    语文: ['语文能力', '语言表达'],
    现代文阅读: ['阅读理解', '文本分析'],
    古诗词: ['文学鉴赏', '文化素养'],
    作文写作: ['写作能力', '表达技巧'],
    文言文: ['古文理解', '文化传承'],
    语法基础: ['语法掌握', '语言规范'],
    字词积累: ['词汇量', '语言基础'],
    学习方法: ['学习效率', '自主学习'],
    知识体系: ['系统思维', '知识整合'],
    阅读能力: ['理解能力', '信息提取']
  };

  // 从资源标签中提取能力点
  const areas = new Set<string>();
  resource.tags.forEach(tag => {
    if (areaMap[tag]) {
      areaMap[tag].forEach(area => areas.add(area));
    }
  });

  // 如果没有匹配到任何能力点，返回默认值
  if (areas.size === 0) {
    if (resource.type === '视频') return ['视觉学习', '知识掌握'];
    if (resource.type === '习题') return ['应用能力', '实践能力'];
    if (resource.type === 'AI辅导') return ['个性化学习', '弱点改进'];
    return ['综合能力'];
  }

  return Array.from(areas);
}

// 资源匹配度颜色
function getResourceMatchColor(score: number): 'success' | 'info' | 'warning' | 'primary' | 'default' | 'error' {
  if (score >= 95) return 'success';
  if (score >= 90) return 'primary';
  if (score >= 80) return 'info';
  if (score >= 70) return 'warning';
  return 'default';
}

// 打开资源
function openResource(resource: LearningResource) {
  // eslint-disable-next-line no-console
  console.log('打开资源：', resource);
  // 这里可以实现具体的资源打开逻辑
}

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => {
    emit('update:show', value);
    if (!value) {
      emit('close');
    }
  }
});

// 学习行为数据
const learningBehaviorData = ref({
  adaptability: 85,
  homeworkCompletion: 92,
  behaviorDuration: 78,
  knowledgeMastery: 80
});

// 能力雷达图数据
// eslint-disable-next-line no-underscore-dangle
const _abilityRadarData = ref([
  { name: '知识', value: 85 },
  { name: '思维', value: 78 },
  { name: '表达', value: 82 },
  { name: '探究', value: 75 }
]);

// 学习风格分析
const learningStyleAnalysis = ref({
  style: '适合型学习者',
  description: '多感官与实践相结合的应用题，增强知识的实际应用能力，提高学习效果'
});

// 问题分析与改进建议
const problemAnalysis = ref([
  {
    type: 'problem',
    title: '数学应用能力有待提高',
    description: '多做与实际生活相关的应用题，增强基础知识的实际应用能力，提高解题思路'
  },
  {
    type: 'problem',
    title: '语言表达能力有待进一步提升',
    description: '加强学习语言表达训练，学会用恰当的语言描述解题思路'
  }
]);

// 综合能力评估
const comprehensiveAssessment = ref([
  {
    category: '学科平衡分析',
    description: '适当数学领域突出，自主学习能力强，具备良好的学习习惯，具有较强的学习潜力'
  },
  {
    category: '学习方法建议',
    description: '根据学生特点提供定制化学习建议和方法指导'
  },
  {
    category: '能力提升重点',
    description: '根据学生特点提供定制化学习建议和方法指导'
  }
]);

// 近期学习轨迹
const recentLearningTrack = computed(() => [
  {
    date: '2024-01-15',
    event: '完成现代文阅读练习',
    score: 85
  },
  {
    date: '2024-01-14',
    event: '参与古诗词鉴赏讨论',
    score: '积极参与'
  },
  {
    date: '2024-01-13',
    event: '提交作文写作作业',
    score: 78
  },
  {
    date: '2024-01-12',
    event: '观看文言文翻译视频',
    score: '已完成'
  },
  {
    date: '2024-01-11',
    event: '完成字词积累测试',
    score: 92
  }
]);

// 关闭弹窗
function handleClose() {
  emit('update:show', false);
  emit('close');
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
        <h2 class="text-lg text-gray-800 font-semibold">{{ props.student?.name }} - 智能学情分析 & 个性化资源推荐</h2>
        <NButton quaternary circle @click="handleClose">
          <template #icon>
            <div class="i-carbon-close text-lg" />
          </template>
        </NButton>
      </div>
    </template>

    <div class="space-y-6">
      <!-- 标签页 -->
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            class="border-b-2 pb-2 text-sm font-medium transition-colors"
            :class="[
              activeTab === 'analysis'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            ]"
            @click="activeTab = 'analysis'"
          >
            学情分析
          </button>
          <button
            class="border-b-2 pb-2 text-sm font-medium transition-colors"
            :class="[
              activeTab === 'resources'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            ]"
            @click="activeTab = 'resources'"
          >
            资源推荐
          </button>
        </nav>
      </div>

      <!-- 学情分析标签页 -->
      <div v-if="activeTab === 'analysis'" class="space-y-6">
        <!-- 基本信息 -->
        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-2">
            <div class="text-sm text-gray-600">班级：</div>
            <div class="font-medium">{{ student?.className }}</div>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-600">学号：</div>
            <div class="font-medium">{{ student?.id }}</div>
          </div>
        </div>

        <!-- 能力雷达图 -->
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">能力雷达图</h3>
          <div class="flex items-center justify-center">
            <div class="relative h-64 w-64">
              <!-- 这里应该是雷达图，暂时用占位符 -->
              <div
                class="h-full w-full flex items-center justify-center border-2 border-blue-200 rounded-full bg-blue-50"
              >
                <div class="text-center">
                  <div class="text-2xl text-blue-600 font-bold">雷达图</div>
                  <div class="text-sm text-gray-500">能力分析</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 学习行为数据 -->
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">学习行为数据</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">适应性与度</span>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-32 rounded-full bg-gray-200">
                  <div
                    class="h-2 rounded-full bg-blue-500 transition-all duration-500"
                    :style="{ width: `${learningBehaviorData.adaptability}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ learningBehaviorData.adaptability }}%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">作业完成度</span>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-32 rounded-full bg-gray-200">
                  <div
                    class="h-2 rounded-full bg-green-500 transition-all duration-500"
                    :style="{ width: `${learningBehaviorData.homeworkCompletion}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ learningBehaviorData.homeworkCompletion }}%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">行为习惯时长</span>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-32 rounded-full bg-gray-200">
                  <div
                    class="h-2 rounded-full bg-blue-500 transition-all duration-500"
                    :style="{ width: `${learningBehaviorData.behaviorDuration}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ learningBehaviorData.behaviorDuration }}%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">知识掌握度</span>
              <div class="flex items-center space-x-2">
                <div class="h-2 w-32 rounded-full bg-gray-200">
                  <div
                    class="h-2 rounded-full bg-blue-500 transition-all duration-500"
                    :style="{ width: `${learningBehaviorData.knowledgeMastery}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ learningBehaviorData.knowledgeMastery }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 学习风格分析 -->
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">学习风格分析</h3>
          <div class="space-y-2">
            <div class="text-sm text-gray-600">学习倾向：</div>
            <div class="text-blue-600 font-medium">{{ learningStyleAnalysis.style }}</div>
            <div class="text-sm text-gray-700">{{ learningStyleAnalysis.description }}</div>
          </div>
        </div>

        <!-- 问题分析与改进建议 -->
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">问题分析与改进建议</h3>
          <div class="space-y-4">
            <div
              v-for="(item, index) in problemAnalysis"
              :key="index"
              class="border-l-4 border-blue-500 bg-blue-50 p-4"
            >
              <h4 class="text-blue-800 font-medium">{{ item.title }}</h4>
              <p class="mt-1 text-sm text-blue-700">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- 综合能力评估 -->
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">综合能力评估</h3>
          <div class="space-y-4">
            <div v-for="(item, index) in comprehensiveAssessment" :key="index" class="rounded-lg bg-gray-50 p-4">
              <h4 class="text-gray-800 font-medium">{{ item.category }}</h4>
              <p class="mt-1 text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- 近期学习轨迹 -->
        <div class="border border-gray-200 rounded-lg p-6">
          <h3 class="mb-4 text-base text-gray-800 font-semibold">近期学习轨迹</h3>
          <div class="space-y-3">
            <div
              v-for="(item, index) in recentLearningTrack"
              :key="index"
              class="flex items-center rounded-lg bg-gray-50 p-3 space-x-4"
            >
              <div class="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100">
                <div class="h-2 w-2 rounded-full bg-blue-500" />
              </div>
              <div class="flex-1">
                <div class="text-sm text-gray-800 font-medium">{{ item.event }}</div>
                <div class="text-xs text-gray-500">{{ item.date }}</div>
              </div>
              <div class="text-sm text-blue-600 font-medium">
                {{ typeof item.score === 'number' ? `${item.score}分` : item.score }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资源推荐标签页 -->
      <div v-if="activeTab === 'resources'" class="space-y-6">
        <!-- 推荐说明 -->
        <div class="rounded-lg bg-blue-50 p-4">
          <div class="text-sm text-blue-700">
            <div class="font-medium">资源匹配说明</div>
            <div class="mt-1 text-xs text-blue-600">
              基于{{ props.student?.name }}的学习风格和能力点分析，系统推荐了以下资源。
              重点针对学生的待提升项和优势项进行匹配。
            </div>
          </div>
        </div>

        <!-- 资源筛选 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700 font-medium">资源类型：</span>
            <div class="flex space-x-2">
              <NButton
                v-for="type in resourceTypes"
                :key="type.value"
                :type="resourceTabValue === type.value ? 'primary' : 'default'"
                size="small"
                @click="resourceTabValue = type.value"
              >
                {{ type.label }}
              </NButton>
            </div>
          </div>
          <div class="text-sm text-gray-500">共 {{ filteredResources.length }} 个推荐资源</div>
        </div>

        <!-- 资源列表 -->
        <div class="space-y-4">
          <div v-if="filteredResources.length === 0" class="py-8">
            <NEmpty description="暂无匹配的资源" />
          </div>

          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="flex flex-col cursor-pointer border border-gray-100 rounded-lg bg-white p-4 transition-shadow md:flex-row hover:shadow-md"
            @click="openResource(resource)"
          >
            <!-- 资源缩略图 -->
            <div class="mb-3 h-24 flex-shrink-0 md:mb-0 md:mr-4 md:w-32">
              <div
                class="h-full w-full flex items-center justify-center rounded-md text-white"
                :class="{
                  'bg-blue-500': resource.type === '视频',
                  'bg-green-500': resource.type === '习题',
                  'bg-purple-500': resource.type === 'AI辅导',
                  'bg-orange-500': resource.type === '互动课件',
                  'bg-red-500': resource.type === '文档',
                  'bg-teal-500': resource.type === '讨论'
                }"
              >
                <div
                  class="text-2xl"
                  :class="{
                    'i-carbon-video': resource.type === '视频',
                    'i-carbon-document': resource.type === '习题',
                    'i-carbon-watson-machine-learning': resource.type === 'AI辅导',
                    'i-carbon-presentation-file': resource.type === '互动课件',
                    'i-carbon-document-pdf': resource.type === '文档',
                    'i-carbon-chat': resource.type === '讨论'
                  }"
                />
              </div>
            </div>

            <!-- 资源信息 -->
            <div class="flex-1">
              <div class="mb-2 flex items-start justify-between">
                <h4 class="text-base text-gray-900 font-medium">{{ resource.title }}</h4>
                <NTag :type="getResourceMatchColor(resource.matchScore)" size="small" class="ml-2 flex-shrink-0">
                  匹配度 {{ resource.matchScore }}%
                </NTag>
              </div>

              <div class="mb-2 flex items-center text-sm text-gray-600 space-x-4">
                <span>{{ resource.type }}</span>
                <span>{{ resource.difficulty }}</span>
                <span>{{ resource.duration }}</span>
              </div>

              <div class="mb-2 flex flex-wrap gap-1">
                <NTag v-for="tag in resource.tags" :key="tag" size="small" type="info" class="text-xs">
                  {{ tag }}
                </NTag>
              </div>

              <div class="mb-2 text-sm text-gray-700">
                <span class="font-medium">推荐理由：</span>
                {{ resource.reason }}
              </div>

              <div class="text-sm text-gray-600">
                <span class="font-medium">预计提升：</span>
                <span v-for="(area, index) in getImprovementAreas(resource)" :key="area">
                  {{ area }}{{ index < getImprovementAreas(resource).length - 1 ? '、' : '' }}
                </span>
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
