<script setup lang="ts">
import { ref } from 'vue';
import { NSelect } from 'naive-ui';

defineOptions({
  name: 'FilterBar'
});

interface SelectOption {
  label: string;
  value: string;
}

const subjectOptions = ref<SelectOption[]>([
  { label: '语文', value: 'chinese' },
  { label: '数学', value: 'math' },
  { label: '英语', value: 'english' },
  { label: '物理', value: 'physics' },
  { label: '化学', value: 'chemistry' },
  { label: '生物', value: 'biology' }
]);

const gradeOptions = ref<SelectOption[]>([
  { label: '一年级', value: 'grade1' },
  { label: '二年级', value: 'grade2' },
  { label: '三年级', value: 'grade3' },
  { label: '四年级', value: 'grade4' },
  { label: '五年级', value: 'grade5' },
  { label: '六年级', value: 'grade6' },
  { label: '初一', value: 'junior1' },
  { label: '初二', value: 'junior2' },
  { label: '初三', value: 'junior3' }
]);

const problemTypeOptions = ref<SelectOption[]>([
  { label: '概念理解', value: 'concept' },
  { label: '解题方法', value: 'method' },
  { label: '课堂问题', value: 'classroom' },
  { label: '考试试题', value: 'exam' }
]);

const selectedSubject = ref('');
const selectedGrade = ref('');
const selectedProblemType = ref('');

const customSelectProps = {
  size: 'medium',
  filterable: false,
  clearable: true,
  style: 'width: 100%; --n-height: 36px; --n-padding: 0 12px;'
};
</script>

<template>
  <div class="filter-bar grid grid-cols-3 gap-5">
    <div class="filter-item">
      <label class="mb-1.5 block text-xs text-gray-500 font-medium">学科</label>
      <NSelect
        v-model:value="selectedSubject"
        placeholder="选择学科"
        :options="subjectOptions"
        v-bind="customSelectProps"
      />
    </div>
    <div class="filter-item">
      <label class="mb-1.5 block text-xs text-gray-500 font-medium">年级</label>
      <NSelect
        v-model:value="selectedGrade"
        placeholder="选择年级"
        :options="gradeOptions"
        v-bind="customSelectProps"
      />
    </div>
    <div class="filter-item">
      <label class="mb-1.5 block text-xs text-gray-500 font-medium">问题类型</label>
      <NSelect
        v-model:value="selectedProblemType"
        placeholder="选择类型"
        :options="problemTypeOptions"
        v-bind="customSelectProps"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.n-base-selection) {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

:deep(.n-base-selection:hover) {
  border-color: #d1d5db;
}

:deep(.n-base-selection-placeholder) {
  color: #9ca3af;
  font-size: 0.875rem;
}

:deep(.n-base-selection-tags) {
  padding: 0 !important;
}
</style>
