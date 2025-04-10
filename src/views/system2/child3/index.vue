<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue';
import { StudentTrackingCard } from './modules/student-tracking-card';
import StudentDetailModal from './modules/student-detail-modal/student-detail-modal.vue';
import type { StudentInfo } from './modules/types';

/** 班级选项 */
const classOptions = [
  { label: '全部班级', value: '' },
  { label: '初三(1)班', value: '初三(1)班' },
  { label: '初三(2)班', value: '初三(2)班' },
  { label: '初三(3)班', value: '初三(3)班' }
];

/** 学科选项 */
const subjectOptions = [
  { label: '全部学科', value: '' },
  { label: '数学', value: '数学' },
  { label: '语文', value: '语文' },
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
    className: '初三(1)班',
    subjects: [
      { id: 1, name: '三角函数', type: 'math' },
      { id: 2, name: '几何证明', type: 'math' }
    ],
    studyStatus: 'middle-excellent'
  },
  {
    id: 2,
    name: '王思雨',
    className: '初三(2)班',
    subjects: [
      { id: 3, name: '时态语法', type: 'english' },
      { id: 4, name: '阅读理解', type: 'chinese' }
    ],
    studyStatus: 'normal'
  },
  {
    id: 3,
    name: '李华',
    className: '初三(3)班',
    subjects: [
      { id: 5, name: '物理力学', type: 'physics' },
      { id: 6, name: '化学方程式', type: 'chemistry' }
    ],
    studyStatus: 'excellent'
  },
  {
    id: 4,
    name: '张小芳',
    className: '初三(1)班',
    subjects: [
      { id: 7, name: '政治理论', type: 'politics' },
      { id: 8, name: '历史年表', type: 'history' }
    ],
    studyStatus: 'needs-improvement'
  },
  {
    id: 5,
    name: '刘明',
    className: '初三(2)班',
    subjects: [
      { id: 9, name: '生物分类', type: 'biology' },
      { id: 10, name: '地理地形', type: 'geography' }
    ],
    studyStatus: 'middle-excellent'
  },
  {
    id: 6,
    name: '王强',
    className: '初三(3)班',
    subjects: [
      { id: 11, name: '三角函数', type: 'math' },
      { id: 12, name: '英语听力', type: 'english' }
    ],
    studyStatus: 'normal'
  },
  {
    id: 7,
    name: '赵敏',
    className: '初三(1)班',
    subjects: [
      { id: 13, name: '物理电学', type: 'physics' },
      { id: 14, name: '化学实验', type: 'chemistry' }
    ],
    studyStatus: 'excellent'
  },
  {
    id: 8,
    name: '孙伟',
    className: '初三(2)班',
    subjects: [
      { id: 15, name: '文言文', type: 'chinese' },
      { id: 16, name: '英语写作', type: 'english' }
    ],
    studyStatus: 'needs-improvement'
  }
]);

/** 当前选中的学生 */
const selectedStudent = ref<StudentInfo | null>(null);

/** 是否显示学生详情弹窗 */
const showDetailModal = ref(false);

/** 处理学生卡片点击事件 */
function handleStudentClick(student: StudentInfo) {
  selectedStudent.value = student;
  showDetailModal.value = true;
}

/** 关闭学生详情弹窗 */
function closeDetailModal() {
  showDetailModal.value = false;
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
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="mb-5 text-2xl font-bold">学情追踪</h1>

    <!-- 筛选面板 -->
    <div class="rounded-lg bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center">
        <h3 class="text-base text-[#333333] font-medium">数据筛选</h3>
        <div class="ml-auto flex space-x-2">
          <button
            class="rounded bg-[#EEF1FF] px-3 py-1 text-sm text-[#2B46FE] hover:bg-[#DCE1FF]"
            @click="resetFilters"
          >
            重置筛选
          </button>
          <button class="rounded bg-[#2B46FE] px-3 py-1 text-sm text-white hover:bg-[#2B46FE]/90" @click="applyFilters">
            应用筛选
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label class="mb-1 block text-sm text-[#666666]">班级</label>
          <NSelect
            v-model:value="filterConditions.class"
            :options="classOptions"
            size="medium"
            placeholder="选择班级"
            clearable
          />
        </div>
        <div>
          <label class="mb-1 block text-sm text-[#666666]">学科</label>
          <NSelect
            v-model:value="filterConditions.subject"
            :options="subjectOptions"
            size="medium"
            placeholder="选择学科"
            clearable
          />
        </div>
        <div>
          <label class="mb-1 block text-sm text-[#666666]">学生状态</label>
          <NSelect
            v-model:value="filterConditions.status"
            :options="statusOptions"
            size="medium"
            placeholder="选择状态"
            clearable
          />
        </div>
        <div>
          <label class="mb-1 block text-sm text-[#666666]">关键词</label>
          <NInput v-model:value="filterConditions.keyword" type="text" size="medium" placeholder="搜索学生姓名" />
        </div>
      </div>
    </div>

    <!-- 学生卡片列表 -->
    <div class="grid grid-cols-1 mt-6 gap-5 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
      <StudentTrackingCard
        v-for="student in studentsList"
        :key="student.id"
        :student="student"
        @click="handleStudentClick"
      />
    </div>

    <!-- 学生详情弹窗 - 当选中学生时显示 -->
    <StudentDetailModal
      v-if="selectedStudent"
      v-model:show="showDetailModal"
      :student="selectedStudent"
      @close="closeDetailModal"
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
