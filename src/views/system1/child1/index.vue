<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon, NModal } from 'naive-ui';
import { Document, Edit, Image, Time } from '@vicons/carbon';
import CourseForm from './modules/CourseForm.vue';
import AiChat from './modules/AiChat.vue';

const courseFormRef = ref<any>(null);
const showDetailedPlanModal = ref(false);
const showPreviewMode = ref(false);

// 显示详细教案模态框
function showDetailedPlan() {
  showDetailedPlanModal.value = true;
  showPreviewMode.value = false;
}

// 关闭详细教案模态框
function closeDetailedPlanModal() {
  showDetailedPlanModal.value = false;
  showPreviewMode.value = false;
}

// 切换到预览模式
function togglePreviewMode() {
  showPreviewMode.value = !showPreviewMode.value;
}
</script>

<template>
  <div class="h-full w-full flex bg-white dark:bg-gray-900">
    <!-- 左侧课程计划表单 -->
    <div class="flex-1 overflow-auto p-4">
      <CourseForm ref="courseFormRef" />
    </div>

    <!-- 右侧智能问答 -->
    <div class="w-80 border-l border-gray-200 bg-white lg:w-96 dark:border-gray-700 dark:bg-gray-800">
      <AiChat @show-detailed-plan="showDetailedPlan" />
    </div>

    <!-- 详细教案模态框 -->
    <NModal
      v-model:show="showDetailedPlanModal"
      class="detailed-plan-modal"
      preset="card"
      :title="showPreviewMode ? '教案预览' : '详细设计'"
      size="huge"
      :bordered="false"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      <!-- 预览模式 -->
      <div v-if="showPreviewMode" class="preview-mode">
        <div class="preview-header">
          <h1 class="preview-title mb-6 text-center text-3xl text-red-600 font-bold">
            {{ courseFormRef.generatedDesign?.title }}
          </h1>
          <table class="preview-table w-full border-collapse shadow-lg">
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">课题</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">《静夜思》</td>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">课型</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">新授课</td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">授课时间</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">45分钟</td>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 text-blue-800 font-medium">课时</td>
              <td class="w-1/3 border border-blue-200 bg-white p-3">1课时</td>
            </tr>
          </table>
        </div>

        <div class="preview-content mt-6">
          <table class="preview-table w-full border-collapse shadow-lg">
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学目标</td>
              <td class="border border-blue-200 bg-white p-3">
                <ol class="list-decimal pl-5 space-y-2">
                  <li v-for="(objective, index) in courseFormRef.generatedDesign?.objectives" :key="index">
                    {{ objective }}
                  </li>
                </ol>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学重点</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(point, index) in courseFormRef.generatedDesign?.focusPoints[0].points" :key="index">
                    {{ point }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学难点</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(point, index) in courseFormRef.generatedDesign?.focusPoints[1].points" :key="index">
                    {{ point }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学准备</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(material, index) in courseFormRef.generatedDesign?.materials" :key="index">
                    {{ material }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">教学设计</td>
              <td class="border border-blue-200 p-0">
                <table class="w-full border-collapse">
                  <tr v-for="(step, index) in courseFormRef.generatedDesign?.lessonFlow" :key="index">
                    <td class="w-1/6 border border-blue-200 bg-yellow-50 p-3 align-top text-yellow-800 font-medium">
                      {{ step.title }}
                      <br />
                      <span class="text-sm text-yellow-700 font-normal">({{ step.duration }})</span>
                    </td>
                    <td class="border border-blue-200 bg-white p-3 align-top">
                      <div class="mb-3">
                        <p class="mb-2 text-indigo-700 font-bold">{{ index + 1 }}、{{ step.title }}</p>
                        <p class="mb-3 text-gray-700">{{ step.content }}</p>
                        <div v-if="step.interaction" class="mb-3">
                          <p class="mb-1 text-indigo-600 font-bold">互动环节：</p>
                          <p class="border-l-4 border-blue-400 rounded-md bg-blue-50 p-2">
                            {{ step.interaction }}
                          </p>
                        </div>
                        <div v-if="step.expectedOutcome" class="mb-3">
                          <p class="mb-1 text-indigo-600 font-bold">预期成果：</p>
                          <p class="border-l-4 border-purple-400 rounded-md bg-purple-50 p-2">
                            {{ step.expectedOutcome }}
                          </p>
                        </div>
                        <div v-if="step.materials" class="mb-3">
                          <p class="mb-1 text-indigo-600 font-bold">所需材料：</p>
                          <p class="border-l-4 border-orange-400 rounded-md bg-orange-50 p-2">
                            {{ step.materials }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="w-1/6 border border-blue-200 bg-green-50 p-3 align-top text-sm text-green-800">
                      <p>
                        {{ step.expectedOutcome }}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">评价方式</td>
              <td class="border border-blue-200 bg-white p-3">
                <div class="mb-4">
                  <h3 class="mb-2 text-lg text-gray-800 font-medium">过程性评价：</h3>
                  <ul class="list-disc pl-5 space-y-2">
                    <li v-for="(item, index) in courseFormRef.generatedDesign?.evaluation.formative" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="mb-2 text-lg text-gray-800 font-medium">总结性评价：</h3>
                  <ul class="list-disc pl-5 space-y-2">
                    <li v-for="(item, index) in courseFormRef.generatedDesign?.evaluation.summative" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td class="w-1/6 border border-blue-200 bg-blue-50 p-3 align-top text-blue-800 font-medium">课后作业</td>
              <td class="border border-blue-200 bg-white p-3">
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(item, index) in courseFormRef.generatedDesign?.homeworkAndReflection" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 详细设计模式 -->
      <div v-if="!showPreviewMode && courseFormRef" class="detailed-plan-container">
        <div class="mb-6">
          <h1 class="plan-title text-2xl text-primary font-bold">
            {{ courseFormRef.generatedDesign?.detailedPlan?.title }}
          </h1>
          <p class="plan-subtitle mt-2 text-sm text-gray-500">
            基于{{ courseFormRef.formValue?.textbook }}生成，预计授课时长：45分钟
          </p>
        </div>

        <!-- 教学目标 -->
        <div class="plan-section mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              一
            </div>
            教学目标
          </h2>
          <ul class="goal-list list-decimal pl-8">
            <li class="goal-item mb-2 text-gray-700 dark:text-gray-300">
              认识并理解《静夜思》这首诗的内容，感受诗人思乡的情感。
            </li>
            <li class="goal-item mb-2 text-gray-700 dark:text-gray-300">
              掌握"床、前、明、月、光、疑、是、地、上、霜"等生字的读音和书写。
            </li>
            <li class="goal-item mb-2 text-gray-700 dark:text-gray-300">
              能够正确、流利、有感情地朗读和背诵《静夜思》。
            </li>
            <li class="goal-item mb-2 text-gray-700 dark:text-gray-300">通过想象和联想，体会诗人望月思乡的意境。</li>
            <li class="goal-item mb-2 text-gray-700 dark:text-gray-300">
              培养学生对古诗的兴趣，激发学习传统文化的热情。
            </li>
          </ul>
        </div>

        <!-- 教学重点与难点 -->
        <div class="plan-section mb-8 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              二
            </div>
            教学重点与难点
          </h2>
          <div v-for="(section, sIndex) in courseFormRef.generatedDesign?.focusPoints" :key="sIndex" class="mb-4">
            <h3 class="subsection-title mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">
              {{ section.title }}：
            </h3>
            <ul class="focus-list list-disc pl-8">
              <li
                v-for="(point, pIndex) in section.points"
                :key="pIndex"
                class="focus-item mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ point }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学方法 -->
        <div class="plan-section mb-8 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              三
            </div>
            教学方法
          </h2>
          <ul class="method-list list-decimal pl-8">
            <li
              v-for="(method, index) in courseFormRef.generatedDesign?.teachingMethods"
              :key="index"
              class="method-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ method }}
            </li>
          </ul>
        </div>

        <!-- 教学准备 -->
        <div class="plan-section mb-8 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              四
            </div>
            教学准备
          </h2>
          <ul class="prep-list list-disc pl-8">
            <li
              v-for="(material, index) in courseFormRef.generatedDesign?.detailedPlan?.teachingTools"
              :key="index"
              class="prep-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ material }}
            </li>
          </ul>
        </div>

        <!-- 课堂流程 -->
        <div class="plan-section mb-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              五
            </div>
            教学活动与时间安排
          </h2>
          <div class="mt-4">
            <div class="procedure-timeline relative">
              <div
                v-for="(step, index) in courseFormRef.generatedDesign?.lessonFlow"
                :key="index"
                class="procedure-step relative mb-8 pl-10"
              >
                <div
                  class="step-number absolute left-2 top-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-sm text-white -translate-x-1/2"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="step-card border border-gray-200 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div class="mb-2 flex items-center justify-between">
                    <h3 class="step-title text-lg text-primary font-semibold">{{ step.title }}</h3>
                    <div class="step-time flex items-center text-gray-500">
                      <NIcon class="mr-1" size="18">
                        <Time />
                      </NIcon>
                      <span class="text-sm">{{ step.duration }}</span>
                    </div>
                  </div>
                  <p class="step-content mb-3 text-gray-700 dark:text-gray-300">{{ step.content }}</p>

                  <div v-if="step.interaction" class="interaction-section mb-3">
                    <div class="mb-1 text-sm text-purple-600 font-medium dark:text-purple-400">互动环节：</div>
                    <div
                      class="rounded-md bg-purple-50 px-3 py-2 text-sm text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    >
                      {{ step.interaction }}
                    </div>
                  </div>

                  <div v-if="step.expectedOutcome" class="outcome-section mb-3">
                    <div class="mb-1 text-sm text-green-600 font-medium dark:text-green-400">预期成果：</div>
                    <div
                      class="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {{ step.expectedOutcome }}
                    </div>
                  </div>

                  <div v-if="step.materials" class="materials-section">
                    <div class="mb-1 text-sm text-orange-600 font-medium dark:text-orange-400">所需材料：</div>
                    <div
                      class="rounded-md bg-orange-50 px-3 py-2 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    >
                      {{ step.materials }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 评价方式 -->
        <div class="plan-section mb-8 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              六
            </div>
            评价方式
          </h2>
          <div class="mb-4">
            <h3 class="subsection-title mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">过程性评价：</h3>
            <ul class="evaluation-list list-disc pl-8">
              <li
                v-for="(item, index) in courseFormRef.generatedDesign?.evaluation?.formative"
                :key="index"
                class="evaluation-item mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <h3 class="subsection-title mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">总结性评价：</h3>
            <ul class="evaluation-list list-disc pl-8">
              <li
                v-for="(item, index) in courseFormRef.generatedDesign?.evaluation?.summative"
                :key="index"
                class="evaluation-item mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学反思 -->
        <div class="plan-section mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              七
            </div>
            教学反思
          </h2>
          <ul class="reflection-list list-disc pl-8">
            <li
              v-for="(item, index) in courseFormRef.generatedDesign?.reflection"
              :key="index"
              class="reflection-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- 课后作业 -->
        <div class="plan-section mb-8 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <h2 class="section-heading mb-3 flex items-center text-xl text-primary font-bold">
            <div class="section-icon mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">
              八
            </div>
            课后作业和延伸
          </h2>
          <ul class="homework-list list-disc pl-8">
            <li
              v-for="(item, index) in courseFormRef.generatedDesign?.homeworkAndReflection"
              :key="index"
              class="homework-item mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-center gap-4">
          <NButton type="primary" size="large" class="w-40">
            <template #icon>
              <NIcon><Document /></NIcon>
            </template>
            导出文档
          </NButton>
          <NButton type="info" size="large" class="w-40" @click="togglePreviewMode">
            <template #icon>
              <NIcon><Image /></NIcon>
            </template>
            {{ showPreviewMode ? '详细设计' : '预览教案' }}
          </NButton>
          <NButton type="default" ghost size="large" class="w-40" @click="closeDetailedPlanModal">
            <template #icon>
              <NIcon><Edit /></NIcon>
            </template>
            关闭
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped>
.detailed-plan-container {
  max-height: 65vh;
  overflow-y: auto;
  padding-right: 12px;
  margin: 0 auto;
}

.detailed-plan-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 750px;
  max-width: 750px;
  height: auto;
  max-height: 85vh;
  margin: 0 auto;
}

.text-primary {
  color: #2b46fe;
}

:deep(.dark) .text-primary {
  color: #5b76ff;
}

:deep(.n-button) {
  font-weight: 500;
}

:deep(.n-modal) {
  max-width: 650px;
  width: 650px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.n-modal-body-wrapper) {
  max-height: 85vh;
}

:deep(.n-card) {
  max-height: 85vh;
  border: 2px solid #e74c3c;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

:deep(.n-card__content) {
  padding: 16px 24px;
}

:deep(.n-card__footer) {
  padding: 16px 24px 20px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  gap: 16px;
}

:deep(.n-card__action) {
  padding: 0;
}

:deep(.n-modal-mask) {
  background-color: rgba(0, 0, 0, 0.5);
}

:deep(.n-card-header) {
  padding: 16px 24px;
  border-bottom: 1px solid #eaeaea;
}

/* 详细教案内部样式 */
.plan-title {
  font-size: 24px;
  color: #2b46fe;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.plan-subtitle {
  color: #6b7280;
  font-size: 14px;
}

.plan-section {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.plan-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-heading {
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #2b46fe;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #2b46fe;
  color: white;
  font-weight: bold;
  margin-right: 12px;
}

.goal-list {
  padding-left: 2rem;
}

.goal-item {
  line-height: 1.6;
  margin-bottom: 8px;
  position: relative;
}

/* 教学重点与难点 */
.subsection-title {
  font-weight: 600;
  color: #333;
  margin-top: 12px;
}

.focus-list {
  padding-left: 2rem;
}

.focus-item {
  line-height: 1.6;
  position: relative;
}

/* 教学方法 */
.method-list {
  padding-left: 2rem;
}

.method-item {
  line-height: 1.6;
  margin-bottom: 10px;
}

/* 教学准备 */
.prep-list {
  padding-left: 2rem;
}

.prep-item {
  line-height: 1.6;
}

/* 课堂流程 */
.procedure-timeline {
  position: relative;
}

.procedure-timeline:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2px;
  width: 2px;
  background-color: #e5e7eb;
  z-index: 0;
}

.procedure-step {
  position: relative;
  z-index: 1;
}

.step-number {
  box-shadow: 0 0 0 4px white;
  z-index: 2;
  font-weight: bold;
}

.step-card {
  border-radius: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.step-title {
  font-weight: 600;
  color: #2b46fe;
}

.step-time {
  color: #6b7280;
  display: flex;
  align-items: center;
}

.step-content {
  line-height: 1.6;
}

.design-intent {
  margin-top: 8px;
}

.intent-label {
  font-weight: 500;
  color: #3b82f6;
}

.intent-content {
  background-color: #eff6ff;
  border-radius: 6px;
  line-height: 1.5;
}

/* 深色模式适配 */
:deep(.dark) .step-card {
  background-color: #1f2937;
  border-color: #374151;
}

:deep(.dark) .step-number {
  box-shadow: 0 0 0 4px #111827;
}

:deep(.dark) .procedure-timeline:before {
  background-color: #374151;
}

/* 新增样式 */
.preview-mode {
  max-height: 65vh;
  overflow-y: auto;
  padding: 0 0.5rem;
}

.preview-title {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
}

.preview-title:after {
  content: '';
  position: absolute;
  width: 60%;
  height: 3px;
  bottom: 0;
  left: 20%;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.8), transparent);
}

.preview-table {
  border-radius: 8px;
  overflow: hidden;
  border-spacing: 0;
  transition: all 0.3s ease;
}

.preview-table td {
  transition: background-color 0.2s ease;
}

.preview-table td.bg-blue-50:hover,
.preview-table td.bg-yellow-50:hover,
.preview-table td.bg-green-50:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

.preview-content {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.dark) .preview-table {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

:deep(.dark) .preview-table td.bg-blue-50 {
  background-color: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

:deep(.dark) .preview-table td.bg-white {
  background-color: #1f2937;
  color: #e5e7eb;
}

:deep(.dark) .preview-table td.bg-yellow-50 {
  background-color: rgba(234, 179, 8, 0.15);
  color: #fcd34d;
}

:deep(.dark) .preview-table td.bg-green-50 {
  background-color: rgba(34, 197, 94, 0.15);
  color: #86efac;
}

:deep(.dark) .preview-table td.border {
  border-color: #374151;
}

:deep(.dark) .preview-title {
  color: #f87171;
}

:deep(.dark) .bg-blue-50,
:deep(.dark) .bg-purple-50,
:deep(.dark) .bg-orange-50,
:deep(.dark) .bg-green-50,
:deep(.dark) .bg-gray-50 {
  background-color: rgba(255, 255, 255, 0.05);
  color: #e5e7eb;
}

:deep(.dark) .border-blue-400,
:deep(.dark) .border-purple-400,
:deep(.dark) .border-orange-400,
:deep(.dark) .border-green-400,
:deep(.dark) .border-gray-400 {
  border-color: rgba(255, 255, 255, 0.3);
}

:deep(.dark) .text-indigo-700,
:deep(.dark) .text-indigo-600,
:deep(.dark) .text-blue-600 {
  color: #a5b4fc;
}

.interaction-section,
.outcome-section,
.materials-section {
  margin-top: 8px;
}

.evaluation-list,
.reflection-list,
.homework-list {
  padding-left: 2rem;
}

.evaluation-item,
.reflection-item,
.homework-item {
  line-height: 1.6;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* 生成成功内容弹性缩放动画 */
.generated-content {
  animation: popIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.96) translateY(30px);
  }
  60% {
    opacity: 1;
    transform: scale(1.03) translateY(-4px);
  }
  80% {
    transform: scale(0.98) translateY(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
