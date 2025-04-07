<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NIcon, useMessage } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import { Document, Image, TextAlignLeft } from '@vicons/carbon';

const message = useMessage();
const formRef = ref<FormInst | null>(null);

// 表单数据
const formValue = reactive({
  grade: '二年级',
  subject: '数学',
  textbook: '小学数学浙教版二年级下册',
  objective: '',
  additionalStandard: '',
  alignmentSetting: null
});

// 表单验证规则
const rules = {
  grade: {
    required: true,
    message: '请选择学段',
    trigger: 'blur'
  },
  subject: {
    required: true,
    message: '请选择学科',
    trigger: 'blur'
  },
  textbook: {
    required: true,
    message: '请选择教材',
    trigger: 'blur'
  }
};

// 下拉选项
const gradeOptions = [
  { label: '一年级', value: '一年级' },
  { label: '二年级', value: '二年级' },
  { label: '三年级', value: '三年级' },
  { label: '四年级', value: '四年级' },
  { label: '五年级', value: '五年级' },
  { label: '六年级', value: '六年级' }
];

const subjectOptions = [
  { label: '语文', value: '语文' },
  { label: '数学', value: '数学' },
  { label: '英语', value: '英语' },
  { label: '科学', value: '科学' },
  { label: '社会', value: '社会' }
];

const textbookOptions = [
  { label: '小学数学浙教版二年级下册', value: '小学数学浙教版二年级下册' },
  { label: '小学数学人教版二年级下册', value: '小学数学人教版二年级下册' },
  { label: '小学数学北师大版二年级下册', value: '小学数学北师大版二年级下册' }
];

const alignmentOptions = [
  { label: '国家课程标准', value: '国家课程标准' },
  { label: '地方课程标准', value: '地方课程标准' },
  { label: '校本课程标准', value: '校本课程标准' }
];

// 提交表单
function handleSubmit() {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('提交成功');
      // 这里可以添加提交逻辑
    } else {
      message.error('请完善表单信息');
    }
  });
}
</script>

<template>
  <div class="course-plan-container">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">课程计划</h1>
    </div>

    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">为您教授的主题或期望达成的教学目标量身定制课程计划</p>

    <NForm ref="formRef" :model="formValue" :rules="rules" label-placement="top" require-mark-placement="left">
      <!-- 学段 -->
      <NFormItem label="学段：" path="grade" :rule="rules.grade">
        <NSelect
          v-model:value="formValue.grade"
          placeholder="请选择学段"
          :options="gradeOptions"
          clearable
          class="w-full"
        />
      </NFormItem>

      <!-- 学科 -->
      <NFormItem label="学科：" path="subject" :rule="rules.subject">
        <NSelect
          v-model:value="formValue.subject"
          placeholder="请选择学科"
          :options="subjectOptions"
          clearable
          class="w-full"
        />
      </NFormItem>

      <!-- 教材 -->
      <NFormItem label="教材：" path="textbook" :rule="rules.textbook">
        <NSelect
          v-model:value="formValue.textbook"
          placeholder="请选择教材"
          :options="textbookOptions"
          clearable
          class="w-full"
        />
      </NFormItem>

      <!-- 主题、标准或目标 -->
      <NFormItem label="主题、标准或目标：" path="objective">
        <NInput
          v-model:value="formValue.objective"
          type="textarea"
          placeholder="    主题、标准或更长的说明所教授的内容"
          :autosize="{ minRows: 5, maxRows: 10 }"
          show-count
          :maxlength="1000"
        />
      </NFormItem>

      <!-- 附加标准 -->
      <div class="mb-4">
        <div class="mb-2 text-base">附加标准：</div>
        <div class="mb-2 flex gap-2">
          <NButton size="small" secondary class="bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
            <template #icon>
              <NIcon><TextAlignLeft /></NIcon>
            </template>
            文本
          </NButton>
          <NButton size="small" secondary class="px-3 py-1 text-sm">
            <template #icon>
              <NIcon><Document /></NIcon>
            </template>
            文件
          </NButton>
          <NButton size="small" secondary class="px-3 py-1 text-sm">
            <template #icon>
              <NIcon><Image /></NIcon>
            </template>
            知识库
          </NButton>
        </div>
        <NInput
          v-model:value="formValue.additionalStandard"
          type="textarea"
          placeholder="    示例：学生们正在学习一个关于世界区域的单元，上一节课是关于美国地理的课程，需要包括小组合作的内容"
          :autosize="{ minRows: 5, maxRows: 10 }"
          show-count
          :maxlength="1000"
        />
      </div>

      <!-- 对齐标准设置 -->
      <NFormItem label="对齐标准设置：" path="alignmentSetting">
        <NSelect
          v-model:value="formValue.alignmentSetting"
          placeholder="&nbsp;&nbsp;请选择"
          :options="alignmentOptions"
          clearable
          class="w-full"
        />
      </NFormItem>

      <!-- 提交按钮 -->
      <div class="mt-8 flex justify-center">
        <NButton type="primary" class="w-40 rounded-full" @click="handleSubmit">
          <span class="mx-auto">生 成</span>
        </NButton>
      </div>
    </NForm>
  </div>
</template>

<style scoped>
.course-plan-container {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.n-form-item) {
  margin-bottom: 16px;
}

:deep(.n-form-item-label) {
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 4px;
}

:deep(.n-form-item-required-mark) {
  color: #f56c6c;
}

:deep(.n-form-item-feedback-wrapper) {
  min-height: 0;
  margin-top: 2px;
}

:deep(.n-input) {
  border-radius: 4px;
  background-color: #fff;
}

:deep(.n-input-wrapper) {
  padding: 0;
}

:deep(.n-input__textarea-el) {
  padding: 8px 12px !important;
}

:deep(.n-input__placeholder) {
  color: #999;
  font-size: 14px;
  padding: 0 4px;
}

:deep(.n-base-selection) {
  border-radius: 4px;
  background-color: #fff;
}

:deep(.n-base-selection-input) {
  padding: 0 8px;
}

:deep(.n-base-selection-placeholder) {
  color: #999;
  font-size: 14px;
  padding: 0 4px;
}

:deep(.n-select) {
  width: 100%;
}

:deep(.n-button) {
  font-weight: 500;
}

:deep(.n-form) {
  background-color: #fff;
  padding: 0;
  border-radius: 0;
}
</style>
