<script setup lang="ts">
import { ref } from 'vue';
// import ResourceGenerationHeader from './modules/ResourceGenerationHeader.vue';
import TextInputPanel from './modules/TextInputPanel.vue';
import StyleSelectionPanel from './modules/StyleSelectionPanel.vue';
import ParameterSettingPanel from './modules/ParameterSettingPanel.vue';
import ResourcePreviewPanel from './modules/ResourcePreviewPanel.vue';

// 定义生成流程步骤
type GenerationStep = 'input' | 'parameters' | 'preview';

// 当前生成流程步骤
const currentStep = ref<GenerationStep>('input');

// 是否正在生成资源
const isGenerating = ref(false);

// 生成输入数据
const generationData = ref<any>(null);

// 参数数据
const parameterData = ref<any>(null);

// 风格选择数据
const selectedStyles = ref<Array<{ id: number; name: string }>>([]);

// 处理输入面板的生成事件
function handleInputGenerate(data: any): void {
  generationData.value = data;
  currentStep.value = 'parameters';
}

// 处理参数变化
function handleParametersChange(params: any): void {
  parameterData.value = params;
}

// 处理风格选择变化
function handleStylesChange(styles: Array<{ id: number; name: string }>): void {
  selectedStyles.value = styles;
}

// 处理参数设置完成，进入预览步骤
function handleParametersComplete(): void {
  if (!parameterData.value) {
    // 使用默认参数
    parameterData.value = {};
  }

  isGenerating.value = true;
  currentStep.value = 'preview';

  // 模拟生成过程
  setTimeout(() => {
    isGenerating.value = false;
  }, 2000);
}

// 重新开始流程
function handleRestart(): void {
  currentStep.value = 'input';
  generationData.value = null;
  parameterData.value = null;
  selectedStyles.value = [];
  isGenerating.value = false;
}
</script>

<template>
  <div class="resource-generation-page mx-2 h-screen flex flex-col overflow-hidden">
    <!-- 页面头部 -->
    <!--
 <div class="flex-1 p-6">
      <ResourceGenerationHeader />
    </div> 
-->

    <!-- 主要内容区域 -->
    <div class="flex-2 overflow-y-auto p-6">
      <!-- 步骤指示器 -->
      <div class="mb-6 border border-gray-100 rounded-lg bg-white py-4 shadow-sm">
        <div class="flex items-center justify-center">
          <div
            class="step-item flex items-center justify-center"
            :class="{ 'step-active': currentStep === 'input', 'step-completed': currentStep !== 'input' }"
          >
            <div class="step-circle">1</div>
            <div class="step-label">输入内容</div>
          </div>
          <div class="step-divider"></div>
          <div
            class="step-item flex items-center justify-center"
            :class="{ 'step-active': currentStep === 'parameters', 'step-completed': currentStep === 'preview' }"
          >
            <div class="step-circle">2</div>
            <div class="step-label">设置参数</div>
          </div>
          <div class="step-divider"></div>
          <div class="step-item flex items-center justify-center" :class="{ 'step-active': currentStep === 'preview' }">
            <div class="step-circle">3</div>
            <div class="step-label">资源预览</div>
          </div>
        </div>
      </div>

      <!-- 输入内容步骤 -->
      <div v-if="currentStep === 'input'" class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div class="flex flex-col gap-4 lg:col-span-3">
          <!-- 使用TextInputPanel替代所有输入面板 -->
          <div class="flex-1">
            <TextInputPanel @generate="handleInputGenerate" />
          </div>
        </div>
      </div>

      <!-- 参数设置步骤 -->
      <div v-if="currentStep === 'parameters'" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- 左侧参数面板 -->
        <div class="parameters-panel mb-6">
          <ParameterSettingPanel @parameters-change="handleParametersChange" @back="handleRestart" />
        </div>

        <!-- 右侧风格选择面板 -->
        <div class="styles-panel mb-6">
          <StyleSelectionPanel @update:selected-styles="handleStylesChange" @next="handleParametersComplete" />
        </div>
      </div>

      <!-- 资源预览步骤 -->
      <div v-if="currentStep === 'preview'" class="preview-container">
        <div class="grid grid-cols-1 gap-4">
          <!-- 资源预览面板 -->
          <div class="preview-panel mb-6">
            <ResourcePreviewPanel
              :is-generating="isGenerating"
              @restart="handleRestart"
              @adjust-parameters="currentStep = 'parameters'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-item {
  flex-direction: column;
  width: 120px;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
}

.step-divider {
  height: 2px;
  width: 80px;
  background-color: #e5e7eb;
  margin: 0 -10px;
}

.step-label {
  font-size: 14px;
  color: #6b7280;
}

.step-active .step-circle {
  background-color: #2b46fe;
  color: white;
}

.step-active .step-label {
  color: #2b46fe;
  font-weight: 500;
}

.step-completed .step-circle {
  background-color: #22c55e;
  color: white;
}

.step-completed .step-label {
  color: #22c55e;
  font-weight: 500;
}

.parameters-panel,
.styles-panel,
.preview-panel {
  min-height: 800px;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
}

.parameters-panel :deep(.n-card),
.styles-panel :deep(.n-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
