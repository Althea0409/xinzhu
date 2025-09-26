<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue';
import { StudentTrackingCard } from './modules/student-tracking-card';
import StudentDetailModal from './modules/student-detail-modal/student-detail-modal.vue';
import LearningBehaviorAnalysis from './modules/learning-behavior-analysis/learning-behavior-analysis.vue';
import SkillGraph from './modules/skill-graph/skill-graph.vue';
import KnowledgeGraph from './modules/knowledge-graph/knowledge-graph.vue';
import type { StudentInfo } from './modules/types';

/** 班级选项 */
const classOptions = [
  { label: '全部班级', value: '' },
  { label: '初一(1)班', value: '初一(1)班' },
  { label: '初一(2)班', value: '初一(2)班' },
  { label: '初一(3)班', value: '初一(3)班' }
];

/** 学科选项 */
const subjectOptions = [
  { label: '全部学科', value: '' },
  { label: '语文', value: '语文' },
  { label: '数学', value: '数学' },
  { label: '英语', value: '英语' },
  { label: '物理', value: '物理' },
  { label: '化学', value: '化学' }
];

/** 学生状态选项 */
const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '优秀', value: '优秀' },
  { label: '正常', value: '正常' },
  { label: '需关注', value: '需关注' },
  { label: '重度关注', value: '重度关注' }
];

/** 筛选条件 */
const filterConditions = ref({
  class: '',
  subject: '',
  status: '',
  keyword: ''
});

/** 学生信息数据 包含学生姓名、班级、课程和学习状态 */
const studentsList = ref<StudentInfo[]>([
  {
    id: 1,
    name: '陈晓明',
    className: '初一(2)班',
    subjects: [
      { id: 1, name: '现代文阅读', type: 'chinese' },
      { id: 2, name: '文言文基础', type: 'chinese' }
    ],
    studyStatus: 'middle-excellent'
  },
  {
    id: 2,
    name: '王思雨',
    className: '初一(2)班',
    subjects: [
      { id: 3, name: '诗歌鉴赏', type: 'chinese' },
      { id: 4, name: '作文写作', type: 'chinese' }
    ],
    studyStatus: 'normal'
  },
  {
    id: 3,
    name: '李华',
    className: '初一(2)班',
    subjects: [
      { id: 5, name: '字词积累', type: 'chinese' },
      { id: 6, name: '散文阅读', type: 'chinese' }
    ],
    studyStatus: 'excellent'
  },
  {
    id: 4,
    name: '张小芳',
    className: '初一(2)班',
    subjects: [
      { id: 7, name: '古诗词背诵', type: 'chinese' },
      { id: 8, name: '课外阅读', type: 'chinese' }
    ],
    studyStatus: 'needs-improvement'
  },
  {
    id: 5,
    name: '刘明',
    className: '初一(2)班',
    subjects: [
      { id: 9, name: '文言文基础', type: 'chinese' },
      { id: 10, name: '作文写作', type: 'chinese' }
    ],
    studyStatus: 'middle-excellent'
  },
  {
    id: 6,
    name: '王强',
    className: '初一(2)班',
    subjects: [
      { id: 11, name: '字词积累', type: 'chinese' },
      { id: 12, name: '现代文阅读', type: 'chinese' }
    ],
    studyStatus: 'normal'
  },
  {
    id: 7,
    name: '赵敏',
    className: '初一(2)班',
    subjects: [
      { id: 13, name: '文言文基础', type: 'chinese' },
      { id: 14, name: '诗歌鉴赏', type: 'chinese' }
    ],
    studyStatus: 'excellent'
  },
  {
    id: 9,
    name: '李小明',
    className: '初一(2)班',
    subjects: [
      { id: 17, name: '散文阅读', type: 'chinese' },
      { id: 18, name: '文言文基础', type: 'chinese' }
    ],
    studyStatus: 'excellent'
  },
  {
    id: 10,
    name: '王小红',
    className: '初一(2)班',
    subjects: [
      { id: 19, name: '作文写作', type: 'chinese' },
      { id: 20, name: '古诗词背诵', type: 'chinese' }
    ],
    studyStatus: 'normal'
  },
  {
    id: 11,
    name: '张小华',
    className: '初一(2)班',
    subjects: [
      { id: 21, name: '字词积累', type: 'chinese' },
      { id: 22, name: '课外阅读', type: 'chinese' }
    ],
    studyStatus: 'middle-excellent'
  },
  {
    id: 12,
    name: '刘小强',
    className: '初一(2)班',
    subjects: [
      { id: 23, name: '散文阅读', type: 'chinese' },
      { id: 24, name: '文言文基础', type: 'chinese' }
    ],
    studyStatus: 'excellent'
  },
  {
    id: 13,
    name: '陈小美',
    className: '初一(2)班',
    subjects: [
      { id: 25, name: '文言文基础', type: 'chinese' },
      { id: 26, name: '作文写作', type: 'chinese' }
    ],
    studyStatus: 'normal'
  }
]);

/** 当前选中的学生 */
const selectedStudent = ref<StudentInfo | undefined>(undefined);

/** 是否显示学生详情弹窗 */
const showDetailModal = ref(false);

/** 是否显示学习行为分析弹窗 */
const showLearningBehaviorModal = ref(false);

/** 是否显示技能图谱弹窗 */
const showSkillGraphModal = ref(false);

/** 是否显示知识图谱弹窗 */
const showKnowledgeGraphModal = ref(false);

/** 处理学生卡片点击事件 */
function handleStudentClick(student: StudentInfo) {
  selectedStudent.value = student;
  showDetailModal.value = true;
}

/** 关闭学生详情弹窗 */
function closeDetailModal() {
  showDetailModal.value = false;
}

/** 打开学习行为分析弹窗 */
function openLearningBehaviorModal(student: StudentInfo) {
  selectedStudent.value = student;
  showLearningBehaviorModal.value = true;
}

/** 关闭学习行为分析弹窗 */
function closeLearningBehaviorModal() {
  showLearningBehaviorModal.value = false;
}

/** 打开技能图谱弹窗 */
function openSkillGraphModal(student: StudentInfo) {
  selectedStudent.value = student;
  showSkillGraphModal.value = true;
}

/** 关闭技能图谱弹窗 */
function closeSkillGraphModal() {
  showSkillGraphModal.value = false;
}

/** 打开知识图谱弹窗 */
function openKnowledgeGraphModal(student: StudentInfo) {
  selectedStudent.value = student;
  showKnowledgeGraphModal.value = true;
}

/** 关闭知识图谱弹窗 */
function closeKnowledgeGraphModal() {
  showKnowledgeGraphModal.value = false;
}

/** 重置筛选条件 */
function resetFilters() {
  filterConditions.value = {
    class: '',
    subject: '',
    status: '',
    keyword: ''
  };
}

/** 应用筛选条件 */
function applyFilters() {
  // 这里实现筛选逻辑
  console.log('应用筛选：', filterConditions.value);
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-6 ml-3 text-2xl font-bold">学生个性画像</h1>

    <!-- 筛选面板 -->
    <div class="mb-8 rounded-lg bg-white p-5 shadow-sm">
      <div class="mb-4 flex items-center">
        <h3 class="text-base text-[#333333] font-medium">数据筛选</h3>
        <div class="ml-auto flex items-center space-x-3">
          <!-- 筛选按钮 -->
          <button
            class="rounded bg-[#EEF1FF] px-4 py-1.5 text-sm text-[#2B46FE] hover:bg-[#DCE1FF]"
            @click="resetFilters"
          >
            重置筛选
          </button>
          <button
            class="rounded bg-[#2B46FE] px-4 py-1.5 text-sm text-white hover:bg-[#2B46FE]/90"
            @click="applyFilters"
          >
            应用筛选
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div>
          <label class="mb-2 block text-sm text-[#666666]">班级</label>
          <NSelect
            v-model:value="filterConditions.class"
            :options="classOptions"
            size="medium"
            placeholder="选择班级"
            clearable
          />
        </div>
        <div>
          <label class="mb-2 block text-sm text-[#666666]">学科</label>
          <NSelect
            v-model:value="filterConditions.subject"
            :options="subjectOptions"
            size="medium"
            placeholder="选择学科"
            clearable
          />
        </div>
        <div>
          <label class="mb-2 block text-sm text-[#666666]">学生状态</label>
          <NSelect
            v-model:value="filterConditions.status"
            :options="statusOptions"
            size="medium"
            placeholder="选择状态"
            clearable
          />
        </div>
        <div>
          <label class="mb-2 block text-sm text-[#666666]">关键词</label>
          <NInput v-model:value="filterConditions.keyword" type="text" size="medium" placeholder="搜索学生姓名" />
        </div>
      </div>
    </div>

    <!-- 学生卡片列表 -->
    <div class="grid grid-cols-1 gap-6 px-2 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
      <StudentTrackingCard
        v-for="student in studentsList"
        :key="student.id"
        :student="student"
        class="transition-shadow hover:shadow-md"
        @click="handleStudentClick"
      />
    </div>

    <!-- 学生详情弹窗 - 当选中学生时显示 -->
    <StudentDetailModal
      v-if="selectedStudent"
      v-model:show="showDetailModal"
      :student="selectedStudent"
      @close="closeDetailModal"
      @open-learning-behavior="openLearningBehaviorModal"
      @open-skill-graph="openSkillGraphModal"
      @open-knowledge-graph="openKnowledgeGraphModal"
    />

    <!-- 学习行为分析弹窗 -->
    <LearningBehaviorAnalysis
      v-model:show="showLearningBehaviorModal"
      :student="selectedStudent || undefined"
      @close="closeLearningBehaviorModal"
    />

    <!-- 技能图谱弹窗 -->
    <SkillGraph v-model:show="showSkillGraphModal" :student="selectedStudent ?? null" @close="closeSkillGraphModal" />

    <!-- 知识图谱弹窗 -->
    <KnowledgeGraph
      v-model:show="showKnowledgeGraphModal"
      :student="selectedStudent ?? null"
      @close="closeKnowledgeGraphModal"
    />
  </div>
</template>

<style scoped>
:deep(.n-select) {
  width: 100%;
}

:deep(.n-select .n-base-selection) {
  border-radius: 4px;
  border-color: #e5e7eb;
  transition: all 0.2s ease;
}

:deep(.n-select:hover .n-base-selection) {
  border-color: rgba(43, 70, 254, 0.3);
}

:deep(.n-select:focus-within .n-base-selection),
:deep(.n-select.n-select--focus .n-base-selection) {
  border-color: #2b46fe;
  box-shadow: 0 0 0 1px rgba(43, 70, 254, 0.2);
}

:deep(.n-select-menu .n-base-select-option.n-base-select-option--selected) {
  color: #2b46fe;
}

:deep(.n-select-menu .n-base-select-option:hover) {
  background-color: #f3f3f5;
}

:deep(.n-input) {
  width: 100%;
}

:deep(.n-input .n-input__border) {
  border-radius: 4px;
  border-color: #e5e7eb;
  transition: all 0.2s ease;
}

:deep(.n-input:hover .n-input__border) {
  border-color: rgba(43, 70, 254, 0.3);
}

:deep(.n-input:focus-within .n-input__border) {
  border-color: #2b46fe;
  box-shadow: 0 0 0 1px rgba(43, 70, 254, 0.2);
}
</style>
